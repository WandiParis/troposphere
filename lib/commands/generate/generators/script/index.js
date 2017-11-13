const BaseGenerator = require("../Generator");
const path = require("path");
const getCwdRelativePath = require("../../../../utils/getCwdRelativePath");
const camelCase = require("voca/camel_case");
const kebabCase = require("voca/kebab_case");

class ScriptGenerator extends BaseGenerator {
  constructor(name, type) {
    super(name, type);
  }

  get basePath() {
    return path.join(process.cwd(), "assets/js", `${this.type}s`);
  }

  get templatePath() {
    return path.join(__dirname, "template.tpl");
  }

  get fileName() {
    return `${this.name}.js`;
  }

  get importPath() {
    return `./${this.type}s/${this.fileName}`;
  }

  get globalFilePath() {
    return path.join(this.basePath, "../global.js");
  }

  get importDeclaration() {
    return `import ${this.className} from "${this.importPath}";`;
  }

  get importDeclarationDelimiter() {
    return `/* /${this.type}s imports */`;
  }

  get instantiationDeclaration() {
    const camelCasedClassName = camelCase(this.className);
    const selector = `.js-${kebabCase(this.name)}`;

    return `
const ${camelCasedClassName}Containers = [...document.querySelectorAll("${selector}")];
const ${camelCasedClassName}s = ${camelCasedClassName}Containers.map(container => new ${this
      .name}(container));
`;
  }

  get instantiationDeclarationDelimiter() {
    return `/* /${this.type}s instantiation */`;
  }

  throwTemplateNotFoundException() {
    throw new Error(
      `Can't generate script for ${this.name} ${this
        .type}. The template were not found at ${this
        .templatePath}. Please make sure this file exists.`
    );
  }

  throwFileAlreadyExistsError() {
    throw new Error(
      `Script for ${this.name} ${this
        .type} already exists. Check ${getCwdRelativePath(this.filePath)}`
    );
  }

  async addImportDeclaration() {
    const globalFileContent = await this.getGlobalFileContent();

    const newGlobalFileContent = globalFileContent
      .replace(
        this.importDeclarationDelimiter,
        this.importDeclaration + "\n" + this.importDeclarationDelimiter
      )
      .replace(
        this.instantiationDeclarationDelimiter,
        this.instantiationDeclaration +
          "\n" +
          this.instantiationDeclarationDelimiter
      );

    this.writeGlobalFile(newGlobalFileContent);

    return this.globalFilePath;
  }
}

module.exports = ScriptGenerator;
