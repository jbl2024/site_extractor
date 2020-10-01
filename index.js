import puppeteer from "puppeteer";
import fs from "fs";
import { waitTillHTMLRendered } from "./load.js";
import { extractColors } from "./colors.js";

console.log("## starting site_extractor");
const DOC_URL = process.argv[2];
const readabilityJsStr = fs.readFileSync("node_modules/@mozilla/readability/Readability.js", {
  encoding: "utf-8",
});

function executor() {
  return new Readability({}, document).parse();
}

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(15000);

  try {
    await page.goto(DOC_URL, { waitUntil: "load" });
  } catch (e) {
    console.error(e);
  }
  await waitTillHTMLRendered(page);
  await page.setViewport({ width: 1280, height: 1024 });
  await page.screenshot({ fullPage: false, type: "png", path: "/tmp/buddy-screenshot.png" });
  const colors = await extractColors("/tmp/buddy-screenshot.png");

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
  };

  console.log("=====");
  console.log(metadata);
}

main();
