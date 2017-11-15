const ScriptGenerator = require(".");
const path = require("path");
const fs = require("fs-extra");
const jcs = require("jscodeshift");

describe("script generator, no matter the type", () => {
  const name = "GenericTest";
  const generator = new ScriptGenerator(name, "component");

  test("fileName property is the original name appended by .js", () => {
    expect(generator.fileName).toBe(`${name}.js`);
  });

  test("templatePath returns a path that exists", async () => {
    const exists = await fs.pathExists(generator.templatePath);

    expect(exists).toBe(true);
  });

  test("throwTemplateNotFoundException actually throws an error", () => {
    expect(generator.throwTemplateNotFoundException).toThrow();
  });

  test("throwFileAlreadyExistsError actually throws an error", () => {
    expect(generator.throwFileAlreadyExistsError).toThrow();
  });

  test("globalFilePath property is '{basePath}/../global.js'", () => {
    expect(generator.globalFilePath).toBe(
      path.join(generator.basePath, "../global.js")
    );
  });

  test("importDeclaration property is an object", () => {
    expect(generator.importDeclaration).toBeInstanceOf(Object);
  });

  test("importDeclaration is of type ImportDeclaration", () => {
    expect(generator.importDeclaration.type).toBe("ImportDeclaration");
  });

  test("importDeclaration has only one specifier", () => {
    expect(generator.importDeclaration.specifiers.length).toBe(1);
  });

  test("importDeclaration specifier name equals to className", () => {
    expect(generator.importDeclaration.specifiers[0].local.name).toBe(
      generator.className
    );
  });

  test("importDeclaration source equals to importPath", () => {
    expect(generator.importDeclaration.source.value).toBe(generator.importPath);
  });

  test("newExpression property is a NewExpression", () => {
    jcs.NewExpression.assert(generator.newExpression);
  });

  test("newExpresion.callee equals to className", () => {
    expect(generator.newExpression.callee.name).toBe(generator.className);
  });

  test("newExpression has only one argument", () => {
    expect(generator.newExpression.arguments.length).toBe(1);
  });

  test("mapFunctionExpression property is an ArrowFunctionExpression", () => {
    jcs.ArrowFunctionExpression.assert(generator.mapFunctionExpression);
  });

  test("mapFunctionExpression has only one param", () => {
    expect(generator.mapFunctionExpression.params.length).toBe(1);
  });

  test("mapFunctionExpression param name is the same as newExpression argument name", () => {
    expect(generator.mapFunctionExpression.params[0].name).toBe(
      generator.newExpression.arguments[0].name
    );
  });

  test("querySelectorAllCallExpression property is a CallExpression", () => {
    jcs.CallExpression.assert(generator.querySelectorAllCallExpression);
  });

  test("querySelectorAllCallExpression is applied on document", () => {
    expect(generator.querySelectorAllCallExpression.callee.object.name).toBe(
      "document"
    );
  });

  test("querySelectorAllCallExpression applies querySelectorAll", () => {
    expect(generator.querySelectorAllCallExpression.callee.property.name).toBe(
      "querySelectorAll"
    );
  });

  test("arrayFromCallExpression property is a CallExpression", () => {
    jcs.CallExpression.assert(generator.arrayFromCallExpression);
  });

  test("arrayFromCallExpression is applied on Array", () => {
    expect(generator.arrayFromCallExpression.callee.object.name).toBe("Array");
  });

  test("arrayFromCallExpression applies from", () => {
    expect(generator.arrayFromCallExpression.callee.property.name).toBe("from");
  });

  test("mapCallExpression is a CallExpression", () => {
    jcs.CallExpression.assert(generator.mapCallExpression);
  });

  test("variableDeclarator is a VariableDeclarator", () => {
    jcs.VariableDeclarator.assert(generator.variableDeclarator);
  });

  test("variableDeclaration is a VariableDeclaration", () => {
    jcs.VariableDeclaration.assert(generator.variableDeclaration);
  });
});

describe("component script generator", () => {
  const name = "Slider";
  const type = "component";
  const generator = new ScriptGenerator(name, type);

  test("basePath property equals to {cwd}/assets/js/pages", () => {
    expect(generator.basePath).toBe(
      path.join(process.cwd(), "assets/js", `${type}s`)
    );
  });

  test("filePath property equals to {basePath}/{fileName}", () => {
    expect(generator.filePath).toBe(
      path.join(generator.basePath, generator.fileName)
    );
  });

  test("importPath property equals to './components/{fileName}", () => {
    expect(generator.importPath).toBe(`./${type}s/${generator.fileName}`);
  });
});

describe("page script generator", () => {
  const name = "Home";
  const type = "page";
  const generator = new ScriptGenerator(name, type);

  test("basePath property equals to {cwd}/assets/js/pages", () => {
    expect(generator.basePath).toBe(
      path.join(process.cwd(), "assets/js", `${type}s`)
    );
  });

  test("filePath property equals to {basePath}/{fileName}", () => {
    expect(generator.filePath).toBe(
      path.join(generator.basePath, generator.fileName)
    );
  });

  test("importPath property equals to './pages/{fileName}", () => {
    expect(generator.importPath).toBe(`./${type}s/${generator.fileName}`);
  });
});
