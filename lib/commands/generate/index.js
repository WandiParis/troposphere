const chalk = require("chalk");
const path = require("path");
const StyleGenerator = require("./generators/style");
const ScriptGenerator = require("./generators/script");
const getCwdRelativePath = require("../../utils/getCwdRelativePath");

module.exports = async (args, options, logger) => {
  const { type, name } = args;

  const generateBoth = !options.script && !options.style;

  if (options.script || generateBoth) {
    const generator = new ScriptGenerator(name, type);

    try {
      const filePath = await generator.generate();

      logger.info(
        chalk.green(
          `✓ created ${name} ${type} script in ${getCwdRelativePath(filePath)}`
        )
      );
    } catch (error) {
      logger.error(chalk.bold.red("Error : ") + chalk.red(error.message));
      logger.debug(error.stack);
    }
  }

  if (options.style || generateBoth) {
    const generator = new StyleGenerator(name, type);

    try {
      const filePath = await generator.generate();

      logger.info(
        chalk.green(
          `✓ created ${name} ${type} style in ${getCwdRelativePath(filePath)}`
        )
      );

      if (options.import) {
        const globalFilePath = await generator.addImportDeclaration();

        logger.info(
          chalk.green(
            `✓ imported ${name} ${type} style in ${getCwdRelativePath(
              globalFilePath
            )}`
          )
        );
      }
    } catch (error) {
      logger.error(chalk.bold.red("Error : ") + chalk.red(error.message));
      logger.debug(error.stack);
    }
  }
};
