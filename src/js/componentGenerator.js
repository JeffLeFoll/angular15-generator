'use strict';

let mkdirp = require('mkdirp');
let fs = require('fs');
let path = require('path');
let moduleTplt = require("./templates/module").moduleTemplate;
let componentTplt = require("./templates/component").componentTemplate;
let controllerTplt = require("./templates/controller").controllerTemplate;

class ComponentGenerator {

    constructor(componentName) {
        this.componentName = componentName;

        this.filePath = path.join('src', 'ts', 'app', 'components', this.componentName);

        mkdirp.sync(this.filePath);
    }

    buildComponent() {
        this._createNewFiles();

        this._updateComponentsModule();
    }

    _createNewFiles() {

        fs.writeFileSync(path.join(this.filePath, `${this.componentName}.component.ts`), componentTplt(this.componentName));
        fs.writeFileSync(path.join(this.filePath, `${this.componentName}.controller.ts`), controllerTplt(this.componentName));
        fs.writeFileSync(path.join(this.filePath, `${this.componentName}.module.ts`), moduleTplt(this.componentName));
        fs.writeFileSync(path.join(this.filePath, `${this.componentName}.template.html`), '');
    }

    _updateComponentsModule() {

    }

}

module.exports = ComponentGenerator;