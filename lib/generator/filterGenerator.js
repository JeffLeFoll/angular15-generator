'use strict';

let fse = require('fs-extra');
let path = require('path');
let filterTplt = require('./templates/component/filter').filterTemplate;
let filterSpecTplt = require('./templates/component/filterSpec').filterSpecTemplate;
let StringUtil = require('../utils/stringUtil');
let PathUtil = require('../utils/pathUtil');

class FilterGenerator {

  constructor(filterName, config, rootIndexGenerator) {
    let filterNameWithoutPath = PathUtil.stripPathIfPResent(filterName);
    this.capitalizedName = StringUtil.capitalizeFirstLetter(filterNameWithoutPath);
    this.lowerCaseName = filterNameWithoutPath.toLowerCase();
    this.config = config;
    this.rootIndexGenerator = rootIndexGenerator;

    this.filePath = path.join(path.normalize(this.config.getFiltersRoot()), filterName.toLowerCase());

    fse.mkdirsSync(this.filePath);
  }

  buildFilter() {
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.filter.ts`), filterTplt(this.lowerCaseName));
    fse.writeFileSync(path.join(this.filePath, `${this.lowerCaseName}.filter_spec.ts`), filterSpecTplt(this.lowerCaseName));
  }

  updateOrCreateRootModule(updateOrCreate) {
    if (updateOrCreate === true) {
      let rootModuleName = this.config.getFiltersRootModuleName();

      let fileDataComplete = this.rootIndexGenerator.getRootFileDataWithNewFilter(this.config.getFiltersRoot(), rootModuleName);

      fse.writeFileSync(path.join(this.config.getFiltersRoot(), rootModuleName), fileDataComplete);
    }
  }

}

module.exports = FilterGenerator;
