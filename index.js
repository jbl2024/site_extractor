console.log("## starting site_extractor");
const DOC_URL = process.argv[2];
const puppeteer = require('puppeteer');
const fs = require('fs');
const readabilityJsStr = fs.readFileSync('node_modules/@mozilla/readability/Readability.js', { encoding: 'utf-8' })

function executor() {
  return new Readability({}, document).parse();
}

const waitTillHTMLRendered = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    let html = await page.content();
    let currentHTMLSize = html.length;

    let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

    console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
      countStableSizeIterations++;
    else
      countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      console.log("Page rendered fully..");
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitFor(checkDurationMsecs);
  }
};

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(15000);

  console.log('Loading', DOC_URL);
  try {
    await page.goto(DOC_URL, { waitUntil: 'load' });
  } catch (e) {
    console.error(e);
  }
  await waitTillHTMLRendered(page);
  await page.setViewport({ width: 1280, height: 1024 });

  // await page.waitForNavigation({
  //   waitUntil: 'networkidle0',
  // });

  console.log('Extracting...');
  await page.screenshot({ fullPage: false, type: 'png', path: '/tmp/buddy-screenshot.png' });

  const canonicalUrl = await page.evaluate(() => {
    const canonicalLink = document.querySelector('link[rel=canonical]');
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
    imageUrl = await page.evaluate(contentHTML => {
      const ogImageMeta = document.querySelector('meta[property="og:image"], meta[property="og:image:url"]');
      if (ogImageMeta) return ogImageMeta.content;

      const containerDiv = document.createElement('div');
      containerDiv.innerHTML = contentHTML;
      const contentImgs = Array.from(containerDiv.querySelectorAll('img'));
      if (contentImgs.length === 0) return '';

      const largestImg = contentImgs.slice(1).reduce((largestImage, img) => {
        return largestImage.width * largestImage.height >= img.width * img.height ? largestImage : img
      }, contentImgs[0]);

      // src may be relative URL, resolve with current location.
      return new URL(largestImg.src, location.href).href;

    }, resultArticle.content);
  }
  
  browser.close();

  const metadata = {
    canonicalUrl: canonicalUrl,
    article: resultArticle,
    imageUrl: imageUrl
  }

  console.log('=====');
  console.log(metadata);
}

main();