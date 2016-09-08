'use strict';

let expect = require('chai').expect;
let StringUtil = require('./stringUtil');

describe('StringUtil functionalities', function () {

  it('should capitalize the first letter of a word', function () {

    let capitalizedWord = StringUtil.capitalizeFirstLetter('word');

    expect(capitalizedWord).to.equal('Word');
  });

  it('should capitalize only the first letter of a word', function () {

    let capitalizedWord = StringUtil.capitalizeFirstLetter('wordOfPop');

    expect(capitalizedWord).to.equal('WordOfPop');
  });

});
