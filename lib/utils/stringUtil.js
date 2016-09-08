'use strict';

class StringUtil {

  static capitalizeFirstLetter(unCapitalizedWord) {
    let capitalizedWord = unCapitalizedWord.charAt(0).toUpperCase() + unCapitalizedWord.slice(1);

    return capitalizedWord;
  }

}

module.exports = StringUtil;