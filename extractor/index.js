#!/usr/bin/env node
const puppeteer = require("puppeteer");
const fs = require("fs");
const load = require("./load.js");

const readabilityJsStr = fs.readFileSync("node_modules/@mozilla/readability/Readability.js", {
  encoding: "utf-8",
});

function executor() {
  return new Readability({}, document).parse();
}

async function main(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(15000);

  try {
    await page.goto(url, { waitUntil: "load" });
  } catch (e) {
    console.error(e);
  }
  await load.waitTillHTMLRendered(page);
  await page.setViewport({ width: 1280, height: 1024 });
  const screenshotAndColors = await load.takeScreenshotAndGetColors(page);

  const canonicalUrl = await page.evaluate(() => {
    const canonicalLink = document.querySelector("link[rel=canonical]");
    if (canonicalLink) return canonicalLink.href;

    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) return ogUrlMeta.content;

    return window.location.href;
  });

  const resultArticle = await page.evaluate(`
    (function(){
      ${readabilityJsStr}
      ${executor}
      return executor();
    }())
  `);

  let imageUrl = null;
  if (resultArticle) {
    imageUrl = await page.evaluate((contentHTML) => {
      const ogImageMeta = document.querySelector(
        'meta[property="og:image"], meta[property="og:image:url"]'
      );
      if (ogImageMeta) return ogImageMeta.content;

      const containerDiv = document.createElement("div");
      containerDiv.innerHTML = contentHTML;
      const contentImgs = Array.from(containerDiv.querySelectorAll("img"));
      if (contentImgs.length === 0) return "";

      const largestImg = contentImgs.slice(1).reduce((largestImage, img) => {
        return largestImage.width * largestImage.height >= img.width * img.height
          ? largestImage
          : img;
      }, contentImgs[0]);

      // src may be relative URL, resolve with current location.
      return new URL(largestImg.src, location.href).href;
    }, resultArticle.content);
  }

  browser.close();

  const metadata = {
    canonicalUrl,
    article: resultArticle,
    imageUrl,
    colors: colors,
    screenshot: screenshotAndColors
  };

  return metadata;
}

const extract = async (url) => {
  const result = await main(url);
  return result;
};

exports.extract = extract;