const fs = require("fs");
const os = require("os");
const path = require("path");
const colorsDetection = require("./colors.js");

exports.waitTillHTMLRendered = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    const html = await page.content();
    const currentHTMLSize = html.length;
    if (lastHTMLSize !== 0 && currentHTMLSize === lastHTMLSize) countStableSizeIterations++;
    else countStableSizeIterations = 0; // reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitForTimeout(checkDurationMsecs);
  }
};

exports.takeScreenshotAndGetColors = async (page) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'extractor-'));
  const imagePath = path.join(directory, "output.png");
  const filemime = "image/png";
  try {
    await page.screenshot({ fullPage: false, type: "png", path: imagePath });
    const data = fs.readFileSync(imagePath, { encoding: 'base64' });
    const colors = await colorsDetection.extractColors(imagePath);
    fs.rmdirSync(directory, { recursive: true })

    return {
      screenshot: `data:${filemime};base64,${data}`,
      colors: colors
    }
  } catch(error) {
    console.error(error);
    return null;
  }
}