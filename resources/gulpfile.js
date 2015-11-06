var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var eslint = require('gulp-eslint');
var pngquant = require('imagemin-pngquant');
var svg2png = require('gulp-svg2png');

var vendors = require('./package').vendors;
var src = './';
var dist = './../';

gulp.task('lint', function () {
  return gulp
    .src(src + 'js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.failOnError());
});

gulp.task('compile:javascript', ['lint'], function() {
  return gulp.src(src + 'js/**/*.js')
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dist + 'js'));
});

gulp.task('compile:javascript:vendors', function() {
  return gulp.src(vendors)
    .pipe(concat('vendors.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist + 'js'));
});

gulp.task('compile:sass', function() {
  return gulp.src([src + 'css/**/*.scss', '!' + src + 'css/**/_*.scss'])
    .pipe(sass().on('error', gutil.log))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(minifyCss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist + 'css'));
});

gulp.task('svg2png', function () {
  return gulp.src(src + 'images/**/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest(src + 'images'));
});

gulp.task('optimize:images', ['svg2png'], function () {
  return gulp.src([src + 'images/**/*', '!' + src + 'images/**/*.svg'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      optimizationLevel: 7,
      multipass: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dist + 'images'));
});

gulp.task('watch', function() {
  gulp.watch(src + '/css/**/*.scss', ['compile:sass']);
  gulp.watch(src + '/js/**/*.js', ['compile:javascript']);
});

gulp.task('default', ['compile:sass', 'compile:javascript:vendors', 'compile:javascript', 'watch']);
