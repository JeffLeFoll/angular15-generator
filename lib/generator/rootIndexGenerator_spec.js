'use strict';

let expect = require('chai').expect;
let fse = require('fs-extra');
let path = require('path');

let RootIndexGenerator = require('./rootIndexGenerator');

const capitalizedName = 'UserList';

describe('RootIndexGenerator functionalities', function () {

  it('should add the new import after the angular import', function () {
    let fileData = "import { module } from 'angular';\nimport { TotoModule } from './toto/toto.module';";

    let rig = new RootIndexGenerator(capitalizedName);
    let result = rig._addModuleImportToFileData(fileData);

    expect(result).to.equal("import { module } from 'angular';\nimport { UserListModule } from './userlist/userlist.module';\nimport { TotoModule } from './toto/toto.module';");
  });

  it('should add the new import with upward module', function () {
    let fileData = "import { module } from 'angular';\nimport { TotoModule } from './toto/toto.module';";

    let rig = new RootIndexGenerator('../upward/' + capitalizedName);
    let result = rig._addModuleImportToFileData(fileData);

    expect(result).to.equal("import { module } from 'angular';\nimport { UserListModule } from '../upward/userlist/userlist.module';\nimport { TotoModule } from './toto/toto.module';");
  });

  it('should add the 1st module name ', function () {
    let fileData = `module('testModule', []);`;

    let rig = new RootIndexGenerator(capitalizedName);
    let result = rig._addNewModuleName(fileData);

    expect(result).to.equal("module('testModule', [UserListModule.name]);");
  });

  it('should add an other new module name ', function () {
    let fileData = `module('testModule', [TotoModule.name]);`;

    let rig = new RootIndexGenerator(capitalizedName);
    let result = rig._addNewModuleName(fileData);

    expect(result).to.equal("module('testModule', [TotoModule.name, UserListModule.name]);");
  });

  it('should add the 1st service ', function () {
    let fileData = `module('testModule', []);`;

    let rig = new RootIndexGenerator(capitalizedName);
    let result = rig._addNewService(fileData);

    expect(result).to.equal("module('testModule', [])\n.service('UserListService', UserListService);");
  });

  it('should add an other new service ', function () {
    let fileData = `module('testModule', [])\n.service('TotoService', TotoService);`;

    let rig = new RootIndexGenerator(capitalizedName);
    let result = rig._addNewService(fileData);

    expect(result).to.equal("module('testModule', [])\n.service('UserListService', UserListService)\n.service('TotoService', TotoService);");
  });

  it('should add the 1st filter ', function () {
    let fileData = `module('testModule', []);`;

    let rig = new RootIndexGenerator(capitalizedName);
    let result = rig._addNewFilter(fileData);

    expect(result).to.equal("module('testModule', [])\n.filter('userlist', userlist);");
  });

  it('should add an other new filter ', function () {
    let fileData = `module('testModule', [])\n.filter('toto', toto);`;

    let rig = new RootIndexGenerator(capitalizedName);
    let result = rig._addNewFilter(fileData);

    expect(result).to.equal("module('testModule', [])\n.filter('userlist', userlist)\n.filter('toto', toto);");
  });

  it('should use RootIndex template if no file exist', function () {
    let testData = `\nimport { module } from 'angular';\n\nexport let toto = module('toto', []);\n`;
    let rig = new RootIndexGenerator(capitalizedName);

    rig._getRootIndex('src/test/toto', 'root.ts');

    checkIfRootIndexIsCorrectlyCreated('toto', 'root', testData);
  });

  it('should get the existing file', function () {
    let testData = `\nimport { module } from 'angular';\n\nexport let titi = module('titi', []);\n`;
    fse.ensureDirSync('src/test/titi');
    fse.writeFileSync('src/test/titi/plop.ts', testData);
    let rig = new RootIndexGenerator(capitalizedName);

    rig._getRootIndex('src/test/titi', 'plop.ts');

    checkIfRootIndexIsCorrectlyCreated('titi', 'plop', testData);
  });

  afterEach(function () {
    fse.removeSync('./src');
  });
});

function checkIfRootIndexIsCorrectlyCreated(folderName, fileName, testData) {
  let indexFile = fse.readFileSync(path.join(`src/test/${folderName}`, `${fileName}.ts`), 'utf8');
  expect(indexFile).to.have.string(testData);
}
