const exec = require("child_process").exec;

module.exports = () => {
  const dependencies = [
    "@wandiparis/gulp-styles",
    "@wandiparis/gulp-javascripts",
    "@wandiparis/gulp-fonts",
    "@wandiparis/gulp-images",
    "@wandiparis/gulp-sprite",
    "@wandiparis/stylelint-config-wandi",
    "@wandiparis/eslint-config-wandi",
    "normalize.css",
    "include-media",
    "cross-env"
  ];

  return new Promise((resolve, reject) => {
    exec(
      `npm install --save-dev ${dependencies.join(" ")}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            stdout,
            stderr
          });
        }
      }
    );
  });
};
