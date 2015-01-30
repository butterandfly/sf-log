var gulp = require('gulp');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');

var jsFiles = ['./src/sfEcho.js', './src/sfLog.js'];
var targetJsDir = './dist/';

gulp.task('build', function() {
  gulp.src(jsFiles)
    .pipe(concat('sfLog.js'))
    .pipe(gulp.dest(targetJsDir));
});

gulp.task('test', function() {
  return gulp.src('./test/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});