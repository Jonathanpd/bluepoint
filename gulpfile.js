const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browsersSync = require('browser-sync').create();

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
    .pipe(gulp.dest('.css/'))
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