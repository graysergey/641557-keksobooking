'use strict';

(function () {

  var main = document.querySelector('main');

  // Создает попап ошибки и вешает на него события
  function doErrorPopup(errorMessage) {
    var fragment = document.createDocumentFragment();
    var errorTemplate = document.querySelector('#error')
      .content.querySelector('.error').cloneNode(true);
    var errorParagraph = errorTemplate.querySelector('.error__message');

    errorTemplate.style = 'z-index: 100';
    if (errorMessage) {
      errorParagraph.textContent = errorMessage;
    }

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
      window.map.dectivateInterface();
    });

    button.addEventListener('keydown', function () {
      removeErrorPopup();
      window.map.dectivateInterface();
    });
  }

  function onEsapeError(evt) {
    if (window.utils.isEscapeEvt(evt)) {
      removeErrorPopup();
      window.map.dectivateInterface();
    }
  }

  // Создает попап успеха, и вешает на него события

  function doSuccessPopup() {
    var fragment = document.createDocumentFragment();
    var successTemplate = document.querySelector('#success')
      .content.querySelector('.success').cloneNode(true);

    successTemplate.style = 'z-index: 100';

    fragment.appendChild(successTemplate);
    main.appendChild(fragment);

    document.addEventListener('keydown', onPopupButton);
    document.addEventListener('mousedown', onPopupMouse);
  }

  function removeSuccessPopup() {
    var popup = document.querySelector('.success');
    document.removeEventListener('keydown', onPopupButton);
    document.removeEventListener('mousedown', onPopupMouse);
    popup.remove();
  }

  function onPopupMouse() {
    removeSuccessPopup();
    window.map.dectivateInterface();
  }

  function onPopupButton() {
    removeSuccessPopup();
    window.map.dectivateInterface();
  }

  window.popup = {
    onError: doErrorPopup,
    onSuccess: doSuccessPopup
  };

})();
