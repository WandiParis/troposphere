const generateScript = require("./script");
const generateStyle = require("./style");
const chalk = require("chalk");
const path = require("path");

module.exports = async (args, options, logger) => {
  const { type, name } = args;

  const generateBoth = !options.script && !options.style;

  if (options.script || generateBoth) {
    try {
      const filePath = await generateScript(name, type, options.import);
      logger.info(
        chalk.green(
          `✓ created ${name} ${type} script in ${path.relative(
            process.cwd(),
            filePath
          )}`
        )
      );
    } catch (error) {
      logger.error(error);
    }
  }

  if (options.style || generateBoth) {
    try {
      const filePath = await generateStyle(name, type, options.import);
      logger.info(
        chalk.green(
          `✓ created ${name} ${type} style in ${path.relative(
            process.cwd(),
            filePath
          )}`
        )
      );
    } catch (error) {
      logger.error(chalk.red(error));
    }
  }
};
