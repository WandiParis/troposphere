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
      throw new Error(this.templateNotFoundErrorMessage);
    }

    const content = template.replace(/{{name}}/g, className);

    return content;
  }

  get filePath() {
    return path.join(this.basePath, this.type + "s", this.fileName);
  }

  writeFile(path, content) {
    return fs.outputFile(path, content, "utf8");
  }

  async generate(addImport) {
    const filePath = this.getFilePath();

    if (await fs.pathExists(filePath)) {
      this.throwFileAlreadyExistsError(filePath);
    }

    const fileContent = await this.getFileContent();

    await this.writeFile(filePath, fileContent);

    if (addImport) {
      await this.addImport();
    }

    return filePath;
  }
}

module.exports = Generator;
