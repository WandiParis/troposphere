const fs = require("fs-extra");
const chalk = require("chalk");
const path = require("path");
const kebabCase = require("voca/kebab_case");
const decapitalize = require("voca/decapitalize");

const normalizePartType = partType => {
  switch (partType) {
    case "script":
      return "js";
    case "style":
      return "scss";
    default:
      throw new Error(`Unknown part : ${partType}`);
  }
};

const getFileName = name => kebabCase(name);

const getPartPath = (partType, type, name) => {
  const fileName = getFileName(name);
  const fileExtension = normalizePartType(partType);
  const normalizedPartType = normalizePartType(partType);
  return path.join(
    process.cwd(),
    `assets/${normalizedPartType}/${type}s/${fileName}.${fileExtension}`
  );
};

const partExists = (partType, type, name) => {
  const partPath = getPartPath(partType, type, name);

  return fs.pathExists(partPath);
};

const getPartFinalName = (type, name) => {
  if (type === "component") {
    return name;
  }

  return `${name}Page`;
};

const getPartTemplate = async (partType, type, name) => {
  const templatePath = path.join(__dirname, "templates", partType);
  const templateContent = await fs.readFile(templatePath, "utf8");
  const finalName = getPartFinalName(type, name);

  return templateContent.replace(/{{name}}/g, finalName);
};

const writeFile = (partType, type, name, template) => {
  const filePath = getPartPath(partType, type, name);

  return fs.outputFile(filePath, template, "utf8");
};

const getScriptImportStatement = (type, name) =>
  `import ${getPartFinalName(type, name)} from "./${type}s/${getFileName(
    name
  )}";`;

const getScriptInstantiationStatement = (type, name) => {
  const decapitalizedName = decapitalize(getPartFinalName(type, name));

  return `const ${decapitalizedName}Containers = [...document.querySelectorAll(".js-${getFileName(
    name
  )}${type === "page" ? "-page" : ""}[data-auto-instantiate]")];
const ${decapitalizedName}s = ${decapitalizedName}Containers.map(container => new ${getPartFinalName(
    type,
    name
  )}(container));`;
};

const addScriptImportStatement = async (type, name) => {
  const importStatement = getScriptImportStatement(type, name);
  const instantiationStatement = getScriptInstantiationStatement(type, name);

  const globalScriptPath = path.resolve(process.cwd(), "assets/js/global.js");

  const globalScript = await fs.readFile(globalScriptPath, "utf8");
  const importMarker = `/* /${type}s imports */`;
  const instantiationMarker = `/* /${type}s instantiation */`;

  const newGlobalScript = globalScript
    .replace(importMarker, importStatement + "\n" + importMarker)
    .replace(
      instantiationMarker,
      instantiationStatement + "\n" + instantiationMarker
    );

  return fs.outputFile(globalScriptPath, newGlobalScript, "utf8");
};

const addStyleImportStatement = (type, name) => {
  const indexPath = path.resolve(
    process.cwd(),
    "assets/scss",
    `${type}s`,
    "_index.scss"
  );

  return fs.appendFile(indexPath, `\n@import "${getFileName(name)}";`);
};

const addImportStatement = (partType, type, name) => {
  switch (partType) {
    case "script":
      return addScriptImportStatement(type, name);

    case "style":
      return addStyleImportStatement(type, name);

    default:
      throw new Error(`Unknown part : ${partType}`);
  }
};

const generatePart = async (partType, type, name, autoImport) => {
  if (await partExists(partType, type, name)) {
    throw new Error(
      `${partType} for ${name} ${type} already exists. Check ${getPartPath(
        partType,
        type,
        name
      )}`
    );
  }

  const template = await getPartTemplate(partType, type, name);
  await writeFile(partType, type, name, template);

  if (autoImport) {
    await addImportStatement(partType, type, name);
  }
};

module.exports = async (args, options, logger) => {
  const { type, name } = args;

  const generateScript = options.script || (!options.script && !options.style);
  const generateStyle = options.style || (!options.script && !options.style);

  if (generateScript) {
    try {
      generatePart("script", type, name, options.import);
      logger.info(
        chalk.green(`✓ created ${name} ${type} script in `) +
          getPartPath("script", type, name)
      );
    } catch (error) {
      logger.error(error);
    }
  }

  if (generateStyle) {
    try {
      generatePart("style", type, name, options.import);
      logger.info(
        chalk.green(`✓ created ${name} ${type} style in `) +
          getPartPath("style", type, name)
      );
    } catch (error) {
      logger.error(chalk.bold.red("Error : ") + chalk.red(error));
    }
  }
};
