'use strict';
var path = require('path');

var gulp = require('gulp');
var less = require('gulp-less');

//gulp.task('css', function () {
//  gulp.src('app/**/*.css').pipe(refresh(server));
//});

gulp.task('less', function () {
  gulp.src('./src/css/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./compiled/css'));
});

gulp.task('default', function () {

  gulp.watch('./src/css/**/*.less', function (event) {
    //gulp.run('css');
    gulp.run('less');
  });
});
