const BaseGenerator = require("../Generator");
const kebabCase = require("voca/kebab_case");
const path = require("path");

class StyleGenerator extends BaseGenerator {
  constructor(name, type) {
    super(name, type);
  }

  get basePath() {
    return path.join(process.cwd(), "assets/scss");
  }

  get templatePath() {
    return path.join(__dirname, "template.tpl");
  }

  get fileName() {
    return `_${kebabCase(this.name)}.scss`;
  }
}

module.exports = StyleGenerator;
