const fs = require("fs");
const getFileContent = require("./helpers/get-file-content");
const getFilePath = require("./helpers/get-file-path");
const chalk = require("chalk");

const action = (args, options, logger) => {
  const { type, name } = args;

  const fileContent = getFileContent(name);
  const filePath = getFilePath(type, name);

  fs.writeFileSync(filePath, fileContent);

  logger.info(chalk.green(`✓ created ${name} ${type} in ${filePath}`));
};

module.exports = action;
