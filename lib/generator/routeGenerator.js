'use strict';

let fse = require('fs-extra');
let path = require('path');
let moduleTplt = require('./templates/component/route_module').routeModuleTemplate;
let routeTplt = require('./templates/component/route').routeTemplate;
let componentTplt = require('./templates/component/component').componentTemplate;
let controllerTplt = require('./templates/component/controller').controllerTemplate;

class RouteGenerator {

  constructor(routeName, config) {
    this.routeName = routeName;
    this.config = config;

    this.filePath = path.join(path.normalize(config.getRoutesRoot()), this.routeName.toLowerCase());

    fse.mkdirsSync(this.filePath);
  }

  buildRoute() {
    fse.writeFileSync(path.join(this.filePath, `${this.routeName.toLowerCase()}.component.ts`), componentTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName.toLowerCase()}.controller.ts`), controllerTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName.toLowerCase()}.module.ts`), moduleTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName.toLowerCase()}.route.ts`), routeTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName.toLowerCase()}.template.html`), '');
  }

  updateOrCreateRootModule(updateOrCreate) {
    let rootModuleName = updateOrCreate;

    if(updateOrCreate === true){
      rootModuleName = this.config.getRoutesRootModuleName();
    }

    console.log('updateOrCreate: ' + rootModuleName);
  }
}

module.exports = RouteGenerator;