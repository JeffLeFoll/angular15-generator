'use strict';

let expect = require('chai').expect;

let PathUtil = require('./pathUtil');

describe('PathUtil functionalities', function () {

  it('should return the string if there is no path element', function () {

    let name = PathUtil.stripPathIfPResent('word');

    expect(name).to.equal('word');
  });

  it('should return the last element of the path (downward)', function () {

    let name = PathUtil.stripPathIfPResent('down/word');

    expect(name).to.equal('word');
  });

  it('should return the last element of the path (upward)', function () {

    let name = PathUtil.stripPathIfPResent('../upward/word');

    expect(name).to.equal('word');
  });

  it('should return the path dir (upvard)', function () {

    let name = PathUtil.getPathDir('../upward/word');

    expect(name).to.equal('../upward');
  });

  it('should return . if the path dir is empty', function () {

    let name = PathUtil.getPathDir('word');

    expect(name).to.equal('.');
  });

  it('should return the path dir (downward)', function () {

    let name = PathUtil.getPathDir('down/word');

    expect(name).to.equal('./down');
  });

});
