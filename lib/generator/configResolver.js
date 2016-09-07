'use strict';

let fse = require('fs-extra');
let path = require('path');

class ConfigResolver {

  constructor() {
    this.customConfig = this._loadCustomConfig();
  }

  getRoutesRoot() {
    return this.customConfig.routesRoot;
  }

  getComponentsRoot() {
    return this.customConfig.componentsRoot;
  }

  _loadCustomConfig() {
    let config;
    try {
      let filePath = path.join('.', 'angular-generator.config.json');
      config = fse.readJsonSync(filePath, { throws: false } );
    } catch (e) {
      config = require('./templates/config/config');
    }

    return config;
  }
}

module.exports = ConfigResolver;