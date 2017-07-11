const kebabCase = require("voca/kebab_case");
const path = require("path");

module.exports = (type, name) =>
  path.join(process.cwd(), "assets", "js", `${type}s`, `${kebabCase(name)}.js`);
