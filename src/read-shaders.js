var fs   = require('fs');
var glob = require('glob');

var readShaders = function(location, cb) {
  console.log('readShaders')
	glob(location, function (er, files) {
    var shaders = {};
	  var numShaders = files.length;
	  var loadedShaders = 0

	  for(var file in files) {

	  	readShader(files[file], shaders, function() {
	  	  loadedShaders ++;
	  	  if (loadedShaders == numShaders) {
	  	  	cb(shaders);
	  	  }
	  	});
	  }
	});

}

var readShader = function (file, shaders, cb) {
	fs.readFile(file, function (err, data) {
	  if (err) {
	    throw err;
	  }

    var name = file.match(/[^/]*$/i)[0].replace(/\.[^/.]+$/, "")

    shaders[name] = data.toString();
	  cb();
  });
}

module.exports = readShaders

/*
readShaders('./shaders/*.c', function(shaders){
	console.log('finished',shaders)
});
*/

