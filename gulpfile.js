
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');



var Paths = {
  maskText : 'source/safe.mask-text.js',
  maskTextMin: 'source/safe.mask-text.min.js'
};
gulp.task('default',['build-maskText','watch:maskText']);

gulp.task('build-maskText',['dist-source'], function(){
  return gulp.src(Paths.maskText)
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));
});

gulp.task('dist-source', function(){
  return gulp.src(Paths.maskText)
  .pipe(gulp.dest('dist'));
});


gulp.task('watch:maskText', function(){
  return gulp.watch(Paths.maskText, ['build-maskText']);
});


gulp.task('dist',['build-maskText']);
