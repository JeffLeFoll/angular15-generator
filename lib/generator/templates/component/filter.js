'use strict';

exports.filterTemplate = function (lowerCaseName) {

  return `
${lowerCaseName}.$inject = [];
export function ${lowerCaseName}() : Function {
  return function (input) {
  
  };
}
`
};
