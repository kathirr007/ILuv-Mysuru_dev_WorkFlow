// Gulp.js configuration

// include gulp and plugins
var
	gulp = require('gulp'),
	newer = require('gulp-newer'),
	concat = require('gulp-concat'),
	htmlclean = require('gulp-htmlclean'),
	gulpif = require('gulp-if'),
	imagemin = require('gulp-imagemin'),
	imacss = require('gulp-imacss'),
	sass = require('gulp-sass'),
	pleeease = require('gulp-pleeease'),
	preprocess = require('gulp-preprocess'),
	jshint = require('gulp-jshint'),
	deporder = require('gulp-deporder'),
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	size = require('gulp-size'),
	del = require('del'),
	jsonlint = require('gulp-jsonlint'),
	jsoncombine = require('gulp-jsoncombine'),
	jsonminify = require('gulp-jsonminify'),
	browsersync = require('browser-sync'),
	pkg = require('./package.json');

var devBuild,
    source,
    dest,
    htmlSources,
    imagesSources,
    imguri,
    cssSources,    
    fontsSources,    
    coffeeSources,
    jsSources,
    sassSources,
    jsonSources,
    sassStyle,
    syncOpts;


// file locations

devBuild = process.env.NODE_ENV || 'development';

if (devBuild==='development') {
  dest = 'builds/development/';
  // sassStyle = 'expanded';
} else {
  dest = 'builds/production/';
  // sassStyle = 'compressed';
}

	// devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),

	source = 'source/master/';
	
	htmlSources = {
		in: source + '*.html',
		watch: [source + '*.html', source + 'template/**/*'],
		out: dest,
		context: {
			devBuild: devBuild,
			author: pkg.author,
			version: pkg.version
		}
	};

	imagesSources = {
		in: source + 'images/*.*',
		out: dest + 'master/images/'
	};

	imguri = {
		in: source + 'images/inline/*',
		out: source + 'scss/images/',
		filename: '_datauri.scss',
		namespace: 'img'
	};

	cssSources = {
		// in: [source + 'scss/main.scss', source + 'css/**/*'],
		in: source + 'css/**/*',
		watch: [source + 'scss/**/*', '!' + imguri.out + imguri.filename],
		out: dest + 'master/css/',
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

	fontsSources = {
		in: source + 'fonts/*.*',
		out: cssSources.out + 'fonts/'
	};

	jsSources = {
		in: source + 'js/**/*',
		out: dest + 'master/js/',
		filename: 'main.js'
	};

	jsonSources = {
		in: source + 'json/**/*',
		out: dest + 'master/json/',
		filename: 'main.json'
	};

	syncOpts = {
		server: {
			baseDir: dest,
			index: 'index.html'
		},
		open: false,
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

// build HTML files
gulp.task('html', function() {
	var page = gulp.src(htmlSources.in).pipe(preprocess({ context: htmlSources.context }));
	if (devBuild === 'production') {
		page = page
			.pipe(size({ title: 'HTML in' }))
			.pipe(htmlclean())
			.pipe(size({ title: 'HTML out' }));
	}
	return page.pipe(gulp.dest(htmlSources.out));
});

// manage images
gulp.task('images', function() {
	return gulp.src(imagesSources.in)
		.pipe(newer(imagesSources.out))
		.pipe(imagemin())
		.pipe(gulp.dest(imagesSources.out));
});

// convert inline images to dataURIs in SCSS source
gulp.task('imguri', function() {
	return gulp.src(imguri.in)
		.pipe(imagemin())
		.pipe(imacss(imguri.filename, imguri.namespace))
		.pipe(gulp.dest(imguri.out));
});

// copy fonts
gulp.task('fonts', function() {
	return gulp.src(fontsSources.in)
		.pipe(newer(fontsSources.out))
		.pipe(gulp.dest(fontsSources.out));
});

// compile Sass
gulp.task('css', ['imguri'], function() {
	return gulp.src(cssSources.in)
		// .pipe(sass(cssSources.sassOpts))
		.pipe(size({title: 'CSS in '}))
		.pipe(pleeease(cssSources.pleeeaseOpts))
		.pipe(size({title: 'CSS out '}))
		.pipe(gulp.dest(cssSources.out))
		.pipe(browsersync.reload({ stream: true }));
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
	if (devBuild === "development") {
		return gulp.src(jsSources.in)
			.pipe(newer(jsSources.out))
			// .pipe(jshint())
			// .pipe(jshint.reporter('default'))
			// .pipe(jshint.reporter('fail'))
			.pipe(gulp.dest(jsSources.out));
	}
	else {
		del([
			dest + 'js/*'
		]);
		return gulp.src(jsSources.in)
			.pipe(deporder())
			.pipe(concat(jsSources.filename))
			.pipe(size({ title: 'JS in '}))
			// .pipe(stripdebug())
			// .pipe(uglify())
			.pipe(size({ title: 'JS out '}))
			.pipe(gulp.dest(jsSources.out));
	}
});

gulp.task('json', function() {
	if (devBuild === "development") {
		return gulp.src(jsonSources.in)
			.pipe(newer(jsonSources.out))
			.pipe(jsonlint())
			.pipe(jsonlint.reporter())
			.pipe(gulp.dest(jsonSources.out));
	}
	else {
		del([
			dest + 'json/*'
		]);
		return gulp.src(jsonSources.in)
			.pipe(deporder())
			.pipe(concat(jsonSources.filename))
			.pipe(size({ title: 'JS in '}))
			.pipe(stripdebug())
			.pipe(jsonminify())
			.pipe(size({ title: 'JS out '}))
			.pipe(gulp.dest(jsonSources.out));
	}
});

// browser sync
gulp.task('browsersync', function() {
	browsersync(syncOpts);
});

// default task
gulp.task('default', ['html', 'images', 'fonts', 'css', 'js', 'json', 'browsersync'], function() {

	// html changes
	gulp.watch(htmlSources.watch, ['html', browsersync.reload]);

	// image changes
	gulp.watch(imagesSources.in, ['images']);

	// font changes
	gulp.watch(fontsSources.in, ['fonts']);

	// css changes
	gulp.watch([cssSources.watch, imguri.in], ['css']);

	// sass changes
	// gulp.watch([cssSources.watch, imguri.in], ['sass']);

	// javascript changes
	gulp.watch(jsSources.in, ['js', browsersync.reload]);

	// json changes
	gulp.watch(jsonSources.in, ['json', browsersync.reload]);	

});