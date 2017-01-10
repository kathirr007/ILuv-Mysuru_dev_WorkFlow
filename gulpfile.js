var gulp = require('gulp'),
    del = require('del'),
    browsersync = require('browser-sync'),
    pkg = require('./package.json'),
    $ = require('gulp-load-plugins')({ lazy: true });

// source variables
var devBuild, source, mainjs, dest, htmlSources, imagesSources, imguri, cssSources, fontsSources, coffeeSources, jsSources, sassSources, jsonSources, sassStyle, syncOpts;

// file locations
devBuild = process.env.NODE_ENV || 'development';

if (devBuild === 'development') {
    dest = 'builds/development/';
    // sassStyle = 'expanded';
} else {
    dest = 'builds/production/';
    // sassStyle = 'compressed';
}
source = 'source/assets/';
mainjs = { in : source + "*.js",
    out: dest
};
dynamicContentsJs = { in : source + "template/js/_dynamic_cnt_body.js",
    watch: [source + 'template/**/*'],
    out: dest + "assets/js/"
};

htmlSources = { in : source + '*.html',
    watch: [source + '*.html', source + 'template/**/*'],
    out: dest,
    context: {
        devBuild: devBuild,
        author: pkg.author,
        version: pkg.version
    }
};

imagesSources = { in : source + 'images/*.*',
    out: dest + 'assets/images/'
};

imguri = { in : source + 'images/inline/*',
    out: source + 'scss/images/',
    filename: '_datauri.scss',
    namespace: 'img'
};

cssSources = {
    // in: [source + 'scss/main.scss', source + 'css/**/*'],
    in : source + 'css/**/*',
    watch: [source + 'scss/**/*', source + 'css/**/*', '!' + imguri.out + imguri.filename],
    out: dest + 'assets/css/',
    sassOpts: {
        outputStyle: 'nested',
        imagePath: '../images',
        precision: 3,
        errLogToConsole: true
    },
    pleeeaseOpts: {
        autoprefixer: { browsers: ['last 2 versions', '> 2%'] },
        rem: ['16px'],
        pseudoElements: true,
        mqpacker: true,
        minifier: !devBuild
    }
};

fontsSources = { in : source + 'fonts/*.*',
    out: dest + 'assets/fonts/'
};

jsSources = { in : [
        // source + 'js/jquery-ui.min.js',
        source + 'js/jquery-1.12.4.min.js', source + 'js/bootstrap.min.js', source + 'js/jssor.slider-21.1.5.min.js', source + 'js/carousel.js', source + 'js/jquery.contact-buttons.js', source + 'js/social_buttons.js', source + 'js/menu-jquery.js', source + 'js/menu-jquery1.js'
    ],
    out: dest + 'assets/js/',
    filename: 'main.js'
};

jsonSources = { in : source + 'json/**/*',
    out: dest + 'assets/json/',
    filename: 'main.json'
};

syncOpts = {
    server: {
        baseDir: dest,
        index: 'index.html'
    },
    open: true,
    notify: true
};



// show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + devBuild + ' build');

console.log(dest);

// clean the build folder
gulp.task('clean', function() {
    del([
        dest + '*'
    ]);
});

// load datas
gulp.task('mainjs', function() {
    gulp.src(mainjs.in)
        .pipe($.if(devBuild === 'production', $.uglify()))
        .pipe(gulp.dest(mainjs.out))
        .pipe(browsersync.reload({ stream: true }));
});

// Prettify source files
// gulp.task('prettify', function() {

// }

// build HTML files
gulp.task('minifyTest', function() {
	return gulp.src(jsSources.in)
        .pipe($.newer(jsSources.out))
        .pipe($.uglify())
        .pipe(gulp.dest(jsSources.out));
});

// build HTML files
gulp.task('html', function() {
    var page = gulp.src(htmlSources.in)
    			   .pipe($.jsbeautifier({"max_preserve_newlines": 0}))
    			   .pipe($.preprocess({ context: htmlSources.context }));
    if (devBuild === 'production') {
        page = page
            .pipe($.size({ title: 'HTML in' }))
            .pipe($.htmlclean())
            .pipe($.size({ title: 'HTML out' }));
    }
    return page
        // .pipe(esformatter())
        .pipe(gulp.dest(htmlSources.out));
});

