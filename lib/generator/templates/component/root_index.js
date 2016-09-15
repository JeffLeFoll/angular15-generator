'use strict';

exports.rootIndex = function (folderName) {

  return `
import { module } from 'angular';

export let ${folderName} = module('${folderName}', []);
`
};