'use strict';

let fse = require('fs-extra');
let path = require('path');
let moduleTplt = require('./templates/component/component_module').componentModuleTemplate;
let componentTplt = require('./templates/component/component').componentTemplate;
let controllerTplt = require('./templates/component/controller').controllerTemplate;

class ComponentGenerator {

  constructor(componentName, config) {
    this.componentName = componentName;
    this.config = config;

    this.filePath = path.join(path.normalize(this.config.getComponentsRoot()), this.componentName);

    fse.mkdirsSync(this.filePath);
  }

  buildComponent() {
    fse.writeFileSync(path.join(this.filePath, `${this.componentName}.component.ts`), componentTplt(this.componentName));
    fse.writeFileSync(path.join(this.filePath, `${this.componentName}.controller.ts`), controllerTplt(this.componentName));
    fse.writeFileSync(path.join(this.filePath, `${this.componentName}.module.ts`), moduleTplt(this.componentName));
    fse.writeFileSync(path.join(this.filePath, `${this.componentName}.template.html`), '');
  }

  updateOrCreateRootModule(updateOrCreate) {
    let rootModuleName = updateOrCreate;

    if(updateOrCreate === true){
      rootModuleName = this.config.getComponentsRootModule();
    }

    console.log('updateOrCreate: ' + rootModuleName);
  }


}

module.exports = ComponentGenerator;