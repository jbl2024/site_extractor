#!/usr/bin/env node
const puppeteer = require("puppeteer");
const fs = require("fs");
const load = require("./load.js");
const autotag = require("./autotag.js");
const readabilityJsStr = fs.readFileSync("node_modules/@mozilla/readability/Readability.js", {
  encoding: "utf-8",
});

function executor() {
  return new Readability({}, document).parse();
}

async function main(url) {
  const startDate = new Date;
  console.log("start")
  const args = [
    '--no-sandbox', 
    '--disable-setuid-sandbox',
    '--proxy - server="direct://"',
    '--proxy-bypass-list=*'
  ]
  const browser = await puppeteer.launch({ args: args, headless: true,  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(15000);
  let screenshotAndColors = null;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await load.waitTillHTMLRendered(page);
    await page.setViewport({ width: 1280, height: 1024 });
    screenshotAndColors = await load.takeScreenshotAndGetColors(page);
  } catch (e) {
    throw(e);
  }

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

  const keywords = await autotag.process(resultArticle.textContent);

  const metadata = {
    canonicalUrl,
    article: resultArticle,
    imageUrl,
    keywords: keywords,
    screenshot: screenshotAndColors
  };

  const endDate = new Date()
  const duration = endDate - startDate;
  console.log(`end : ${duration}ms`);
  return metadata;
}

const extract = async (url) => {
  const result = await main(url);
  return result;
};

exports.extract = extract;