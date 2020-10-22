var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify-es').default,
    fileinclude = require('gulp-ex-file-include'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    notify = require('gulp-notify'),
    basePath = require('path'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    imagemin = require('gulp-imagemin');

const paths = {
    html: {
        src: './src/html/*.html',
        build: './',
        watch: './src/html/**/*.html'
    },
    styles: {
        src: './src/styles/*.scss',
        srcPages: './src/styles/pages/*.scss',
        build: './local/templates/wineexpress/styles',
        watch: './src/styles/**/*.scss'
    },
    js: {
        srcVendor:       './src/js/vendor.js',
        srcScripts:      './src/js/scripts.js',
        srcPagesScripts: './src/js/pages/*.js',
        build: './local/templates/wineexpress/js',
        watch: './src/js/*.js',
        watchPagesScripts: './src/js/pages/*.js',
        watchPages: './src/js/pages/*.js'
    },
    img: {
        src: './src/img/**/*.*',
        build: './local/templates/wineexpress/img',
        watch: './src/img/**/*.*'
    },
    favicon: {
        src: './src/favicon/**/*.*',
        build: './local/templates/wineexpress/favicon',
        watch: './src/favicon/**/*.*'
    },
    fonts: {
        src: './src/fonts/*.*',
        build: './local/templates/wineexpress/fonts',
        watch: './src/fonts/*.*'
    }
};

gulp.task('svgIcons', function () {
    return gulp
        .src('./src/img/icons/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = basePath.basename(file.relative, basePath.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./local/templates/wineexpress/img/'));
});

gulp.task('svgSugar', function () {
    return gulp
        .src('./src/img/sugar/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = basePath.basename(file.relative, basePath.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./local/templates/wineexpress/img/'));
});

gulp.task('countriesIcons', function () {
    return gulp
        .src('./src/img/countries/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = basePath.basename(file.relative, basePath.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./local/templates/wineexpress/img/'));
});

// Local Server
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false
    })
});

// SCSS Styles
gulp.task('styles', function () {
    return gulp.src(paths.styles.src)
        .pipe(sass({outputStyle: 'compressed'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleancss({level: {1: {specialComments: 0}}})) // Opt., comment out when debugging
        .pipe(gulp.dest(paths.styles.build))
        .pipe(browserSync.stream())
});

// SCSS Styles
gulp.task('stylesPages', function () {
    return gulp.src(paths.styles.srcPages)
        .pipe(sass({outputStyle: 'compressed'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleancss({level: {1: {specialComments: 0}}}))
        .pipe(gulp.dest(paths.styles.build))
        .pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function () {
    return gulp.src([paths.js.srcVendor, paths.js.srcScripts, paths.js.srcPagesScripts])
        .pipe(rigger())
        .pipe(gulp.dest(paths.js.build))
        .pipe(uglify())
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest(paths.js.build))
        .pipe(browserSync.reload({stream: true}))
});

// HTML Live Reload
gulp.task('code', function () {
    return gulp.src(paths.html.src)
        .pipe(fileinclude())
        .pipe(gulp.dest(paths.html.build))
        .pipe(browserSync.reload({stream: true}))
});

// img task
gulp.task('img', function () {
    return gulp.src(paths.img.src)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 6}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(paths.img.build))
        .pipe(browserSync.reload({stream: true}))
});

// favicon task
gulp.task('favicon', function () {
    return gulp.src(paths.favicon.src)
        .pipe(gulp.dest(paths.favicon.build))
        .pipe(browserSync.reload({stream: true}))
});


// fonts task
gulp.task('fonts', function () {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.build))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('img', gulp.parallel('img'));

gulp.task('favicon', gulp.parallel('favicon'));

gulp.task('fonts', gulp.parallel('fonts'));

gulp.task('watch', function () {
    gulp.watch(paths.styles.watch, gulp.parallel('styles'));
    gulp.watch(paths.styles.watch, gulp.parallel('stylesPages'));
    gulp.watch(paths.js.watch, gulp.parallel('scripts'));
    gulp.watch(paths.js.watchPagesScripts, gulp.parallel('scripts'));
    gulp.watch(paths.html.watch, gulp.parallel('code'));
    gulp.watch(paths.img.watch, gulp.parallel('img'));
    gulp.watch(paths.favicon.watch, gulp.parallel('favicon'));
    gulp.watch(paths.favicon.watch, gulp.parallel('fonts'));
});

gulp.task('default', gulp.parallel('img', 'favicon', 'fonts', 'styles', 'stylesPages', 'scripts', 'code', 'browser-sync', 'watch'));
