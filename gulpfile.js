const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

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