'use strict';

let mkdirp = require('mkdirp');
let fs = require('fs');
let path = require('path');
let moduleTplt = require("./templates/module").moduleTemplate;
let routeTplt = require("./templates/route").routeTemplate;
let componentTplt = require("./templates/component").componentTemplate;
let controllerTplt = require("./templates/controller").controllerTemplate;

class RouteGenerator {

    constructor(routeName) {
        this.componentName = routeName;

        this.filePath = path.join('src', 'ts', 'app', 'routes', this.componentName);

        mkdirp.sync(this.filePath);
    }

    buildRoute() {
        this._createNewFiles();

        this._updateOrCreateRouteConfig();
    }

    _createNewFiles() {

        fs.writeFileSync(path.join(this.filePath, `${this.componentName}.component.ts`), componentTplt(this.componentName));
        fs.writeFileSync(path.join(this.filePath, `${this.componentName}.controller.ts`), controllerTplt(this.componentName));
        fs.writeFileSync(path.join(this.filePath, `${this.componentName}.module.ts`), moduleTplt(this.componentName));
        fs.writeFileSync(path.join(this.filePath, `${this.componentName}.route.ts`), routeTplt(this.componentName));
        fs.writeFileSync(path.join(this.filePath, `${this.componentName}.template.html`), '');
    }

    _updateOrCreateRouteConfig() {

    }
}

module.exports = RouteGenerator;