// manage images
gulp.task('images', function() {
    return gulp.src(imagesSources.in)
        .pipe($.newer(imagesSources.out))
        .pipe($.imagemin())
        .pipe(gulp.dest(imagesSources.out));
});

// convert inline images to dataURIs in SCSS source
gulp.task('imguri', function() {
    return gulp.src(imguri.in)
        .pipe($.imagemin())
        .pipe($.imacss(imguri.filename, imguri.namespace))
        .pipe(gulp.dest(imguri.out));
});

// copy fonts
gulp.task('fonts', function() {
    return gulp.src(fontsSources.in)
        .pipe($.newer(fontsSources.out))
        .pipe(gulp.dest(fontsSources.out));
});

// compile css

gulp.task('css', function() {
    var source = gulp.src(cssSources.in);
    // .pipe(concat('style.css'))
    if (devBuild === "development") {
        source.pipe(gulp.dest(cssSources.out))
            .pipe(browsersync.reload({ stream: true }));
    } else {
        source.pipe($.size({ title: 'CSS in' }))
            .pipe($.cleanCss({ processImport: false }))
            .pipe($.size({ title: 'CSS out' }))
            .pipe(gulp.dest(cssSources.out))
            .pipe(browsersync.reload({ stream: true }));
    }

    // .pipe(connect.reload())
    // .pipe(browsersync.reload({ stream: true }));
});

// compile Sass
// gulp.task('sass', ['imguri'], function() {
// 	return gulp.src(cssSources.in)
// 		.pipe(sass(cssSources.sassOpts))
// 		.pipe(size({title: 'CSS in '}))
// 		.pipe(pleeease(cssSources.pleeeaseOpts))
// 		.pipe(size({title: 'CSS out '}))
// 		.pipe(gulp.dest(cssSources.out))
// 		.pipe(browsersync.reload({ stream: true }));
// });

gulp.task('js', function() {
    // if (devBuild === "development") {
    return gulp.src(jsSources.in)
        .pipe($.newer(jsSources.out))
        .pipe($.if(devBuild === 'production', $.uglify()))
        // .pipe(jshint.reporter('default'))
        // .pipe(jshint.reporter('fail'))
        .pipe(gulp.dest(jsSources.out));

});

gulp.task('dynamicJs', function() {
    return gulp.src(dynamicContentsJs.in).pipe($.preprocess())
        .pipe($.rename("dynamicContents.js"))
        .pipe($.if(devBuild === 'production', $.uglify()))
        .pipe(gulp.dest(dynamicContentsJs.out));

});

gulp.task('json', function() {
    if (devBuild === "development") {
        return gulp.src(jsonSources.in)
            .pipe($.newer(jsonSources.out))
            .pipe($.jsonlint())
            .pipe($.jsonlint.reporter())
            .pipe(gulp.dest(jsonSources.out));
    } else {
        del([
            dest + 'json/*'
        ]);
        return gulp.src(jsonSources.in)
            .pipe($.deporder())
            // .pipe(concat(jsonSources.filename))
            .pipe($.size({ title: 'JS in ' }))
            .pipe($.stripDebug())
            .pipe($.jsonminify())
            .pipe($.size({ title: 'JS out ' }))
            .pipe(gulp.dest(jsonSources.out));
    }
});

// browser sync
gulp.task('browsersync', function() {
    browsersync(syncOpts);
});

// watch
gulp.task('watch', function() {
    gulp.watch(htmlSources.watch, ['html', browsersync.reload]);
    gulp.watch(imagesSources.in, ['images']);
    gulp.watch(fontsSources.in, ['fonts']);
    gulp.watch([cssSources.watch, imguri.in], ['css']);
    gulp.watch(jsSources.in, ['js', browsersync.reload]);
    gulp.watch(dynamicContentsJs.watch, ['dynamicJs', browsersync.reload]);
    gulp.watch(jsonSources.in, ['json', browsersync.reload]);
});

// default travis CI
gulp.task('travis', ['mainjs', 'html', 'images', 'fonts', 'css', 'js', 'dynamicJs', 'json'], function() {
});

// default task
gulp.task('default', ['mainjs', 'html', 'images', 'fonts', 'css', 'js', 'dynamicJs', 'json', 'browsersync', 'watch']);
