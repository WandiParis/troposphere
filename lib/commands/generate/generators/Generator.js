const kebabCase = require("voca/kebab_case");
const fs = require("fs-extra");
const path = require("path");

class Generator {
  constructor(name, type) {
    this.name = name;
    this.className = type === "page" ? name + "Page" : name;
    this.type = type;
  }

  async getFileContent() {
    let template;

    try {
      template = await fs.readFile(this.templatePath, "utf8");
    } catch (error) {
      this.throwTemplateNotFoundException();
    }

    const content = template.replace(/{{name}}/g, this.className);

    return content;
  }

  get filePath() {
    return path.join(this.basePath, this.fileName);
  }

  writeFile(path, content) {
    return fs.outputFile(path, content, "utf8");
  }

  async generate() {
    if (await fs.pathExists(this.filePath)) {
      this.throwFileAlreadyExistsError();
    }

    const fileContent = await this.getFileContent();

    await this.writeFile(this.filePath, fileContent);

    return this.filePath;
  }

  async addImportDeclaration() {
    let globalFileContent;

    try {
      globalFileContent = await fs.readFile(this.globalFilePath, "utf8");
    } catch (error) {
      this.throwGlobalFileDoesNotExistError();
    }

    const newFileContent = globalFileContent + this.importDeclaration + "\n";

    try {
      await fs.outputFile(this.globalFilePath, newFileContent, "utf8");
    } catch (error) {
      this.throwGlobalFileIsNotWritableError();
    }

    return this.globalFilePath;
  }
}

module.exports = Generator;
