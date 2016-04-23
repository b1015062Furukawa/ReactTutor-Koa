var gulp = require('gulp');
var exec = require('child_process').exec;
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var cjsx = require('gulp-cjsx');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var fs = require('fs');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('init', function (cb) {
  fs.writeFileSync('comments.json', JSON.stringify([]));
});

gulp.task('compile', function(){
  gulp.src('./*.cjsx')
    .pipe(cjsx({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./'));

    gulp.src('./*.coffee')
      .pipe(coffee())
      .pipe(gulp.dest('./'));
});

gulp.task('browserify', function(){
  browserify("./main.js")
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('run', function (cb) {
  exec('node index.js');
})
