'use strict';

exports.filterSpecTemplate = function (lowerCaseName) {

  return `
import * as chai from 'chai';
import { ${lowerCaseName} } from './${lowerCaseName}';

const expect = chai.expect;
const filter = ${lowerCaseName}();

describe('${lowerCaseName} Filter Spec', () => {

  it('', () => {

  });

});
`
};
