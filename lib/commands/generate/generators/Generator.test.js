const Generator = require("./Generator");

describe("base component generator", () => {
  const name = "Test";
  const type = "component";
  const generator = new Generator(name, type);

  test("name property is the original name", () => {
    expect(generator.name).toBe(name);
  });

  test("className property is the original name", () => {
    expect(generator.className).toBe(name);
  });

  test("type property is the original type", () => {
    expect(generator.type).toBe(type);
  });
});

describe("base page generator", () => {
  const name = "Test";
  const type = "page";
  const generator = new Generator(name, type);

  test("name property is the original name", () => {
    expect(generator.name).toBe(name);
  });

  test("className property is the original name with Page prepended", () => {
    expect(generator.className).toBe(name + "Page");
  });

  test("type property is the original type", () => {
    expect(generator.type).toBe(type);
  });
});
