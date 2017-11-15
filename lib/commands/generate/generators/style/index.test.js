const StyleGenerator = require(".");
const path = require("path");
const fs = require("fs-extra");
const kebabCase = require("voca/kebab_case");

describe("style generator, no matter the type", () => {
  const name = "GenericTest";
  const generator = new StyleGenerator(name, "component");

  test("fileName property is the kebab cased name prepended by an underscode and appended by .scss", () => {
    expect(generator.fileName).toBe(`_${kebabCase(name)}.scss`);
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

  test("importPath property is the kebab cased name", () => {
    expect(generator.importPath).toBe(kebabCase(name));
  });

  test('importDeclaration property equals to `@import "{importPath}";`', () => {
    expect(generator.importDeclaration).toBe(
      `@import "${generator.importPath}";`
    );
  });

  test("throwGlobalFileDoesNotExistError actually throws an error", () => {
    expect(generator.throwGlobalFileDoesNotExistError).toThrow();
  });

  test("throwGlobalFileIsNotWritableError actually throws an error", () => {
    expect(generator.throwGlobalFileIsNotWritableError).toThrow();
  });
});

describe("component style generator", () => {
  const name = "Slider";
  const type = "component";
  const generator = new StyleGenerator(name, type);

  test("basePath property equals to {cwd}/assets/scss/components", () => {
    expect(generator.basePath).toBe(
      path.join(process.cwd(), "assets/scss", `${type}s`)
    );
  });

  test("filePath property equals to {basePath}/{fileName}", () => {
    expect(generator.filePath).toBe(
      path.join(generator.basePath, generator.fileName)
    );
  });

  test("globalFilePath property equals to {basePath}/_index.scss", () => {
    expect(generator.globalFilePath).toBe(
      path.join(generator.basePath, "_index.scss")
    );
  });
});

describe("page style generator", () => {
  const name = "Home";
  const type = "page";
  const generator = new StyleGenerator(name, type);

  test("basePath property equals to {cwd}/assets/scss/pages", () => {
    expect(generator.basePath).toBe(
      path.join(process.cwd(), "assets/scss", `${type}s`)
    );
  });

  test("filePath property is {basePath}/{fileName}", () => {
    expect(generator.filePath).toBe(
      path.join(generator.basePath, generator.fileName)
    );
  });

  test("globalFilePath property equals to {basePath}/_index.scss", () => {
    expect(generator.globalFilePath).toBe(
      path.join(generator.basePath, "_index.scss")
    );
  });
});
