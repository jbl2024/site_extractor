const vfile = require('to-vfile')
const retext = require('retext')
const pos = require('retext-pos')
const keywords = require('retext-keywords')
const toString = require('nlcst-to-string')


exports.process = async (text) => {
  const file = await retext()
    .use(pos)
    .use(keywords)
    .process(vfile({ contents: text }));

  const kw = file.data.keywords.map(function (keyword) {
    return toString(keyword.matches[0].node);
  });
  const kp = file.data.keyphrases.map(function (phrase) {
    return phrase.matches[0].nodes.map(stringify).join('')
    function stringify(value) {
      return toString(value)
    }
  });
  return {
    keywords: kw,
    keyphrases: kp
  };
}
