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
    .action(init)

    .command("generate", "Generate something")
    .alias("g")
    .argument("<type>", "component or page", ["component", "page"])
    .argument("<name>", "the CamelCased name of the thing")
    .action(generate);

program.parse(process.argv);
