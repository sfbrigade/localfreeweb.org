'use strict';
var path = require('path');

var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var httpServer = require('http-server');
var opener = require('opener');
var portfinder = require('portfinder');

//gulp.task('css', function () {
//  gulp.src('app/**/*.css').pipe(refresh(server));
//});

gulp.task('less', function (cb) {
  gulp.src('./src/css/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./compiled/css'));
    cb();
});

gulp.task('default', ['less'], function () {
  var lr = livereload;
  lr.listen();

  gulp.watch('./src/css/**/*.less', ['less']);
  gulp.watch('./compiled/**').on('change', function(file) {
    console.log('build changed', file.path);
    lr.changed(file.path);
  });

  portfinder.getPort(function (err, port) {
    var server = httpServer.createServer({
      root: './'
    }).listen(port);
    opener('http://localhost:'+port);
  });

});
