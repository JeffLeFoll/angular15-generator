'use strict';

let fse = require('fs-extra');
let path = require('path');
let moduleTplt = require('./templates/component/route_module').routeModuleTemplate;
let routeTplt = require('./templates/component/route').routeTemplate;
let componentTplt = require('./templates/component/component').componentTemplate;
let controllerTplt = require('./templates/component/controller').controllerTemplate;
let htmlTplt = require('./templates/component/html').htmlTemplate;
let StringUtil = require('../utils/stringUtil');
let PathUtil = require('../utils/pathUtil');

class RouteGenerator {

  constructor(routeName, config, rootIndexGenerator) {
    let routeNameWithoutPath = PathUtil.stripPathIfPResent(routeName);
    this.capitalizedName = StringUtil.capitalizeFirstLetter(routeNameWithoutPath);
    this.lowerCaseName = routeNameWithoutPath.toLowerCase();
    this.config = config;
    this.rootIndexGenerator = rootIndexGenerator;

    this.filePath = path.join(path.normalize(config.getRoutesRoot()), routeName.toLowerCase());

    fse.mkdirsSync(this.filePath);
  }

  buildRoute() {
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.component.ts`), componentTplt(this.capitalizedName, this.lowerCaseName, this.config.getUseWebpackRequire()));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.controller.ts`), controllerTplt(this.capitalizedName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.module.ts`), moduleTplt(this.capitalizedName, this.lowerCaseName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.route.ts`), routeTplt(this.capitalizedName, this.lowerCaseName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.template.html`), htmlTplt(this.capitalizedName));
  }

  updateOrCreateRootModule(updateOrCreate) {
    if (updateOrCreate === true) {
      let rootModuleName = this.config.getRoutesRootModuleName();

      let fileDataComplete = this.rootIndexGenerator.getRootFileDataWithNewModule(this.config.getRoutesRoot(), rootModuleName);

      fse.writeFileSync(path.join(this.config.getRoutesRoot(), rootModuleName), fileDataComplete);
    }
  }

}

module.exports = RouteGenerator;
