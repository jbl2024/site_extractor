const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const extractor = require("../extractor");

function toTemplate(data) {
  const template = `
  <h1>${data.article.title}</h1>
  <img src="${data.screenshot?.thumbnail}" >

  <h2>Excerpt</h2>
  <div class="article">
  ${data.article.excerpt}
  </div>

  <h2>Keywords</h2>
  ${JSON.stringify(data.keywords)}

  <h2>Colors</h2>
  <div style="display:inline-block; width:64px; height: 64px; margin: 24px; background-color: ${data.screenshot?.colors?.color};"></div>
  <div style="display:inline-block; width:64px; height: 64px; margin: 24px; background-color: ${data.screenshot?.colors?.palette[0]};" /></div>
  <div style="display:inline-block; width:64px; height: 64px; margin: 24px; background-color: ${data.screenshot?.colors?.palette[1]};" /></div>
  <div style="display:inline-block; width:64px; height: 64px; margin: 24px; background-color: ${data.screenshot?.colors?.palette[2]};" /></div>
  <div style="display:inline-block; width:64px; height: 64px; margin: 24px; background-color: ${data.screenshot?.colors?.palette[3]};" /></div>
  <div style="display:inline-block; width:64px; height: 64px; margin: 24px; background-color: ${data.screenshot?.colors?.palette[4]};" /></div>


  <h2>Screenshots</h2>
  <h3>Page</h3>
  <img src="${data.screenshot?.screenshot}" >
  <h3>Article</h3>
  ${data.article.content}
  `
  return template;
};

exports.start = function (port, hostname) {
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());  

  app.get('/', (req, res) => {
    const query = req.query;
    if (query.url) {
      extractor.extract(query.url).then((output) => {
        if (query.html) {
          res.send(toTemplate(output))
        } else {
          res.send(output);
        }
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
