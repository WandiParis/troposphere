const fs = require("fs-extra");
const getFilesContent = require("./helpers/get-files-content");
const getFilesPath = require("./helpers/get-files-path");
const chalk = require("chalk");
const path = require("path");
const addImports = require("./helpers/add-imports");

module.exports = async (args, options, logger) => {
  const { type, name } = args;

  const [scriptPath, stylePath] = await getFilesPath(type, name);

  const [scriptExists, styleExists] = await Promise.all([
    fs.pathExists(scriptPath),
    fs.pathExists(stylePath)
  ]);

  if (scriptExists || styleExists) {
    logger.error(
      chalk.bold.red("Error : ") + chalk.red(`This ${type} already exists`)
    );

    process.exit(0);
  }

  const [scriptContent, styleContent] = await getFilesContent(
    type === "page" ? name + "Page" : name
  );

  await Promise.all([
    fs.outputFile(scriptPath, scriptContent, "utf8"),
    fs.outputFile(stylePath, styleContent, "utf8")
  ]);

  if (options.import) {
    addImports(type, name);
  }

  logger.info(
    chalk.green(`✓ created ${name} ${type}`) +
      "\n\n" +
      "You can find it in the following files :" +
      "\n" +
      path.relative(process.cwd(), scriptPath) +
      "\n" +
      path.relative(process.cwd(), stylePath)
  );
};
