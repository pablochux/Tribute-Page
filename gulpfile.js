// Plugins
var gulp = require('gulp'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    pump = require('pump'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

// Directories
var src = 'template/src/assets/web/',
    cssDirectory = 'template/src/assets/web/css',
    preLessDirectory = 'template/src/assets/web/less',
    lessDirectory = 'template/src/assets/web/css';

var minsrc = 'template/dist/assets/web/';

// TASKS 

// Default minify-css
gulp.task('minify-css', function(){
    return gulp.src(src + 'css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(minsrc + 'css'));
});

// Compile the less files 
gulp.task("less", function() {
    gulp.src(src + "less/*.less")
        .pipe(less())
        .pipe(gulp.dest(src + 'css'));
});
 
// Concat all the js files
gulp.task('concat-js', function() {
  return gulp.src(src + 'js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest(src + 'js/'));
});

// Minify js 
gulp.task('minify-js', function (cb) {
  pump([
        gulp.src(src + 'js/script.js'),
        uglify(),
        gulp.dest(minsrc + 'js/')
    ],
    cb
  );
});


gulp.task('minify-html', function() {
  return gulp.src(src + '/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(minsrc))
});

// Finish proyect
// Improve
gulp.task('finish', ['concat-js', 'minify-js', 'less', 'minify-css', 'minify-html'], function() {
	console.log("Finished");
})

// Default starts the server
gulp.task('default', function(){
	browserSync.init({
		server: src + "/",
		browser: "Google Chrome Canary",
		notify: false
	});

	gulp.watch(src + "/less/*.less", ['less']);
	gulp.watch(src + "/less/*.less").on("change", reload);
	gulp.watch(src + "/*.html").on("change", reload);
	gulp.watch(src + "/js/*.js").on("change", reload);
});
