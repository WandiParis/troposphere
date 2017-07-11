const createPackage = require("./helpers/create-package");
const copyFiles = require("./helpers/copy-files");
const installDependencies = require("./helpers/install-dependencies");
const chalk = require("chalk");
const Spinner = require("cli-spinner").Spinner;

module.exports = async (args, options, logger) => {
  logger.info(
    "\n" +
      chalk.bgGreen.white(
        "Hello ! Jean-Patrice Kéka here, ready to kickstart your app !"
      )
  );

  logger.info("\n" + chalk.blue("🚀 First, let's create your package.json..."));
  createPackage();
  logger.info(chalk.green("✓ Done, my friend."));

  logger.info("\n" + chalk.blue("🚀 Now, let me copy some files for you..."));
  copyFiles();
  logger.info(chalk.green("✓ Here it is !"));

  logger.info(
    "\n" +
      chalk.blue(
        "🚀 Finally, i'm gonna install your dependencies. Cause nobody can launch a rocket without help !"
      )
  );

  const spinner = new Spinner("%s");
  spinner.setSpinnerString(18);
  spinner.start();

  try {
    const { stdout, stderr } = await installDependencies();

    spinner.stop(true);
  } catch (error) {
    spinner.stop(true);

    logger.error(
      "Sorry mate, there was an error during the installation of your dependencies. Check npm-debug.log."
    );
    logger.debug(error);
    return;
  }

  logger.info(
    chalk.green("✓ Pfew, it was not easy to gather all these forces !")
  );

  logger.info(
    "\n\n" +
      chalk.bold.underline("You can now use the following commands :") +
      "\n" +
      "    * npm run compile - compile all your assets" +
      "\n" +
      "    * npm start - watch changes on your source assets"
  );

  logger.info("\n\n" + "My work is done here.");

  logger.info(
    "\n" +
      chalk.italic(
        "\"C'est un petit pas pour l'homme, mais un grand pas pour la République Démocratique du Congo\""
      ) +
      "\n" +
      "    - Jean-Patrice Kéka"
  );
};
