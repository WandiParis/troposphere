#!/usr/bin/env node

const program = require("caporal");
const package = require("../package.json");
const init = require("./commands/init");
const generate = require("./commands/generate");

program
  .version(package.version)
  .description("Init and manage your front-end, the izi way morray.")
  .command("init", "Install common dependencies and create folder structure")
  .alias("i")
  .option(
    "-s, --skip-deps",
    "Skip the dependencies installation process",
    program.BOOL
  )
  .action(init)
  .command("generate", "Generate something")
  .alias("g")
  .argument("<type>", "component or page", ["component", "page"])
  .argument("<name>", "the UpperCamelCased name of the thing")
  .option("--import", "automatically add import satement", program.BOOL)
  .option("--script", "generate JS only", program.BOOL)
  .option("--style", "generate CSS only", program.BOOL)
  .action(generate);

program.parse(process.argv);
