module.exports = class External {
  constructor() {
    this.libs = {
      GSL: false,
      CPack: false,
      CTest: false
    };
  }

  /**
   * Enable external libs
   * @param {array} externals
   */
  enable(externals) {
    for (var external of externals) {
      let libs = this.libs;
      if (Object.keys(libs).includes(external)) {
        libs[external] = true;
      }
    }
  }

  /**
   * Get prompt generator settings
   * @return {Object} prompt generator settings object
   */
  prompt() {
    return [
      {
        type: "checkbox",
        name: "externals_enabled",
        message: "What external libraries do you want ?",
        choices: () => Object.keys(this.libs)
      }
    ];
  }
}
