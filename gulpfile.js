var gulp = require('gulp'); 
connect = require('gulp-connect');
sass = require('gulp-sass');

gulp.task('connect', function() {
  connect.server({
  	root: './',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function(){
  return gulp.src('sass/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
  gulp.watch('sass/**/*.scss', ['sass']); 
});

gulp.task('default', ['connect','watch']);