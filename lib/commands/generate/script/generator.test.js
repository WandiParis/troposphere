const ScriptGenerator = require("./generator");
const path = require("path");
const fs = require("fs-extra");

describe("both types", () => {
  const name = "GenericTest";
  const generator = new ScriptGenerator(name, "component");

  test("fileName returns the original name appended by .js", () => {
    expect(generator.fileName).toBe(`${name}.js`);
  });

  test("basePath returns {cwd}/assets/js", () => {
    expect(generator.basePath).toBe(path.join(process.cwd(), "assets/js"));
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
  const generator = new ScriptGenerator(name, "component");

  test("className is the original name", () => {
    expect(generator.className).toBe(name);
  });

  test("filePath returns {cwd}/assets/js/components/{fileName}", () => {
    expect(generator.filePath).toBe(
      path.join(process.cwd(), `assets/js/components/${name}.js`)
    );
  });
});

describe("page generator", () => {
  const name = "Home";
  const generator = new ScriptGenerator(name, "page");

  test("className is the original name with Page prepended", () => {
    expect(generator.className).toBe(name + "Page");
  });

  test("filePath returns {cwd}/assets/js/pages/{fileName}", () => {
    expect(generator.filePath).toBe(
      path.join(process.cwd(), `assets/js/pages/${name}.js`)
    );
  });
});
