var gulp = require('gulp');
var	concat = require('gulp-concat');
const autoprefix = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();

var cssfiles = [
	'./app/css/main.css',
	'./app/css/second.css'
]

function styles(){
	return gulp.src(cssfiles)

	.pipe(concat('style.css'))

	.pipe(autoprefix({
		overrideBrowsersList: ['last 2 version'],
		cascade: false
	}))

	.pipe(cleanCSS({
		level: 2
	}))

	.pipe(gulp.dest('dist/css'))

	.pipe(browserSync.stream())


}

function clean(){
	return del(['dist/css/*'])
}

function watch(){
	browserSync.init({
		server: {
			baseDir: "./"
		},
		notify: false
	});
	gulp.watch('./app/css/**/*.css', styles)
	gulp.watch("./app/index.html").on('change', browserSync.reload)
}


gulp.task('styles', styles);

gulp.task('del', clean);

gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles)));
gulp.task('dev', gulp.series('build', 'watch'));
