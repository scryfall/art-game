const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js', 'html'], function() {

  browserSync.init({
    server: './dist'
  });

  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
});

gulp.task('lint', function() {
  return gulp.src('src/js/main.js')
    .pipe(jshint({
      "esversion": 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('js', ['lint'], function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
