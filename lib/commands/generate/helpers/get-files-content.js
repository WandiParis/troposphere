const path = require("path");
const fs = require("fs-extra");

module.exports = name => {
  const templatesPath = path.join(__dirname, "../templates");

  return Promise.all([
    fs.readFile(path.join(templatesPath, "script"), "utf8"),
    fs.readFile(path.join(templatesPath, "style"), "utf8")
  ]).then(contents =>
    contents.map(content => content.replace(/{{name}}/g, name))
  );
};
