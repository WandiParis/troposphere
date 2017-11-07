const kebabCase = require("voca/kebab_case");
const fs = require("fs-extra");
const path = require("path");

/**
 * Format file name
 *
 * @param  {String} name the name of the component/page
 * @return {String}      the file name of the component/page
 */
const getFileName = name => `_${kebabCase(name)}.scss`;

/**
 * Get file content
 *
 * @param  {String}  name    the name of the component/page
 * @param  {String}  type    component|page
 * @return {Promise<String>} a Promise that resolve with the content of the file for the component/page
 */
const getFileContent = async (name, type) => {
  const template = await fs.readFile(
    path.join(__dirname, "template.scss"),
    "utf8"
  );

  const finalName = type === "page" ? name + "Page" : name;
  const content = template.replace(/{{name}}/g, finalName);

  return content;
};

/**
 * Get the file path
 *
 * @param  {String} name the name of the component/page
 * @param  {String} type component|page
 * @return {String}      the path of the file
 */
const getFilePath = (name, type) =>
  path.join(process.cwd(), "assets/scss", type + "s", getFileName(name));

/**
 * Write the file
 *
 * @param  {String}  path    the path of the file to write
 * @param  {String}  content the content of the file to write
 * @return {Promise}
 */
const writeFile = async (path, content) =>
  await fs.outputFile(path, content, "utf8");

module.exports = async (name, type, addImport) => {
  const filePath = getFilePath(name, type);

  if (await fs.pathExists(filePath)) {
    throw new Error(`${name} ${type}'s style already exists`);
  }

  const fileContent = await getFileContent(name, type);

  await writeFile(filePath, fileContent);

  return filePath;
};
