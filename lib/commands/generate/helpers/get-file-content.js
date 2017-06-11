const path = require("path");
const fs = require("fs");

module.exports = (name) => {
    const templatePath = path.join(__dirname, "..", "templates", "class.js");
    const template = fs.readFileSync(templatePath,{
        encoding: "utf-8",
    });

    return template.replace(/{{name}}/g, name);
}
