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

  test("basePath property equals to {cwd}/assets/scss", () => {
    expect(generator.basePath).toBe(path.join(process.cwd(), "assets/scss"));
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
});

describe("component style generator", () => {
  const name = "Slider";
  const generator = new StyleGenerator(name, "component");

  test("filePath property equals to {basePath}/components/{fileName}", () => {
    expect(generator.filePath).toBe(
      path.join(generator.basePath, "components", generator.fileName)
    );
  });
});

describe("page style generator", () => {
  const name = "Home";
  const generator = new StyleGenerator(name, "page");

  test("filePath property is {basePath}/pages/{fileName}", () => {
    expect(generator.filePath).toBe(
      path.join(generator.basePath, "pages", generator.fileName)
    );
  });
});