var gulp = require('gulp');
var shell = require('gulp-shell');
var ghPages = require('gulp-gh-pages');


gulp.task('cookies_basic', function(){
  return gulp.src('./src').pipe(shell(['node /cookies_session_basic/myserver_basic.js']))
  });

  gulp.task('cookies_middleware', function(){
      return gulp.src('./src').pipe(shell(['node /cookies_session_middleware/myserver_middleware.js']))
      });
