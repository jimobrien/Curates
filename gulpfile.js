(function() {
  'use strict';

  var gulp = require('gulp');
  var uglify = require('gulp-uglify');
  var concat = require('gulp-concat');
  var watch = require('gulp-watch');
  var nodemon = require('gulp-nodemon');
  var jshint = require('gulp-jshint');

  // gulp.task('build', function() {
  //   gulp.src('./client/**/*.js');
  // });

  gulp.task('lint', function () {
    gulp.src('./**/*.js', '!client/lib')
      .pipe(jshint({reporter: 'stylish'}));
  });

  gulp.task('develop', function () {
    nodemon({ script: 'server.js', ext: 'html js', ignore: ['ignored.js'] })
      .on('change', ['lint'])
      .on('restart', function () {
        console.log('restarted!');
      });
  });

})();