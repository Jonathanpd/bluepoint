const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browsersSync = require('browser-sync').create();
const insert       = require('gulp-insert')              // used to add wordpress theme description to css

//Variaveis
var themeDescription = [
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

/*




*/

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
    //.pipe(rename('style.css'))
    .pipe(insert.prepend(themeDescription))
    .pipe(gulp.dest(paths.dist))
}

gulp.task('sass', compilaSass);

function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}

gulp.task('browser-sync', browser);

function watch() {
    gulp.watch('css/scss/*.scss', compilaSass);
}

gulp.task('default', watch);