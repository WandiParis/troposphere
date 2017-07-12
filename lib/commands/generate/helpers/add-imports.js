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
  const instantiationStatement = getInstantiationStatement(name);

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
  `import ${name} from "./${type}s/${kebabCase(name)}";`;

const getInstantiationStatement = name => {
  const decapitalizedName = decapitalize(name);

  return `const ${decapitalizedName}Containers = [...document.querySelectorAll(".js-${kebabCase(
    name
  )}[data-auto-instantiate]")];
const ${decapitalizedName}s = ${decapitalizedName}Containers.map(container => new ${name}(container));`;
};

const getCurrentScript = () =>
  fs.readFile(path.resolve(process.cwd(), "assets/js/global.js"), "utf8");

const setCurrentScript = script =>
  fs.outputFile(
    path.resolve(process.cwd(), "assets/js/global.js"),
    script,
    "utf8"
  );

module.exports = (type, name) => {
  // importStyle(type, name);
  importScript(type, name);
};
