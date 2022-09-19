const gulp = require('gulp');
const plumber = require('gulp-plumber');
const minifyCss = require('gulp-cssmin');
const webp = require('gulp-webp');
const squoosh = require('gulp-libsquoosh');
const html = require('gulp-htmlmin');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const sync = require('browser-sync').create();

//минификация и добавление автопрефиксов в стили
const styles = (done) => {
  gulp.src('source/css/style.css')
    .pipe(plumber())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(minifyCss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
  done();
}
exports.styles = styles;

//Минификация HTML
const minifyHtml = () => {
  return gulp.src('source/index.html')
    .pipe(html({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}
exports.minifyHtml = minifyHtml;

//Оптимизация изображений
const optimizeImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}
exports.optimizeImages = optimizeImages;

//webp
const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('build/img'))
}
exports.createWebp = createWebp;

//копирование неоптимизированных изображений
const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(gulp.dest('build/img'))
}
exports.images = copyImages;

//Оптимизация js
const minifyJs = () => {
  return gulp.src('source/main.js')
    .pipe(plumber())
    .pipe(terser())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('build'))
    .pipe(sync.stream());
}
exports.minifyJs = minifyJs;

// Copy
const copy = (done) => {
  gulp.src(['source/fonts/*.{woff2,woff}', 'source/css/normalize.css'], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}
exports.copy = copy;

const cleanBuild = () => {
  return gulp.src('build', {read: false})
    .pipe(clean())
}

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

// Reload
const reload = (done) => {
  sync.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/css/style.css', gulp.series(styles));
  gulp.watch('source/main.js', gulp.series(minifyJs));
  gulp.watch('source/index.html', gulp.series(minifyHtml, reload));
}

// Build (production)
const build = gulp.series(
  cleanBuild,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    minifyHtml,
    minifyJs,
    createWebp
  ),
);
exports.build = build;

// Default
exports.default = gulp.series(
  cleanBuild,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    minifyHtml,
    minifyJs,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));

