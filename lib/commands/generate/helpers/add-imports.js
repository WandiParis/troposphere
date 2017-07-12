const path = require("path");
const fs = require("fs-extra");
const kebabCase = require("voca/kebab_case");

const importStyle = (type, name) => {
  const indexPath = path.resolve(
    process.cwd(),
    "assets/scss",
    `${type}s`,
    "_index.scss"
  );

  return fs.appendFile(indexPath, `\n@import "${kebabCase(name)}";`);
};

module.exports = (type, name) => {
  importStyle(type, name);
};
