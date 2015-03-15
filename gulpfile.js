var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');

var paths = {
  scripts: ['src/**/*.js'],
  dist: 'dist'
};

gulp.task('clean', function(cb) {
  del([paths.dist], cb);
});

gulp.task('build', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('default', ['clean', 'build']);