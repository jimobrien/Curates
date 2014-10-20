(function() {
  'use strict';

  var gulp = require('gulp');
  var concat = require('gulp-concat');
  var jshint = require('gulp-jshint');
  var refresh = require('gulp-livereload');
  var minifyCSS = require('gulp-minify-css');
  var nodemon = require('gulp-nodemon');
  var stylus = require('gulp-stylus');
  var uglify = require('gulp-uglify');
  var lr = require('tiny-lr');
  var server = lr();

  var paths = {
    scripts: ['client/app/**/*.js'],
    html: ['client/app/**/*.html', 'client/index.html'],
    styles: ['client/app/**/*.styl'],
  };

  gulp.task('live', function () {
    server.listen(35729, function (err) {
      if (err) {
        console.error(err);
      }
    });
  });

  gulp.task('serve', function() {
    nodemon({script: 'index.js', ignore: ['node_modules/**/*.js', 'client/app/**/*.js']})
      .on('restart', function () {
        refresh(server);
      });
  });

  gulp.task('lint', function () {
    return gulp.src(paths.scripts)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(refresh(server));
  });

  gulp.task('html', function () {
    return gulp.src(paths.html)
      .pipe(refresh(server));
  });

  gulp.task('styles', function () {
    return gulp.src(paths.styles)
      .pipe(refresh(server));
  });

  gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['lint']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.styles, ['styles']);
  });

  gulp.task('default', ['lint', 'live', 'serve', 'watch']);

})();