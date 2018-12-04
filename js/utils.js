'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY_CODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        action();
      }
    },
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomValueFromArray: function (array) {
      return array[window.utils.getRandomNumber(0, array.length - 1)];
    }
  };
})();
