'use strict';

let fse = require('fs-extra');
let path = require('path');
let moduleTplt = require('./templates/module').moduleTemplate;
let componentTplt = require('./templates/component').componentTemplate;
let controllerTplt = require('./templates/controller').controllerTemplate;

class ComponentGenerator {

  constructor(componentName) {
    this.componentName = componentName;

    this.filePath = path.join('src', 'ts', 'app', 'components', this.componentName);

    fse.mkdirsSync(this.filePath);
  }

  buildComponent() {
    this._createNewFiles();

    this._updateComponentsModule();
  }

  _createNewFiles() {

    fse.writeFileSync(path.join(this.filePath, `${this.componentName}.component.ts`), componentTplt(this.componentName));
    fse.writeFileSync(path.join(this.filePath, `${this.componentName}.controller.ts`), controllerTplt(this.componentName));
    fse.writeFileSync(path.join(this.filePath, `${this.componentName}.module.ts`), moduleTplt(this.componentName));
    fse.writeFileSync(path.join(this.filePath, `${this.componentName}.template.html`), '');
  }

  _updateComponentsModule() {

  }

}

module.exports = ComponentGenerator;