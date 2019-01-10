'use strict';

(function () {

  var main = document.querySelector('main');

  // Создает попап ошибки и вешает на него события

  var onEsapeError = function (evt) {
    if (window.utils.isEscapeEvt(evt)) {
      removeErrorPopup();
    }
  };

  var getErrorPopup = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content.querySelector('.error').cloneNode(true);
    var errorParagraph = errorTemplate.querySelector('.error__message');

    errorTemplate.style = 'z-index: 100';
    if (errorMessage) {
      errorParagraph.textContent = errorMessage;
    }

    main.appendChild(errorTemplate);
    onErrorButtonClick();

    document.addEventListener('keydown', onEsapeError);
  };

  var removeErrorPopup = function () {
    var popup = document.querySelector('.error');
    document.removeEventListener('keydown', onEsapeError);
    window.map.dectivateInterface();
    popup.remove();
  };

  var onErrorButtonClick = function () {
    var button = document.querySelector('.error').querySelector('.error__button');
    button.addEventListener('click', function (evtClick) {
      evtClick.preventDefault();
      removeErrorPopup();
    });

    button.addEventListener('keydown', function (evtKeydown) {
      evtKeydown.preventDefault();
      if (window.utils.isEnterEvent(evtKeydown)) {
        removeErrorPopup();
      }
    });
  };


  // Создает попап успеха, и вешает на него события

  var getSuccessPopup = function () {
    var fragment = document.createDocumentFragment();
    var successTemplate = document.querySelector('#success')
      .content.querySelector('.success').cloneNode(true);

    successTemplate.style = 'z-index: 100';

    fragment.appendChild(successTemplate);
    main.appendChild(fragment);

    document.addEventListener('keydown', removeSuccessPopup);
    document.addEventListener('mousedown', removeSuccessPopup);
  };

  var removeSuccessPopup = function () {
    var popup = document.querySelector('.success');
    document.removeEventListener('keydown', removeSuccessPopup);
    document.removeEventListener('mousedown', removeSuccessPopup);
    window.map.dectivateInterface();
    popup.remove();
  };

  window.popup = {
    onError: getErrorPopup,
    onSuccess: getSuccessPopup
  };

})();
