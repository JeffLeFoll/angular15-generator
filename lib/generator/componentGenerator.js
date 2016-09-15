'use strict';

let fse = require('fs-extra');
let path = require('path');
let moduleTplt = require('./templates/component/component_module').componentModuleTemplate;
let componentTplt = require('./templates/component/component').componentTemplate;
let controllerTplt = require('./templates/component/controller').controllerTemplate;
let rootIndexTplt = require('./templates/component/root_index').rootIndex;

class ComponentGenerator {

  constructor(componentName, config) {
    this.componentName = componentName;
    this.config = config;

    this.filePath = path.join(path.normalize(this.config.getComponentsRoot()), this.componentName.toLowerCase());

    fse.mkdirsSync(this.filePath);
  }

  buildComponent() {
    fse.writeFileSync(path.join(this.filePath, `${this.componentName.toLowerCase()}.component.ts`), componentTplt(this.componentName));
    fse.writeFileSync(path.join(this.filePath, `${this.componentName.toLowerCase()}.controller.ts`), controllerTplt(this.componentName));
    fse.writeFileSync(path.join(this.filePath, `${this.componentName.toLowerCase()}.module.ts`), moduleTplt(this.componentName));
    fse.writeFileSync(path.join(this.filePath, `${this.componentName.toLowerCase()}.template.html`), '');
  }

  updateOrCreateRootModule(updateOrCreate) {
    let rootModuleName = updateOrCreate;

    if(updateOrCreate === true){
      rootModuleName = this.config.getComponentsRootModuleName();
    }

    let file = this._getFile(rootModuleName);

  }


  _getFile(rootModuleName) {

    let rootPath = this.config.getComponentsRoot();

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

module.exports = ComponentGenerator;