
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-ruby-sass');
var reload      = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
//gulp.task('sass', function() {
//    return gulp.src("scss/*.scss")
//        .pipe(sass({ style: 'expanded' }))
//        .pipe(gulp.dest("css"))
//        .pipe(reload({stream: true}));
//});

gulp.task('sass', function () {
    return sass('scss/*.scss', { style: 'expanded' }) // 指明源文件路径、并进行文件匹配（style: 'compressed' 表示输出格式）
        .on('error', function (err) {
            console.error('Error!', err.message); // 显示错误信息
        })
        .pipe(gulp.dest('css')); // 输出路径
})

gulp.task('default', ['serve']);