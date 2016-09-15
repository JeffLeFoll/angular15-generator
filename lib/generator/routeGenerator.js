'use strict';

let fse = require('fs-extra');
let path = require('path');
let moduleTplt = require('./templates/component/route_module').routeModuleTemplate;
let routeTplt = require('./templates/component/route').routeTemplate;
let componentTplt = require('./templates/component/component').componentTemplate;
let controllerTplt = require('./templates/component/controller').controllerTemplate;
let rootIndexTplt = require('./templates/component/root_index').rootIndex;
let StringUtil = require('../utils/stringUtil');
let RootIndexGenerator = require('./rootIndexGenerator');

class RouteGenerator {

  constructor(routeName, config) {
    this.capitalizedName = StringUtil.capitalizeFirstLetter(routeName);
    this.lowerCaseName = routeName.toLowerCase();
    this.config = config;

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

    let fileData = this._getFile(rootModuleName);

    let rootIndexGenerator = new RootIndexGenerator(this.capitalizedName);
    let fileDataWithImport = rootIndexGenerator.addImportToFileData(fileData);
    let fileDataComplete = rootIndexGenerator.addNewModuleName(fileDataWithImport);

    fse.writeFileSync(path.join(this.config.getRoutesRoot(), rootModuleName), fileDataComplete);
  }

  _getFile(rootModuleName) {
    let rootPath = this.config.getRoutesRoot();

    let data = '';
    try {
      data = fse.readFileSync(path.join(rootPath, rootModuleName), 'utf8');

    } catch (err) {
      let index = rootPath.lastIndexOf('/') + 1;
      data =  rootIndexTplt(rootPath.slice(index));
      fse.writeFileSync(path.join(rootPath, rootModuleName), data);
    }

    return data;
  }
}

module.exports = RouteGenerator;