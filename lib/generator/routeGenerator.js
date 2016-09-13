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

    this.filePath = path.join(path.normalize(config.getRoutesRoot()), this.routeName);

    fse.mkdirsSync(this.filePath);
  }

  buildRoute() {
    fse.writeFileSync(path.join(this.filePath, `${this.routeName}.component.ts`), componentTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName}.controller.ts`), controllerTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName}.module.ts`), moduleTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName}.route.ts`), routeTplt(this.routeName));
    fse.writeFileSync(path.join(this.filePath, `${this.routeName}.template.html`), '');
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