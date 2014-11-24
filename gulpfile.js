'strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var connect = require('gulp-connect');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

gulp.task('webserver', function() {
  connect.server();
});

gulp.task('browserify', function() {
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./src/js/app.js');
  return b.bundle()
    .pipe(source('app.js'))
	.pipe(plumber())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('minify:app', function () {
    gulp.src('./src/css/*.css')
        .pipe(minify({keepBreaks: true}))
        .pipe(rename({
            suffix: '.min'
        }))
	   .pipe(gulp.dest('./build/css/'));
});

gulp.task('clean:js', function () {
    return gulp.src('build/js/**', {read: false})
        .pipe(clean({force:true}));
});

gulp.task('clean:css', function () {
    return gulp.src(['build/css/*.*', 'build/css/boostrap/*.*', 'build/css/bootstrap/fonts/*.*', 'build/css/font-awesome/fonts/*.*', 'build/css/fonts-awesome/*.*'], {read: false})
        .pipe(clean({force:true}));
});

gulp.task('watch:js', function() {
    gulp.watch('src/js/**', ['clean:js', 'browserify']);
});

gulp.task('watch:css', function() {
    gulp.watch('src/css/**', ['clean:css', 'minify:app', 'copy']);
});

gulp.task('copy:bootstrap', function() {
   gulp.src(['./node_modules/bootstrap/dist/css/*.min.css'])
   .pipe(gulp.dest('./build/css/bootstrap'));
});

gulp.task('copy:bootstrap:fonts', function() {
   gulp.src(['./node_modules/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}'])
   .pipe(gulp.dest('./build/css/fonts'));
});

gulp.task('copy:font-awesome', function() {
   gulp.src(['./node_modules/font-awesome/css/*.min.css'])
   .pipe(gulp.dest('./build/css/font-awesome'));
});

gulp.task('copy:font-awesome:fonts', function() {
   gulp.src(['./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}'])
   .pipe(gulp.dest('./build/css/fonts'));
});


gulp.task('copy', ['copy:bootstrap', 'copy:bootstrap:fonts', 'copy:font-awesome', 'copy:font-awesome:fonts']);
gulp.task('watch', ['watch:js', 'watch:css']);
gulp.task('minify', ['minify:app']);
gulp.task('clean', ['clean:js', 'clean:css']);
gulp.task('build', ['clean', 'minify', 'browserify', 'copy']);
gulp.task('default', ['build', 'webserver', 'watch']);
