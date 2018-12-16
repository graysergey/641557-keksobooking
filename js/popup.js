'use strict';

(function () {

  var main = document.querySelector('main');

  function doErrorPopup() {
    var fragment = document.createDocumentFragment();
    var errorTemplate = document.querySelector('#error')
      .content.querySelector('.error').cloneNode(true);

    errorTemplate.style = 'z-index: 100';
    fragment.appendChild(errorTemplate);
    main.appendChild(fragment);
    onErrorButton();

    document.addEventListener('keydown', onEsapeError);
  }

  function removeErrorPopup() {
    var popup = document.querySelector('.error');
    popup.remove();
    document.removeEventListener('keydown', onEsapeError);
  }

  function onErrorButton() {
    var button = document.querySelector('.error').querySelector('.error__button');
    button.addEventListener('click', function () {
      removeErrorPopup();
    });

    button.addEventListener('key', function () {
      removeErrorPopup();
    });
  }

  function onEsapeError(evt) {
    if (window.utils.isEscapeEvt(evt)) {
      removeErrorPopup();
    }
  }

  window.popup = {
    error: doErrorPopup
    // success: doSucsessPopup
  };

})();
