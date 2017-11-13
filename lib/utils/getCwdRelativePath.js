const path = require("path");

module.exports = to => path.relative(process.cwd(), to);
