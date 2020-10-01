const fs = require("fs");
const { exit } = require("process");
const yargs = require('yargs');
const extractor = require("./extractor")
const server = require("./server");

// import extractor from "./extractor/index.js";
function serve() {
  console.log("serve")
}

const argv = yargs.options({
  hostname: {
    alias: 'h',
    default: "localhost",
    description: 'hostname'
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
      console.log(JSON.stringify(res));
      exit();
    }
  }).catch((error) => {
    console.error(error);
    exit();
  });
}
if (!argv.url) {
  server.start(argv.port, argv.hostname);
}
