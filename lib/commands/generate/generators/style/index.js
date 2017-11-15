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
    return path.join(process.cwd(), "assets/scss", `${this.type}s`);
  }

  get templatePath() {
    return path.join(__dirname, "template.tpl");
  }

  get fileName() {
    return `_${kebabCase(this.name)}.scss`;
  }

  get importPath() {
    return kebabCase(this.name);
  }

  get importDeclaration() {
    return `@import "${this.importPath}";`;
  }

  get globalFilePath() {
    return path.join(this.basePath, "_index.scss");
  }

  throwTemplateNotFoundException() {
    throw new Error(
      `Can't generate style for ${this.name} ${
        this.type
      }. The template were not found at ${
        this.templatePath
      }. Please make sure this file exists.`
    );
  }

  throwFileAlreadyExistsError() {
    throw new Error(
      `Style for ${this.name} ${
        this.type
      } already exists. Check ${getCwdRelativePath(this.filePath)}`
    );
  }

  throwGlobalFileDoesNotExistError() {
    throw new Error(
      `Impossible to add import declaration for ${this.name} ${
        this.type
      } because ${getCwdRelativePath(
        this.globalFilePath
      )} does not exist.\nDo you have a good directory architecture ? Maybe your forgot to initialize your project using \`troposphere init\`.`
    );
  }

  throwGlobalFileIsNotWritableError() {
    throw new Error(
      `Impossible to add import declaration for ${this.name} ${
        this.type
      } because ${getCwdRelativePath(
        this.globalFilePath
      )} is not writable. Please make sure you have the good rights on the file.`
    );
  }

  async addImportDeclaration() {
    const globalFileContent = await this.getGlobalFileContent();
    const newFileContent = globalFileContent + this.importDeclaration + "\n";

    this.writeGlobalFile(newFileContent);

    return this.globalFilePath;
  }
}

module.exports = StyleGenerator;
