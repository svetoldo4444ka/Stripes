'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require('gulp.spritesmith');

gulp.task('sass', function(){
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))

});

gulp.task('sprite', function () {
    var spriteData = gulp.src('src/images/icons/*.png').pipe(spritesmith({
        imgName: 'icons.png',
        cssName: 'icons.scss',
        padding: 10
    }));
    return spriteData.pipe(gulp.dest('src/images/sprite'));
});


gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
});