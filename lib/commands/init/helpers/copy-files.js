const path = require("path");
const shell = require("shelljs");

module.exports = () => {
  const templatesDir = path.join(__dirname, "..", "templates");
  const projectPath = process.cwd();

  shell.cp("-r", path.join(templatesDir, "*"), projectPath);
  shell.cp("-r", path.join(templatesDir, ".babelrc"), projectPath);
  shell.cp("-r", path.join(templatesDir, ".eslintrc.js"), projectPath);
};
