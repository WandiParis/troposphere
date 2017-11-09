const StyleGenerator = require("./generator");
const path = require("path");
const fs = require("fs-extra");
const kebabCase = require("voca/kebab_case");

describe("both types", () => {
  const name = "GenericTest";
  const generator = new StyleGenerator(name, "component");

  test("fileName returns the kebab cased name prepended by an underscode and appended by .scss", () => {
    expect(generator.fileName).toBe(`_${kebabCase(name)}.scss`);
  });

  test("basePath returns {cwd}/assets/scss", () => {
    expect(generator.basePath).toBe(path.join(process.cwd(), "assets/scss"));
  });

  test("templatePath returns a path that exists", async () => {
    const exists = await fs.pathExists(generator.templatePath);

    expect(exists).toBe(true);
  });

  test("throwFileAlreadyExistsError actually throws an error", () => {
    expect(generator.throwFileAlreadyExistsError).toThrow();
  });
});

describe("component generator", () => {
  const name = "Slider";
  const generator = new StyleGenerator(name, "component");

  test("filePath returns {cwd}/assets/scss/components/{fileName}", () => {
    expect(generator.filePath).toBe(
      path.join(process.cwd(), "assets/scss/components", generator.fileName)
    );
  });
});

describe("page generator", () => {
  const name = "Home";
  const generator = new StyleGenerator("Home", "page");

  test("filePath returns {cwd}/assets/scss/pages/{fileName}", () => {
    expect(generator.filePath).toBe(
      path.join(process.cwd(), "assets/scss/pages", generator.fileName)
    );
  });
});
