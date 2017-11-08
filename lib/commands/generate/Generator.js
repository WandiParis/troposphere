const kebabCase = require("voca/kebab_case");
const fs = require("fs-extra");
const path = require("path");

/**
 * Base generator class
 *
 * It can't be used directly, you have to extend it and add the following getters :
 *
 * - basePath, which is the absolute path to the directory in which the component or page will be written ("component" or "page" is appended to this path)
 *
 * - templatePath, which is the absolute path to the template file of what you want to generate
 *
 * - fileName, which is the name of the file you want to write
 *
 * - templateNotFoundErrorMessage, which is the message of the error thrown when the template file can't be found
 *
 * And the following methods :
 *
 * - throwFileAlreadyExistsError(filePath) : which throws an Error when the file you want to generate already exists
 *
 * - addImport() : which add import statements in global files so you don't have to worry about it
 */
class Generator {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  /**
     * Get file content
     *
     * @param  {String}  name    the name of the component/page
     * @param  {String}  type    component|page
     * @return {Promise<String>} a Promise that resolve with the content of the file for the component/page
     */
  async getFileContent() {
    let template;

    try {
      template = await fs.readFile(this.templatePath, "utf8");
    } catch (error) {
      throw new Error(this.templateNotFoundErrorMessage);
    }

    const finalName = this.type === "page" ? this.name + "Page" : this.name;
    const content = template.replace(/{{name}}/g, finalName);

    return content;
  }

  /**
     * Get the file path
     *
     * @param  {String} name the name of the component/page
     * @param  {String} type component|page
     * @return {String}      the path of the file
     */
  getFilePath() {
    return path.join(this.basePath, this.type + "s", this.fileName);
  }

  /**
     * Write the file
     *
     * @param  {String}  path    the path of the file to write
     * @param  {String}  content the content of the file to write
     * @return {Promise}
     */
  writeFile(path, content) {
    return fs.outputFile(path, content, "utf8");
  }

  /**
     * Generate the file
     *
     * @return {Promise<String>} A promise that resolves with the absolute path of the generated file
     */
  async generate(addImport) {
    const filePath = this.getFilePath();

    if (await fs.pathExists(filePath)) {
      this.throwFileAlreadyExistsError(filePath);
    }

    const fileContent = await this.getFileContent();

    await this.writeFile(filePath, fileContent);

    if (addImport) {
      await this.addImport();
    }

    return filePath;
  }
}

module.exports = Generator;
