const BaseGenerator = require("../Generator");
const path = require("path");
const getCwdRelativePath = require("../../../utils/getCwdRelativePath");

class ScriptGenerator extends BaseGenerator {
  constructor(name, type) {
    super(name, type);
  }

  get basePath() {
    return path.join(process.cwd(), "assets/js");
  }

  get templatePath() {
    return path.join(__dirname, "template.tpl");
  }

  get fileName() {
    return `${this.name}.js`;
  }

  get templateNotFoundErrorMessage() {
    return `Can't generate script for ${this.name} ${this
      .type}. The template were not found at ${this
      .templatePath}. Please make sure this file exists.`;
  }

  throwFileAlreadyExistsError(filePath) {
    throw new Error(
      `Script for ${this.name} ${this
        .type} already exists. Check ${getCwdRelativePath(filePath)}`
    );
  }
}

module.exports = ScriptGenerator;
