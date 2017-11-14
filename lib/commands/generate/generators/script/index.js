const BaseGenerator = require("../Generator");
const path = require("path");
const getCwdRelativePath = require("../../../../utils/getCwdRelativePath");
const camelCase = require("voca/camel_case");
const kebabCase = require("voca/kebab_case");
const jcs = require("jscodeshift");

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
    return jcs.importDeclaration(
      [jcs.importDefaultSpecifier(jcs.identifier(this.className))],
      jcs.literal(this.importPath)
    );
  }

  get importDeclarationDelimiter() {
    return `/* /${this.type}s imports */`;
  }

  get instantiationDeclaration() {
    return `
const ${camelCasedClassName}Containers = [...document.querySelectorAll("${
      selector
    }")];
const ${camelCasedClassName}s = ${
      camelCasedClassName
    }Containers.map(container => new ${this.name}(container));
`;
  }

  get instantiationDeclarationDelimiter() {
    return `/* /${this.type}s instantiation */`;
  }

  throwTemplateNotFoundException() {
    throw new Error(
      `Can't generate script for ${this.name} ${
        this.type
      }. The template were not found at ${
        this.templatePath
      }. Please make sure this file exists.`
    );
  }

  throwFileAlreadyExistsError() {
    throw new Error(
      `Script for ${this.name} ${
        this.type
      } already exists. Check ${getCwdRelativePath(this.filePath)}`
    );
  }

  async addImportDeclaration() {
    const globalFileContent = await this.getGlobalFileContent();
    const ast = jcs(globalFileContent);

    const lastImportDeclaration = ast
      .find(jcs.ImportDeclaration)
      .paths()
      .pop();

    if (lastImportDeclaration) {
      lastImportDeclaration.insertAfter(this.importDeclaration);
    } else {
      // if we don't already have an import declaration, push the new import declaration at the first position of the body of the program
      const firstNode = ast
        .find(jcs.Node)
        .paths()
        .shift();

      firstNode.value.body.unshift(this.importDeclaration);
    }

    this.writeGlobalFile(ast.toSource());

    return this.globalFilePath;
  }
}

module.exports = ScriptGenerator;
