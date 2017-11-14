const ScriptGenerator = require(".");
const path = require("path");
const fs = require("fs-extra");

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

  test("importDeclarationDelimiter property equals to /* /components imports */", () => {
    expect(generator.importDeclarationDelimiter).toBe(
      "/* /components imports */"
    );
  });

  test("instantiationDeclarationDelimiter property equals to /* /components instantiation */", () => {
    expect(generator.instantiationDeclarationDelimiter).toBe(
      "/* /components instantiation */"
    );
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

  test("importDeclarationDelimiter property equals to /* /pages imports */", () => {
    expect(generator.importDeclarationDelimiter).toBe("/* /pages imports */");
  });

  test("instantiationDeclarationDelimiter property equals to /* /pages instantiation */", () => {
    expect(generator.instantiationDeclarationDelimiter).toBe(
      "/* /pages instantiation */"
    );
  });
});
