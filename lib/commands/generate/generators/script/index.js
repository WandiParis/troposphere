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

  get newExpression() {
    return jcs.newExpression(jcs.identifier(this.className), [
      jcs.identifier("container")
    ]);
  }

  get mapFunctionExpression() {
    return jcs.arrowFunctionExpression(
      [jcs.identifier("container")],
      this.newExpression,
      true
    );
  }

  get querySelectorAllCallExpression() {
    return jcs.callExpression(
      jcs.memberExpression(
        jcs.identifier("document"),
        jcs.identifier("querySelectorAll")
      ),
      [jcs.literal(`.js-${kebabCase(this.className)}[data-auto-instantiate]`)]
    );
  }

  get arrayFromCallExpression() {
    return jcs.callExpression(
      jcs.memberExpression(jcs.identifier("Array"), jcs.identifier("from")),
      [this.querySelectorAllCallExpression]
    );
  }

  get mapCallExpression() {
    return jcs.callExpression(
      jcs.memberExpression(this.arrayFromCallExpression, jcs.identifier("map")),
      [this.mapFunctionExpression]
    );
  }

  get variableDeclarator() {
    return jcs.variableDeclarator(
      jcs.identifier(`${camelCase(this.className)}s`),
      this.mapCallExpression
    );
  }

  get variableDeclaration() {
    return jcs.variableDeclaration("const", [this.variableDeclarator]);
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

    const program = ast
      .find(jcs.Program)
      .paths()
      .pop();

    if (lastImportDeclaration) {
      lastImportDeclaration.insertAfter(this.importDeclaration);
    } else {
      // if we don't already have an import declaration, push the new import declaration at the first position of the body of the program
      program.value.body.unshift(this.importDeclaration);
    }

    program.value.body.push(this.variableDeclaration);

    this.writeGlobalFile(ast.toSource());

    return this.globalFilePath;
  }
}

module.exports = ScriptGenerator;
