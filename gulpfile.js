var gulp = require('gulp');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var gulpWebpack = require('gulp-webpack');
var path = require('path');
var webpackConfigs = require('./webpack-configs.js');

var jsFiles = ['./src/sfEcho.js', './src/sfLog.js'];
var targetJsDir = './dist/';

gulp.task('build', function() {
  gulp.src('src/sf-log.js')
    .pipe(gulpWebpack(webpackConfigs.normalBuildConfig))
    .pipe(gulp.dest(targetJsDir));

  gulp.src('src/sf-log.js')
    .pipe(gulpWebpack(webpackConfigs.minBuildConfig))
    .pipe(gulp.dest(targetJsDir));
});

gulp.task('test', function() {
  return gulp.src('./tests/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});