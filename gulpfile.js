const {src, dest, task, series, parallel, watch} = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');


const toClean =[
  'dist/**/*.js',
  'dist/**/*.css',
  'dist/**/*.html'
]
task('clean', () => {
  return src(toClean, {read: false})
  .pipe(clean());
});

task('copy-html',() => {
  return src('src/*.html')
    .pipe(dest('dist'));
});

task('style', ()=>{
  return src([...STYLE_LIBS, 'src/styles/**/*.css'])
  .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS())
  .pipe(sourcemaps.write())
  .pipe(dest(DIST_PATH));
})

task('watch', ()=>{
  watch('src/**/*.html', series('copy-html'));
  watch('src/**/*.css', series('style'));
})

task('default', series('clean', parallel('copy-html', 'style'), 'watch'));
