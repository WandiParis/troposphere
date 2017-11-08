const BaseGenerator = require("../Generator");
const path = require("path");

class ScriptGenerator extends BaseGenerator {
  constructor(name, type) {
    super(name, type);
  }

  get basePath() {
    return path.join(process.cwd(), "assets/js");
  }

  get templatePath() {
    return path.join(__dirname, "template.tpl");
  }

  get fileName() {
    return `${this.name}.js`;
  }
}

module.exports = ScriptGenerator;
