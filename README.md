# CMake Yeoman generator

This simple [Yeoman](https://yeoman.io/) generator creates a C++ project with CMake and Hunter for librairies management. It  You can install yeoman with :

```
npm install -g yo
```

next, install this generator : 

```
npm install -g generator-cmake
```

now all you have to do is call the generator : 

```
mkdir my-project
cd my-project
yo cmake generate
```

## Project architecture

Here is an explanation of the whole project architecture generated : 

```
project
│   README.md
│   LICENSE    
│   project.code-workspace    # VS Code workspace file
│   CMakeLists.txt            # Main CMakeLists
│   .gitignore
│   .gitattributes
│   .clang-tidy               # clang-tidy config
│   .clang-format             # clang-format config
│   
└───cmake
│   │   BuildSystem.cmake  
│   │   HunterGate.cmake
│   │   HunterLibs.cmake      # main hunter librairies
│   │   Install.cmake
│   
└───external
│   │   lib1                  # legacy libraires
│   │   lib2
│   │   CMakeLists.txt        # external librairies CMake  
│
└───main
│   │   myexe                 # an executable
│   │   mylib                 # a librairy
│   │   CMakeLists.txt        # project CMake
│
└───resources
│   │   install
│   │   │   InstallIcon.png   # installer icon
│
└───test
│   │   myexe                 # executable tests
│   │   mylib                 # lib tests
│   │   CMakeLists.txt        # testing CMakeLists
```

## Usage with VSCode

I created this generator to fit perfectly in the VS Code environment. However, you need a setup executed first if you want your VS Code to understance the CMake and C++ syntax.

### VSCode setup for CMake + C++

I recommend the installation of three extensions for working in this kind of project : 
- CMake by twxs
- CMake Tools by vector-of-bool
- C/C++ by Microsoft

Once done you can open the project, VS Code should be able to recognize the CMake project and compile it.

### Working with the project

Open the `.code-workspace` file  with VS Code. Once asked, choose your compiler kit and VSCode will configure your project for it.

A press on `Shift + F7` will open the menu that will allow you to build a custom target.

A press on `F5` will launch the debug. Depending on your platform, select Windows or GDB and configure your `launch.json`.