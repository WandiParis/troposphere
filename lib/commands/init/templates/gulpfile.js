/* eslint-env node */

const gulp = require("gulp");
const baseStyles = require("@wandiparis/gulp-styles");
const baseJavascripts = require("@wandiparis/gulp-javascripts");
const images = require("@wandiparis/gulp-images");
const fonts = require("@wandiparis/gulp-fonts");
const sprite = require("@wandiparis/gulp-sprite");

const production = process.env.NODE_ENV;

const styles = baseStyles({
  sassOptions: { includePaths: ["node_modules"] },
  production
});

const javascripts = baseJavascripts({
  rootDir: __dirname,
  production
});

const compile = gulp.parallel(
  javascripts,
  fonts(),
  gulp.series(sprite(), styles, images())
);

const watch = () => {
  gulp.watch("assets/scss/**/*.scss", styles);
  gulp.watch("assets/img/**/*.{jpg,png,gif,svg}", images());
  gulp.watch("assets/img/icons/*.png", sprite());

  baseJavascripts(
    {
      rootDir: __dirname
    },
    {
      watch: true
    }
  )();
};

module.exports = {
  compile,
  watch
};
