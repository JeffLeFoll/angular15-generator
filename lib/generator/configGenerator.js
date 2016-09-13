'use strict';

let fse = require('fs-extra');
const configJSON = require('./templates/config/config');

class ConfigGenerator {

  static writeDefaultConfigFile() {
    fse.writeJsonSync('./angular-generator.config.json', configJSON);
  }

}

module.exports = ConfigGenerator;