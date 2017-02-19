'use strict';

let fse = require('fs-extra');
let path = require('path');
let serviceTplt = require('./templates/component/service').serviceTemplate;
let serviceInterfaceTplt = require('./templates/component/service_interface').serviceInterfaceTemplate;
let StringUtil = require('../utils/stringUtil');
let PathUtil = require('../utils/pathUtil');

class ServiceGenerator {

  constructor(serviceName, config, rootIndexGenerator) {
    let serviceNameWithoutPath = PathUtil.stripPathIfPResent(serviceName);
    this.capitalizedName = StringUtil.capitalizeFirstLetter(serviceNameWithoutPath);
    this.lowerCaseName = serviceNameWithoutPath.toLowerCase();
    this.config = config;
    this.rootIndexGenerator = rootIndexGenerator;

    this.filePath = path.join(path.normalize(this.config.getServicesRoot()), serviceName.toLowerCase());

    fse.mkdirsSync(this.filePath);
  }

  buildService() {
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.service.ts`), serviceTplt(this.capitalizedName, this.lowerCaseName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.service.interface.ts`), serviceInterfaceTplt(this.capitalizedName));
  }

  updateOrCreateRootModule(updateOrCreate) {
    if (updateOrCreate === true) {
      let rootModuleName = this.config.getServicesRootModuleName();

      let fileDataComplete = this.rootIndexGenerator.getRootModuleFileData(this.config.getServicesRoot(), rootModuleName);

      fse.writeFileSync(path.join(this.config.getServicesRoot(), rootModuleName), fileDataComplete);
    }
  }

}

module.exports = ServiceGenerator;
