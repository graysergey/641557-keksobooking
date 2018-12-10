'use strict';

(function () {

  var ESC__KEYCODE = 27;
  var ENTER__KEYCODE = 13;

  var utils = {
    // Перемешивает массив
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },

    getRandomNumber: function (from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    },

    getRandomLengthArray: function (array) {
      return array.slice(utils.getRandomNumber(1, array.length - 1));
    },

    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER__KEYCODE;
    },

    isEscapeEvt: function (evt) {
      return evt.keyCode === ESC__KEYCODE;
    }
  };

  Window.utils = utils;

})();
