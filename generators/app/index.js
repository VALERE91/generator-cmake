var Generator = require('yeoman-generator');

module.exports = class extends Generator 
{
    initializing()
    {

    }

    async prompting()
    {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "project_name",
                message: "What is the name of your project?",
                validate: function(value) {
                    var pass = value.match(/\s/);
                    if (pass) {
                      return 'A project name cannot contains spaces';
                    }
              
                    return true;
                }
            },
            {
                type: "input",
                name: "project_description",
                message: "What is the description of your project?"
            },
            {
                type: "confirm",
                name: "gsl_enabled",
                message: "Enable GSL in your project? (You should say yes)"
            }
        ]);
    }

    configuring()
    {
        
    }

    writing()
    {
        this.fs.copyTpl(this.templatePath('CMakeLists.txt'),this.destinationPath('CMakeLists.txt'),this.answers);
        this.fs.copy(this.templatePath('workspace'),this.destinationPath(`${this.answers.project_name}.code-workspace`));

        //Main folders
        this.fs.copy(this.templatePath('external'),this.destinationPath('external'));
        this.fs.copy(this.templatePath('main'),this.destinationPath('main'));
        this.fs.copy(this.templatePath('resources'),this.destinationPath('resources'));
        this.fs.copy(this.templatePath('test'),this.destinationPath('test'));

        //Files
        this.fs.copy(this.templatePath('.clang-format'),this.destinationPath('.clang-format'));
        this.fs.copy(this.templatePath('.clang-tidy'),this.destinationPath('.clang-tidy'));
        this.fs.copy(this.templatePath('.gitattributes'),this.destinationPath('.gitattributes'));
        this.fs.copy(this.templatePath('.gitignore'),this.destinationPath('.gitignore'));
        this.fs.copy(this.templatePath('LICENSE'),this.destinationPath('LICENSE'));
        this.fs.copy(this.templatePath('README.md'),this.destinationPath('README.md'));

        //CMake folder
        this.fs.copyTpl(this.templatePath('cmake/HunterLibs.cmake'),this.destinationPath('cmake/HunterLibs.cmake'),this.answers);
        this.fs.copy(this.templatePath('cmake/BuildSystem.cmake'),this.destinationPath('cmake/BuildSystem.cmake'));
        this.fs.copy(this.templatePath('cmake/HunterGate.cmake'),this.destinationPath('cmake/HunterGate.cmake'));
        this.fs.copy(this.templatePath('cmake/Install.cmake'),this.destinationPath('cmake/Install.cmake'));
    }

    end()
    {
        this.log("Your project is ready to use!!");
    }
};