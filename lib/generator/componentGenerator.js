'use strict';

let fse = require('fs-extra');
let path = require('path');
let moduleTplt = require('./templates/component/component_module').componentModuleTemplate;
let componentTplt = require('./templates/component/component').componentTemplate;
let controllerTplt = require('./templates/component/controller').controllerTemplate;
let StringUtil = require('../utils/stringUtil');
let PathUtil = require('../utils/pathUtil');

class ComponentGenerator {

  constructor(componentName, config, rootIndexGenerator) {
    let componentNameWithoutPath = PathUtil.stripPathIfPResent(componentName);
    this.capitalizedName = StringUtil.capitalizeFirstLetter(componentNameWithoutPath);
    this.lowerCaseName = componentNameWithoutPath.toLowerCase();
    this.config = config;
    this.rootIndexGenerator = rootIndexGenerator;

    this.filePath = path.join(path.normalize(this.config.getComponentsRoot()), componentName.toLowerCase());

    fse.mkdirsSync(this.filePath);
  }

  buildComponent() {
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.component.ts`), componentTplt(this.capitalizedName, this.lowerCaseName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.controller.ts`), controllerTplt(this.capitalizedName, this.lowerCaseName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.module.ts`), moduleTplt(this.capitalizedName, this.lowerCaseName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.template.html`), '');
  }

  updateOrCreateRootModule(updateOrCreate) {
    let rootModuleName = updateOrCreate;

    if(updateOrCreate === true){
      rootModuleName = this.config.getComponentsRootModuleName();
    }

    let fileDataComplete = this.rootIndexGenerator.getRootModuleFileData(this.config.getComponentsRoot(), rootModuleName);

    fse.writeFileSync(path.join(this.config.getComponentsRoot(), rootModuleName), fileDataComplete);
  }

}

module.exports = ComponentGenerator;