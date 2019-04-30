import gulp, { series, parallel } from 'gulp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import historyApiFallback from 'connect-history-api-fallback';

const server = browserSync.create();

function compileJavaScript() {
    return gulp.src('./src/js/index.js')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest('./'));
}

function compileCSS() {
    return gulp.src('./src/scss/index.scss')
        .pipe(sass()
            .on('error', sass.logError)
        )
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(server.stream());
}

function browserSyncServe() {
    return server.init({
        server: {
            baseDir: './public',
            middleware: [historyApiFallback()]
        }
    });
}

function reload(done) {
    server.reload();
    done();
}

function watchFiles() {
    gulp.watch('./src/**/*.(js|jsx)', gulp.series(compileJavaScript, reload));
    gulp.watch('./src/**/*.(css|scss)', gulp.series(compileCSS));
    gulp.watch('./public/**/*.html', reload)
}

const build = parallel(compileCSS, compileJavaScript);
const serve = series(build, parallel(watchFiles, browserSyncServe));

gulp.task('compile-css', compileCSS);
gulp.task('compile-js', compileJavaScript);
gulp.task('build', build);
gulp.task('default', serve);