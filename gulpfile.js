const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const terser = require('gulp-terser');
const concat = require('gulp-concat');

const baseConfig = {
  outputDir: 'dist',
  ecmaVersion: 6
};

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
};

var config = Object.assign({}, baseConfig, devConfig);

gulp.task('setProd', function setProdInner (done) {
  config = Object.assign({}, baseConfig, prodConfig);
  done();
});

gulp.task('lint', function lintInner () {
  return gulp.src([
    '*.js',
    'src/js/*.js'
  ])
    .pipe(jshint({
      "esversion": config.ecmaVersion
    }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('js', gulp.series('lint', function jsInner () {
  var source = gulp.src(config.scripts)
    .pipe(concat('main.js'));

  if (config.compressJs) {
    source = source.pipe(terser({
      'ecma': config.ecmaVersion
    }));
  }
  return source.pipe(gulp.dest(`${config.outputDir}/js`))
    .pipe(browserSync.stream());
}));

gulp.task('html', function htmlInner () {
  return gulp.src('src/*.html')
    .pipe(gulp.dest(`${config.outputDir}`))
    .pipe(browserSync.stream());
});

gulp.task('assets', function assetsInner () {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest(`${config.outputDir}/assets`))
    .pipe(browserSync.stream());
});

gulp.task('sass', function sassInner () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass(config.sassConfig))
    .pipe(gulp.dest(`${config.outputDir}/css`))
    .pipe(browserSync.stream());
});

gulp.task('clean', function cleanInner() {
  return del(`${config.outputDir}`);
});

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'assets', 'sass', 'js')));

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('build', function serveInner () {
  browserSync.init({
    server: `./${config.outputDir}`
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/js/*.js', gulp.series('js'));
  gulp.watch('src/*.html', gulp.series('html')).on('change', browserSync.reload);
  gulp.watch('src/assets/**/*', gulp.series('assets')).on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));
gulp.task('build-prod', gulp.series('setProd', 'build'));
gulp.task('serve-prod', gulp.series('setProd', 'serve'));
