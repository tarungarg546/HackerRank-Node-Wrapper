/*
* @Author: Manraj Singh
* @Date:   2016-06-18 01:42:54
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-06-30 03:09:12
*/

var gulp = require('gulp');
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babel = require('gulp-babel');


gulp.task('browser', () => {
  browserify({ debug: true })
    .transform(babelify)
    .require("./Example/test.js", { entry: true })
    .bundle()
    .on('error',gutil.log)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./Example/source'));
});

gulp.task('es6', () => {
  gulp.src('src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', () => {
  gulp.watch(['./src/*.js'],['browser', 'es6'])
});
 
gulp.task('default', ['browser', 'es6', 'watch']);