const path = require("path");
const fs = require("fs-extra");
const kebabCase = require("voca/kebab_case");
const decapitalize = require("voca/decapitalize");

const importStyle = (type, name) => {
  const indexPath = path.resolve(
    process.cwd(),
    "assets/scss",
    `${type}s`,
    "_index.scss"
  );

  return fs.appendFile(indexPath, `\n@import "${kebabCase(name)}";`);
};

const importScript = async (type, name) => {
  const importStatement = getImportStatement(type, name);
  const instantiationStatement = getInstantiationStatement(type, name);

  const currentScript = await getCurrentScript();
  const importMarker = `/* /${type}s imports */`;
  const instantiationMarker = `/* /${type}s instantiation */`;

  const newScript = currentScript
    .replace(importMarker, importStatement + "\n" + importMarker)
    .replace(
      instantiationMarker,
      instantiationStatement + "\n" + instantiationMarker
    );

  return setCurrentScript(newScript);
};

const getImportStatement = (type, name) =>
  `import ${type === "page"
    ? name + "Page"
    : name} from "./${type}s/${kebabCase(name)}";`;

const getInstantiationStatement = (type, name) => {
  const decapitalizedName =
    decapitalize(name) + `${type === "page" ? "Page" : ""}`;

  return `const ${decapitalizedName}Containers = [...document.querySelectorAll(".js-${kebabCase(
    name
  )}${type === "page" ? "-page" : ""}[data-auto-instantiate]")];
const ${decapitalizedName}s = ${decapitalizedName}Containers.map(container => new ${name}${type ===
  "page"
    ? "Page"
    : ""}(container));`;
};

const getCurrentScript = () =>
  fs.readFile(path.resolve(process.cwd(), "assets/js/global.js"), "utf8");

const setCurrentScript = script =>
  fs.outputFile(
    path.resolve(process.cwd(), "assets/js/global.js"),
    script,
    "utf8"
  );

module.exports = (type, name) =>
  Promise.all([importStyle(type, name), importScript(type, name)]);
