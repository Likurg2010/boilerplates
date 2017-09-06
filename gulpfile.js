// first part

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();

const config = {
  paths: {
    scss: './src/scss/**/*.scss',
    html: '.public/index.html'
  },
  output: {
    cssName: 'bundle.min.css',
    path: './public'
  },
  isDevelop: false
}

gulp.task('scss', function(){
  return gulp.src(config.paths.scss)
    .pipe(gulpIf(config.isDevelop, sourcemaps.init()))
    .pipe(sass())
    .pipe(concat(config.output.cssName))
    .pipe(autoprefixer())
    .pipe(gulpIf(!config.isDevelop, cleanCss()))
    .pipe(gulpIf(config.isDevelop, sourcemaps.write()))
    .pipe(gulp.dest(config.output.path))
    .pipe(browserSync.stream());
});

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: config.output.path
    }
  });

  gulp.watch(config.paths.scss, ['scss']);
  gulp.watch(config.paths.html).on('change', browserSync.reload)
})

gulp.task('default', ['scss','serve'])

// second part

const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');


const isDev = true;

gulp.task('css', function(){
  return gulp.src('src/css/**/*.css')
    .pipe(autoprefixer())
    .pipe(concat('bundle.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream());
})
gulp.task('js', function(){
  return gulp.src('src/js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('html', function(){
  return gulp.src('src/*.html')
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}))
})


gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });

  gulp.watch('src/css/**/*.css', ['css'])
  gulp.watch('src/js/**/*.js', ['js'])
  gulp.watch('src/**/*.html', ['html'])
})

gulp.task('default', ['css', 'html', 'serve', 'js']);


//package.json

{
  "name": "gulp-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.18.13",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^4.0.0",
    "gulp-clean-css": "^3.7.0",
    "gulp-concat": "^2.6.1",
    "gulp-if": "^2.0.2",
    "gulp-sourcemaps": "^2.6.0",
    "gulp-sass": "^3.1.0",
  }
}
