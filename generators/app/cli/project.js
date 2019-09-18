module.exports = class Project {
  constructor(name) {
    this.name = name;
    this.description = "";
  }

  configure(name, description) {
    this.name = name;
    this.description = description;
  }

  validateName(name) {
    let pass = name.match(/\s/);
    if (pass) {
      return "A project name cannot contains spaces";
    }
    return true;
  }

  prompt() {
    return [this._promptName(), this._promptDescription()];
  }

  _promptName() {
    return {
      type: "input",
      name: "project_name",
      message: `What is the name of your project?`,
      validate: input => this.validateName(input),
      default: this.name
    };
  }

  _promptDescription() {
    return {
      type: "input",
      name: "project_description",
      message: "What is the description of your project?"
    };
  }
};
