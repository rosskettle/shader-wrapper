var fs              = require('fs');
var glob            = require('glob');
var stringLineArray = require('./string-line-array.js')
var readShaders     = require('./read-shaders.js');


//var header = 'var shaders = {\n';
//var footer = '\n}';

var combineShaders = function(shaders, header, footer, callback) {
  console.log('wrapShaders');

  var combinedShaders = [];

  for (var shader in shaders) {
    var str = '  ';
    str += shader + ': '
    str += stringLineArray(shaders[shader], 2);
    str += ".join('\\n')";
    combinedShaders.push(str);
  }

  var output = header + combinedShaders.join(',\n') + footer;

  callback(output);
}

var saveShaders = function(filename, contents, callback) {
  console.log('saveShaders');
  fs.writeFile(filename, contents, function(err) {
    if(err) {
      console.log(err);
    } else {
      if (callback) callback();
    }
  });
}

var WrapShaders = function(payload) {
  var src      = payload.src;
  var dest     = payload.dest;
  var header   = payload.header;
  var footer   = payload.footer;
  var complete = payload.complete;


  readShaders(src, function(shaders) {
    combineShaders(shaders, header, footer, function(outContents) {
      saveShaders(dest, outContents, complete)
    });
  });
}

module.exports = WrapShaders;

