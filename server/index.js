const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const extractor = require("../extractor");

exports.start = function (port, hostname) {
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());  

  app.get('/', (req, res) => {
    const query = req.query;
    if (query.url) {
      extractor.extract(query.url).then((output) => {
        res.send(output);
      }).catch((error) => {
        console.log(error)
        res.sendStatus(500);
      });
    } else {
      res.send('OK')
    }
  })


  app.post('/', (req, res) => {
    const url = req.body.url;
    
    if (url == null) {
      res.sendStatus(404)
    };
    extractor.extract(url).then((output) => {
      res.send(output);
    }).catch((error) => {
      console.log(error)
      res.sendStatus(500);
    });
  });

  app.listen(port, hostname, function () {
    console.log("Runnning on " + port);
  });
}
