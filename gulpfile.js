var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var karma = require('karma').server;
var path = require('path');

var paths = {
  scripts: ['src/**/*.js'],
  dist: 'dist'
};

gulp.task('clean', function(done) {
  del([paths.dist], done);
});

gulp.task('build', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('test:1.3', function(done) {
  var karmaConfig = {
    configFile: path.join(__dirname, 'karma.angular-1.3.conf.js')
  };

  karma.start(karmaConfig, done);
});

gulp.task('test:1.4', function(done) {
  var karmaConfig = {
    configFile: path.join(__dirname, 'karma.angular-1.4.conf.js')
  };

  karma.start(karmaConfig, done);
});

gulp.task('test', ['test:1.4', 'test:1.3']);

gulp.task('default', ['clean', 'build']);