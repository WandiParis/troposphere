const chalk = require("chalk");
const path = require("path");
const StyleGenerator = require("./style");
const ScriptGenerator = require("./script");

module.exports = async (args, options, logger) => {
  const { type, name } = args;

  const generateBoth = !options.script && !options.style;

  if (options.script || generateBoth) {
    const generator = new ScriptGenerator(name, type);
    try {
      const filePath = await generator.generate();

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
    const generator = new StyleGenerator(name, type);

    try {
      const filePath = await generator.generate();

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
