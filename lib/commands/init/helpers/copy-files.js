const path = require("path");
const shell = require("shelljs");

module.exports = () => {
    const templatesPath = path.join(__dirname, "..", "templates", "*");
    const projectPath = process.cwd();

    shell.cp("-r", templatesPath, projectPath);
};
