const ColorThief = require('colorthief');

function rgb(values) {
  return 'rgb(' + values.join(', ') + ')';
}

exports.extractColors = async (path) => {
  const color = await ColorThief.getColor(path);
  const palette = await ColorThief.getPalette(path, 5);
  return {
    color: rgb(color),
    palette: palette.map((c) => rgb(c))
  };
}
