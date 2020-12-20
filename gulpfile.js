const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const insert = require('gulp-insert'); // used to add wordpress theme description to css
const reload = browserSync.reload;

//Variable
var themeDescription = [
    '@charset "UTF-8";',
    '/*',
    'Theme Name: Blue Point',
    'Author: Jonathan Produz Digital',
    'Author URI: https://produzdigital.com.br/',
    'Description: Site Institucional de TI',
    'Requires at least: 5.3',
    'Tested up to: 5.6',
    'Requires PHP: 5.6',
    'Version: 1.0',
    'Text Domain: bluepoint',
    '*/',
    '',
].join('\n')

var paths = {
    styles:   './scss/**/*',
    //scripts:  {
    //  vendor: './js/vendor/**/*',
    //  app:    './js/app/**/*',
    //},
    //php:      './php/**/*.php',
    dist:     './'
}
//

//Style CSS
function compilaSass() {
    return gulp
    .src('css/scss/*.scss')
    .pipe(sass(
        {outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(insert.prepend(themeDescription))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
}

gulp.task('sass', compilaSass);

//BrowserSync
function browser() {
    browserSync.init({
        proxy: 'http://localhost/bluepoint/'
    });
}

gulp.task('browser-sync', browser);


//Watch and Task Default
function watch() {
    gulp.watch('css/scss/*.scss', compilaSass);
}

gulp.task('watch', watch);

gulp.task('default', gulp.parallel('watch','browser-sync'));