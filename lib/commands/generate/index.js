const fs = require("fs-extra");
const getFilesContent = require("./helpers/get-files-content");
const getFilesPath = require("./helpers/get-files-path");
const chalk = require("chalk");
const path = require("path");

module.exports = async (args, options, logger) => {
  const { type, name } = args;

  const [scriptContent, styleContent] = await getFilesContent(
    type === "page" ? name + "Page" : name
  );
  const [scriptPath, stylePath] = await getFilesPath(type, name);

  await Promise.all([
    fs.outputFile(scriptPath, scriptContent, "utf8"),
    fs.outputFile(stylePath, styleContent, "utf8")
  ]);

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
