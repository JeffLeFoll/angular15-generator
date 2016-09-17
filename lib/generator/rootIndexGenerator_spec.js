'use strict';

let expect = require('chai').expect;
let fse = require('fs-extra');
let path = require('path');

let RootIndexGenerator = require('./rootIndexGenerator');

const capitalizedName = 'UserList';

describe('RootIndexGenerator functionalities', function () {

  it('should add the new import after the angular import', function () {
    let fileData = "import { module } from 'angular';\nimport { TotoModule } from './toto/toto.module.ts';";

    let rig = new RootIndexGenerator(capitalizedName);
    let result = rig._addImportToFileData(fileData);

    expect(result).to.equal("import { module } from 'angular';\nimport { UserListModule } from './userlist/userlist.module.ts';\nimport { TotoModule } from './toto/toto.module.ts';");
  });

  it('should add the 1st module name ', function () {
    let fileData = `module('', []);`;

    let rig = new RootIndexGenerator(capitalizedName);
    let result = rig._addNewModuleName(fileData);

    expect(result).to.equal("module('', [UserListModule.name]);");
  });

  it('should add a new module name ', function () {
    let fileData = `module('', [TotoModule.name]);`;

    let rig = new RootIndexGenerator(capitalizedName);
    let result = rig._addNewModuleName(fileData);

    expect(result).to.equal("module('', [TotoModule.name, UserListModule.name]);");
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
  var indexFile = fse.readFileSync(path.join(`src/test/${folderName}`, `${fileName}.ts`), 'utf8');
  expect(indexFile).to.have.string(testData);
}
