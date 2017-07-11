const kebabCase = require("voca/kebab_case");
const path = require("path");

module.exports = (type, name) => {
  const kebabCasedName = kebabCase(name);

  return [
    path.join(process.cwd(), `assets/js/${type}s/${kebabCasedName}.js`),
    path.join(process.cwd(), `assets/scss/${type}s/_${kebabCasedName}.scss`)
  ];
};
