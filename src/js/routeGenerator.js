'use strict';

let fse = require('fs-extra');
let path = require('path');
let moduleTplt = require('./templates/component/module').moduleTemplate;
let routeTplt = require('./templates/component/route').routeTemplate;
let componentTplt = require('./templates/component/component').componentTemplate;
let controllerTplt = require('./templates/component/controller').controllerTemplate;

class RouteGenerator {

  constructor(routeName) {
    this.routeName = routeName;

    this.filePath = path.join('src', 'ts', 'app', 'routes', this.routeName);

    fse.mkdirsSync(this.filePath);
  }

  buildRoute() {
    this._createNewFiles();

    this._updateOrCreateRouteConfig();
  }

  _createNewFiles() {

    fse.writeFileSync(path.join(this.filePath, `${this.routeName}.component.ts`), componentTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName}.controller.ts`), controllerTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName}.module.ts`), moduleTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName}.route.ts`), routeTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName}.template.html`), '');
  }

  _updateOrCreateRouteConfig() {

  }
}

module.exports = RouteGenerator;