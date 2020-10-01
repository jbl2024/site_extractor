const fs = require("fs");
const { exit } = require("process");
const yargs = require('yargs');
const extractor = require("./extractor")
// import extractor from "./extractor/index.js";
function serve() {
  console.log("serve")
}

const argv = yargs.options({
  host: {
    alias: 'h',
    default: "localhost",
    description: 'host'
  },
  port: {
    alias: 'p',
    default: 80,
    description: 'port'
  },
  url: {
    alias: 'u',
    default: null,
    description: 'url'
  },
  output: {
    alias: 'o',
    default: null,
    description: 'output file'
  }
})
  .argv;

if (argv.url) {
  extractor.extract(argv.url).then((res) => {
    if (argv.output) {
      fs.writeFileSync(argv.output, JSON.stringify(res));
    } else {
      console.log(res);
      exit();
    }
  }).catch((error) => {
    console.error(error);
    exit();
  });
}
