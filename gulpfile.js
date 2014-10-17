var gulp        = require('gulp');
var wrap        = require('./index')

gulp.task('shader', function() {

  var payload = {
    src:    './shaders/*.c',
    dest:   './compiled-shaders/shaders.js',
    header: 'var shaders = {\n',
    footer: '\n}'

  }
	wrap(payload);

});

gulp.task('default', ['shader']);

