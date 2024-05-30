function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var API_URL = 'https://flagcdn.com';

var FixedHeightFlag = function FixedHeightFlag(_ref) {
  var country = _ref.country,
      fileType = _ref.fileType,
      flagHeight = _ref.flagHeight;
  var parsedHeight = parseInt(flagHeight.slice(1));
  var src = API_URL + "/" + flagHeight + "/" + country + "." + (fileType === 'jpeg' ? 'jpg' : 'png');
  var srcset;

  switch (fileType) {
    case 'jpeg':
      srcset = '';
      break;

    case 'png':
      srcset = parsedHeight < 240 ? API_URL + "/h" + parsedHeight * 2 + "/" + country + ".png 2x,\n    " + API_URL + "/h" + parsedHeight * 3 + "/" + country + ".png 3x" : '';
      break;

    default:
      srcset = parsedHeight < 240 ? API_URL + "/" + flagHeight + "/" + country + ".webp,\n      " + API_URL + "/h" + parsedHeight * 2 + "/" + country + ".webp 2x,\n      " + API_URL + "/h" + parsedHeight * 3 + "/" + country + ".webp 3x" : '';
  }

  return fileType === 'webp' ? React.createElement("picture", null, React.createElement("source", {
    type: 'image/webp',
    srcSet: srcset
  }), React.createElement("source", {
    type: 'image/png',
    srcSet: srcset
  }), React.createElement("img", {
    src: src,
    height: parsedHeight,
    alt: country
  })) : React.createElement("img", {
    src: src,
    srcSet: srcset,
    alt: country,
    height: parsedHeight
  });
};

var FixedWidthFlag = function FixedWidthFlag(_ref) {
  var country = _ref.country,
      flagWidth = _ref.flagWidth,
      fileType = _ref.fileType;
  var parsedWidth = parseInt(flagWidth.slice(1));
  var src = API_URL + "/" + flagWidth + "/" + country + "." + (fileType === 'jpeg' ? 'jpg' : 'png');
  var srcset;

  switch (fileType) {
    case 'jpeg':
      srcset = '';
      break;

    case 'png':
      srcset = parsedWidth !== 2560 ? API_URL + "/w" + parsedWidth * 2 + "/" + country + ".png 2x" : '';
      break;

    default:
      srcset = parsedWidth !== 2560 ? API_URL + "/" + flagWidth + "/" + country + ".webp,\n      " + API_URL + "/w" + parsedWidth * 2 + "/" + country + ".webp 2x" : API_URL + "/" + flagWidth + "/" + country + ".webp";
  }

  return fileType === 'webp' ? React.createElement("picture", null, React.createElement("source", {
    type: 'image/webp',
    srcSet: srcset
  }), React.createElement("source", {
    type: 'image/png',
    srcSet: srcset
  }), React.createElement("img", {
    src: src,
    width: flagWidth,
    alt: country
  })) : React.createElement("img", {
    src: src,
    srcSet: srcset,
    width: parsedWidth,
    alt: country
  });
};

var SVGFlag = function SVGFlag(_ref) {
  var country = _ref.country,
      flagWidth = _ref.flagWidth;
  return React.createElement("img", {
    src: API_URL + "/" + country + ".svg",
    width: flagWidth,
    alt: country
  });
};

var WaveyFlag = function WaveyFlag(_ref) {
  var country = _ref.country,
      fileType = _ref.fileType,
      ratio = _ref.ratio;
  var splitSize = ratio.split('x');
  var width = splitSize[0];
  var height = splitSize[1];
  var sizes = {
    '2x': parseInt(width) * 2 + "x" + parseInt(height) * 2,
    '3x': parseInt(width) * 3 + "x" + parseInt(height) * 3
  };
  var src = API_URL + "/" + ratio + "/" + country + ".png";
  var srcset;

  switch (fileType) {
    case 'png':
      srcset = parseInt(width) < 128 ? API_URL + "/" + sizes['2x'] + "/" + country + "." + fileType + " 2x, " + API_URL + "/" + sizes['3x'] + "/" + country + ".png 3x" : '';
      break;

    default:
      srcset = parseInt(width) < 128 ? API_URL + "/" + ratio + "/" + country + ".webp,\n      " + API_URL + "/" + sizes['2x'] + "/" + country + ".webp 2x,\n      " + API_URL + "/" + sizes['3x'] + "/" + country + ".webp 3x" : API_URL + "/" + ratio + "/" + country + ".webp";
  }

  return fileType === 'webp' ? React.createElement("picture", null, React.createElement("source", {
    type: 'image/webp',
    srcSet: srcset
  }), React.createElement("source", {
    type: 'image/png',
    srcSet: srcset
  }), React.createElement("img", {
    src: src,
    width: width,
    height: height,
    alt: country
  })) : React.createElement("img", {
    src: src,
    srcSet: srcset,
    width: width,
    height: height,
    alt: country
  });
};

exports.FixedHeightFlag = FixedHeightFlag;
exports.FixedWidthFlag = FixedWidthFlag;
exports.SVGFlag = SVGFlag;
exports.WaveyFlag = WaveyFlag;
//# sourceMappingURL=index.js.map
