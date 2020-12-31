const {src, dest, parallel, series, watch} = require('gulp'); //gulp

const autoprefixer = require('gulp-autoprefixer'); // autoprefixer
const cleanCSS = require('gulp-clean-css'); // minify css
const uglify = require('gulp-uglify-es').default; // minify js
const del = require('del'); // delete files and folders
const browserSync = require('browser-sync').create(); // browserSync
const sass = require('gulp-sass'); // sass compiler
const rename = require('gulp-rename'); // rename files
const fileinclude = require('gulp-file-include'); // plugin for file include
const sourcemaps = require('gulp-sourcemaps'); // sourcemap support for gulpjs
const notify = require('gulp-notify'); // error messages
const webpack = require('webpack'); // webpack
const webpackStream = require('webpack-stream'); // webpack as a stream
const ttf2woff =require('gulp-ttf2woff'); // converter ttf to woff
const ttf2woff2 = require('gulp-ttf2woff2'); // converter ttf to woff2
const fs = require('fs'); // module to work with files (read, write, etc.)
const tiny = require('gulp-tinypng-compress'); // API for compress images
const htmlmin = require('gulp-htmlmin');

// DEV
const resources = () => {
  return src('./src/resources/**')
    .pipe(dest('./app'))
}

const imgToApp = () => {
	return src(['./src/img/*.jpg', './src/img/*.png', './src/img/*.jpeg', './src/img/svg/*.svg', './src/img/webp/*.webp'])
    .pipe(dest('./app/img'))
}

const htmlInclude = () => {
  return src(['./src/*.html'])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
}

const woffFonts = () => {
  return src('./src/fonts/**.ttf')
    .pipe(ttf2woff())
    .pipe(ttf2woff2())
    .pipe(dest('./app/fonts/'));
}

const woff2Fonts = () => {
  return src('./src/fonts/**.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('./app/fonts/'));
}

const checkWeight = (fontname) => {
  let weight = 400;
  switch (true) {
    case /Thin/.test(fontname):
      weight = 100;
      break;
    case /ExtraLight/.test(fontname):
      weight = 200;
      break;
    case /Light/.test(fontname):
      weight = 300;
      break;
    case /Regular/.test(fontname):
      weight = 400;
      break;
    case /Medium/.test(fontname):
      weight = 500;
      break;
    case /SemiBold/.test(fontname):
      weight = 600;
      break;
    case /Semi/.test(fontname):
      weight = 600;
      break;
    case /Bold/.test(fontname):
      weight = 700;
      break;
    case /ExtraBold/.test(fontname):
      weight = 800;
      break;
    case /Heavy/.test(fontname):
      weight = 700;
      break;
    case /Black/.test(fontname):
      weight = 900;
      break;
    default:
      weight = 400;
  }
  return weight;
}

const cb = () => {}

let srcFonts = './src/scss/_fonts.scss';
let appFonts = './app/fonts/';

const fontsStyle = (done) => {
  let file_content = fs.readFileSync(srcFonts);

  fs.writeFile(srcFonts, '', cb);
  fs.readdir(appFonts, function (err, items) {
    if (items) {
      let c_fontname;
      for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
        let font = fontname.split('-')[0];
        let weight = checkWeight(fontname);

        if (c_fontname != fontname) {
          fs.appendFile(srcFonts, '@include font-face("' + font + '", "' + fontname + '", ' + weight +');\r\n', cb);
        }
        c_fontname = fontname;
      }
    }
  })

  done();
}

// для общего неминифицированного css
const devStyles = () => {
  return src('./src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded'
  }).on("error", notify.onError()))
  .pipe(dest('./app/css/'))
}

const styles = () => {
  return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on("error", notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream());
}

const scripts = () => {
  return src('./src/js/main.js')
    .pipe(webpackStream(
      {
        mode: 'development',
        output: {
          filename: 'main.js',
        },
        module: {
          rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }]
        },
        plugins: [
          new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            'windows.jQuery': 'jquery'
          })
        ]
      }
    ))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end'); // Don't stop the rest of the task
    })

    .pipe(sourcemaps.init())
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
  });

  watch('./src/scss/**/*.scss', devStyles); // для неминифиц. css
  watch('./src/scss/**/*.scss', styles);
  watch('./src/js/**/*.js', scripts);
  watch('./src/html/*.html', htmlInclude);
  watch('./src/*.html', htmlInclude);
  watch('./src/resources/**', resources);
  watch('./src/img/**.jpg', imgToApp);
  watch('./src/img/**.jpeg', imgToApp);
  watch('./src/img/**.png', imgToApp);
  watch('./src/fonts/**', woffFonts);
  watch('./src/fonts/**', woff2Fonts);
  watch('./src/fonts/**', fontsStyle);
}

const clean = () => {
	return del(['app/*'])
}

exports.fileinclude = htmlInclude;
exports.devStyles = devStyles; // для неминифиц. css
exports.styles = styles;
exports.scripts = scripts;
exports.watchFiles = watchFiles;
exports.fonts = woffFonts;
exports.fonts = woff2Fonts;
exports.fontsStyle = fontsStyle;

exports.default = series(clean, parallel(htmlInclude, scripts, woffFonts, woff2Fonts, resources, imgToApp), fontsStyle, devStyles, styles, watchFiles);

// BUILD
const tinypng = () => {
  return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg', './src/img/**.webp'])
    .pipe(tiny({
      key: 'trDJqH71snq3PZqlpMlJ8smfXYvWgynf',
      sigFile: './app/img/.tinypng-sigs',
      parallel: true,
      parallelMax: 50,
      log: true,
    }))
    .pipe(dest('./app/img'))
}

const stylesBuild = () => {
  return src('./src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on("error", notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('./app/css/'))
}

const scriptsBuild = () => {
  return src('./src/js/main.js')
    .pipe(webpackStream(

        {
          mode: 'development',
          output: {
            filename: 'main.js',
          },
          module: {
            rules: [{
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }]
          },
        }))
      .on('error', function (err) {
        console.error('WEBPACK ERROR', err);
        this.emit('end'); // Don't stop the rest of the task
      })
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest('./app/js'))
}

const htmlMinify = () => {
	return src('app/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('app'));
}

exports.tinypng = tinypng;
exports.build = series(clean, parallel(htmlInclude, scriptsBuild, woffFonts, woff2Fonts, resources, imgToApp), fontsStyle, stylesBuild, htmlMinify, tinypng);
