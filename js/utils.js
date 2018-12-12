'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var ERROR_BLOCK_TIMEOUT = 3000;

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
    },
    getMaxElementFromArray: function (arr) {
      var maxElement = arr[0];

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }

      return maxElement;
    },
    showErrorBlock: function (message) {
      var errorBlock = document.createElement('div');
      errorBlock.id = 'error-block';
      errorBlock.style = 'z-index: 5; font-size: 15px; background-color: red; padding: 5px;';
      errorBlock.textContent = message;
      errorBlock.style.position = 'fixed';
      errorBlock.style.left = 0;
      errorBlock.style.top = 0;
      document.body.insertAdjacentElement('afterbegin', errorBlock);
      setTimeout(function () {
        document.body.removeChild(errorBlock);
      }, ERROR_BLOCK_TIMEOUT);
    }
  };
})();
