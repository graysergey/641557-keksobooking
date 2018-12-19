'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEnterEvent = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  var isEscapeEvt = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  window.utils = {
    isEnterEvent: isEnterEvent,
    isEscapeEvt: isEscapeEvt
  };

})();
