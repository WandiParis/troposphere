const BaseGenerator = require("../Generator");
const kebabCase = require("voca/kebab_case");
const path = require("path");
const getCwdRelativePath = require("../../../../utils/getCwdRelativePath");
const fs = require("fs-extra");

class StyleGenerator extends BaseGenerator {
  constructor(name, type) {
    super(name, type);
  }

  get basePath() {
    return path.join(process.cwd(), "assets/scss");
  }

  get templatePath() {
    return path.join(__dirname, "template.tpl");
  }

  get fileName() {
    return `_${kebabCase(this.name)}.scss`;
  }

  get templateNotFoundErrorMessage() {
    return `Can't generate style for ${this.name} ${this
      .type}. The template were not found at ${this
      .templatePath}. Please make sure this file exists.`;
  }

  throwFileAlreadyExistsError(filePath) {
    throw new Error(
      `Style for ${this.name} ${this
        .type} already exists. Check ${getCwdRelativePath(filePath)}`
    );
  }

  addImport() {
    const indexPath = path.resolve(
      process.cwd(),
      "assets/scss",
      `${this.type}s`,
      "_index.scss"
    );

    return fs.appendFile(indexPath, `\n@import "${this.fileName}";`);
  }
}

module.exports = StyleGenerator;
