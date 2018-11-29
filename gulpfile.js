const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const terser = require('gulp-terser');
const concat = require('gulp-concat');

const devConfig = {
  scripts: [
    'src/js/lib/vue.js',
    'src/js/lib/unorm.js',
    'src/js/main.js'
  ],
  compressJs: false,
  sassConfig: null
};

const prodConfig = {
  scripts: [
    'src/js/lib/vue.min.js',
    'src/js/lib/unorm.js',
    'src/js/main.js'
  ],
  compressJs: true,
  sassConfig: {
    'outputStyle': 'compressed'
  }
}

var config = devConfig;

gulp.task('setProd', function setProdInner (done) {
  config = prodConfig;
  done();
});

gulp.task('lint', function lintInner () {
  return gulp.src('src/js/main.js')
    .pipe(jshint({
      "esversion": 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('js', gulp.series('lint', function jsInner () {
  var source = gulp.src(config.scripts)
    .pipe(concat('main.js'))
  if (config.compressJs) {
    source = source.pipe(terser({
      'ecma': 6
    }));
  }
  return source.pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}));

gulp.task('html', function htmlInner () {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function sassInner () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass(config.sassConfig))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('clean', function cleanInner() {
  return del('dist');
});

gulp.task('build', gulp.series('clean', 'html', 'sass', 'js'));

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('build', function serveInner () {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/js/*.js', gulp.series('js'));
  gulp.watch('src/*.html', gulp.series('html')).on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));
gulp.task('build-prod', gulp.series('setProd', 'build'));
gulp.task('serve-prod', gulp.series('setProd', 'serve'));
