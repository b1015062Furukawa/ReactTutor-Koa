var gulp = require('gulp');
var print = require('gulp-print');
var exec = require('child_process').exec;
var coffee = require('gulp-coffee');
var fs = require('fs');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('init', function (cb) {
  fs.writeFileSync('comments.json', JSON.stringify([]))
});

gulp.task('start', function (cb) {
  gulp.src('./*.coffee')
    .pipe(coffee())
    .pipe(print())
    .pipe(gulp.dest('./'))

  exec('cjsx -c main.cjsx')

  exec('browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js')

  exec('node index.js')
})
