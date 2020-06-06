const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const argv = require('yargs').argv;
const webpack = require('webpack-stream');

const config = {
  prod: argv.prod,
  entry: 'src/js/main.js',
  outputDir: 'dist',
  webpackConfig: './webpack.config.js',
  compressJs: false,
  sassConfig: null
};

const prodConfig = {
  webpackConfig: './webpack.config.prod.js',
  compressJs: true,
  sassConfig: {
    'outputStyle': 'compressed'
  }
};

if (config.prod) Object.assign(config, prodConfig);

gulp.task('lint', () => {
  return gulp.src([
    '*.js',
    'src/**/*.js',
    '!src/js/lib/*.js'
  ])
    .pipe(eslint())
    .pipe(eslint.failOnError());
});

gulp.task('js', gulp.series('lint', () => {
  return gulp.src(config.entry)
    .pipe(webpack(require(config.webpackConfig)))
    .pipe(gulp.dest(`${config.outputDir}/js`))
    .pipe(browserSync.stream());
}));

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(gulp.dest(`${config.outputDir}`))
    .pipe(browserSync.stream());
});

gulp.task('assets', () => {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest(`${config.outputDir}/assets`))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sass(config.sassConfig))
    .pipe(gulp.dest(`${config.outputDir}/css`))
    .pipe(browserSync.stream());
});

gulp.task('clean', () => {
  return del(`${config.outputDir}`);
});

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'assets', 'sass', 'js')));

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('build', () => {
  browserSync.init({
    server: `./${config.outputDir}`
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/js/*.js', gulp.series('js'));
  gulp.watch('src/*.html', gulp.series('html')).on('change', browserSync.reload);
  gulp.watch('src/assets/**/*', gulp.series('assets')).on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));
