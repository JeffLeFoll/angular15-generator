'use strict';

let fse = require('fs-extra');
let path = require('path');
let moduleTplt = require('./templates/component/route_module').routeModuleTemplate;
let routeTplt = require('./templates/component/route').routeTemplate;
let componentTplt = require('./templates/component/component').componentTemplate;
let controllerTplt = require('./templates/component/controller').controllerTemplate;
let StringUtil = require('../utils/stringUtil');

class RouteGenerator {

  constructor(routeName, config, rootIndexGenerator) {
    this.capitalizedName = StringUtil.capitalizeFirstLetter(routeName);
    this.lowerCaseName = routeName.toLowerCase();
    this.config = config;
    this.rootIndexGenerator = rootIndexGenerator;

    this.filePath = path.join(path.normalize(config.getRoutesRoot()), this.lowerCaseName);

    fse.mkdirsSync(this.filePath);
  }

  buildRoute() {
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.component.ts`), componentTplt(this.capitalizedName, this.lowerCaseName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.controller.ts`), controllerTplt(this.capitalizedName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.module.ts`), moduleTplt(this.capitalizedName, this.lowerCaseName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.route.ts`), routeTplt(this.capitalizedName, this.lowerCaseName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.template.html`), '');
  }

  updateOrCreateRootModule(updateOrCreate) {
    let rootModuleName = updateOrCreate;

    if(updateOrCreate === true){
      rootModuleName = this.config.getRoutesRootModuleName();
    }

    let fileDataComplete = this.rootIndexGenerator.getRootModuleFileData(this.config.getRoutesRoot(), rootModuleName);

    fse.writeFileSync(path.join(this.config.getRoutesRoot(), rootModuleName), fileDataComplete);
  }

}

module.exports = RouteGenerator;