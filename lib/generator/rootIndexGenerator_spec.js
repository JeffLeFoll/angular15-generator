'use strict';

let expect = require('chai').expect;
let RootIndexGenerator = require('./rootIndexGenerator');

const capitalizedName = 'UserList';

describe('RootIndexGenerator functionalities', function () {

  it('should add the new import after the angular import', function () {
    let fileData = "import { module } from 'angular';\nimport { TotoModule } from './toto/toto.module.ts';";

    var rig = new RootIndexGenerator(capitalizedName);
    let result = rig.addImportToFileData(fileData);

    expect(result).to.equal("import { module } from 'angular';\nimport { UserListModule } from './userlist/userlist.module.ts';\nimport { TotoModule } from './toto/toto.module.ts';");
  });

  it('should add the 1st module name ', function () {
    let fileData = `module('', []);`;

    var rig = new RootIndexGenerator(capitalizedName);
    let result = rig.addNewModuleName(fileData);

    expect(result).to.equal("module('', [UserListModule.name]);");
  });

  it('should add a nex module name ', function () {
    let fileData = `module('', [TotoModule.name]);`;

    var rig = new RootIndexGenerator(capitalizedName);
    let result = rig.addNewModuleName(fileData);

    expect(result).to.equal("module('', [TotoModule.name, UserListModule.name]);");
  });


});