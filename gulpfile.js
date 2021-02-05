var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('css', async function(){
        gulp.src('./less/styles.less')
        .pipe( less({paths:[path.join(__dirname, 'less', 'includes')]}) )
        .pipe( gulp.dest('./static/css') )
        .pipe( minifycss({keepBreaks:true}) )
        .pipe( rename({suffix:'.min'}) )
        .pipe( gulp.dest('./static/css') );
    }
);

gulp.task('js', async function(){
        gulp.src('./js/*.js')
        .pipe( concat('scripts.js') )
        .pipe( gulp.dest('./static/js') )
        .pipe( uglify() )
        .pipe( rename({suffix: '.min'}) )
        .pipe( gulp.dest('./static/js') );
    }
);


gulp.task('watchers', function(){
    gulp.watch('less/**/*.less', gulp.series('css'));
    }
);

gulp.task('default', gulp.series('css','watchers'));