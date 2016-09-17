'use strict';

let path = require('path');

class PathUtil {

  static stripPathIfPResent(nameWithPossiblePath) {
    let pathObject = path.parse(nameWithPossiblePath);

    return pathObject.base;
  }

  static getPathDir(nameWithPossiblePath) {
    let pathObject = path.parse(nameWithPossiblePath);

    if(pathObject.dir !== '') {
      if(pathObject.dir.startsWith('../')) {
        return pathObject.dir;
      } else {
        return './' + pathObject.dir;
      }
    }

    return '.';
  }

}

module.exports = PathUtil;