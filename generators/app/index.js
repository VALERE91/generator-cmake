let path = require("path");
let Generator = require("yeoman-generator");

let External = require("./cli/external");
let Project = require("./cli/project");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    let actionAvailable = ["generate"];

    this.argument("action", { type: String, required: true });
    this.argument("parameter", {
      type: String,
      required: false,
      default: () => {
        if (this.options["action"] == "generate")
          return path.basename(process.cwd());
      }
    });
  }

  initializing() {
    let defaultProjectName = this.options["parameter"];

    this.project = new Project(defaultProjectName);
    this.external = new External();
  }

  async prompting() {
    let promptSettings = [].concat(
      this.project.prompt(),
      this.external.prompt()
    );
    this.answers = await this.prompt(promptSettings);
  }

  configuring() {
    let answerEnabledName = this.answers.project_name;
    let answerEnabledDescription = this.answers.project_description;
    let answerEnabledExternals = this.answers.externals_enabled;

    this.project.configure(answerEnabledName, answerEnabledDescription);
    this.external.enable(answerEnabledExternals);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("CMakeLists.txt"),
      this.destinationPath("CMakeLists.txt"),
      {external: this.external, project: this.project}
    );
    this.fs.copy(
      this.templatePath("workspace"),
      this.destinationPath(`${this.project.name}.code-workspace`)
    );

    //Main folders
    this.fs.copy(
      this.templatePath("external"),
      this.destinationPath("external")
    );
    this.fs.copy(this.templatePath("main"), this.destinationPath("main"));
    this.fs.copy(
      this.templatePath("resources"),
      this.destinationPath("resources")
    );

    if (this.external.libs.CTest) {
      this.fs.copy(this.templatePath("test"), this.destinationPath("test"));
    }

    //Files
    this.fs.copy(
      this.templatePath(".clang-format"),
      this.destinationPath(".clang-format")
    );
    this.fs.copy(
      this.templatePath(".clang-tidy"),
      this.destinationPath(".clang-tidy")
    );
    this.fs.copy(
      this.templatePath("gitattributes"),
      this.destinationPath(".gitattributes")
    );
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(this.templatePath("LICENSE"), this.destinationPath("LICENSE"));
    this.fs.copy(
      this.templatePath("README.md"),
      this.destinationPath("README.md")
    );

    //CMake folder
    this.fs.copyTpl(
      this.templatePath("cmake/HunterLibs.cmake"),
      this.destinationPath("cmake/HunterLibs.cmake"),
      {external: this.external}
    );
    this.fs.copy(
      this.templatePath("cmake/BuildSystem.cmake"),
      this.destinationPath("cmake/BuildSystem.cmake")
    );
    this.fs.copy(
      this.templatePath("cmake/HunterGate.cmake"),
      this.destinationPath("cmake/HunterGate.cmake")
    );
    this.fs.copy(
      this.templatePath("cmake/Install.cmake"),
      this.destinationPath("cmake/Install.cmake")
    );
  }

  end() {
    this.log("Your project is ready to use!!");
  }
};
