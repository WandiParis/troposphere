const path = require("path");
const fs = require("fs");

module.exports = () => {
    const cwd = process.cwd();
    const name = path.basename(cwd);

    const json = getJSON(name, "1.0.0");

    fs.writeFileSync("package.json", json);
};

const getJSON = (name, version) => {
    return JSON.stringify({
        name,
        version,
        scripts: {
            compile: "cross-env NODE_ENV=production gulp compile",
            prestart: "gulp compile",
            start: "gulp watch"
        }
    }, null, 2);
};
