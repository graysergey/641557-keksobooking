'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map').querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var pins = document.querySelector('.map__pins');
  var dataCopy = [];

  // Активация интерфейса по нажанию, на главную метку карты.
  var activateInterface = function () {
    map.classList.remove('map--faded');
    window.form.removeDisabled();
    window.formFilter.filtersActivate();
    pins.appendChild(window.pin.getPointerFragment(dataCopy));
  };

  var onSuccessData = function (data) {
    dataCopy = data;
    window.dataCopy = data;
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();

    if (window.utils.isEnterEvent(evt)) {
      activateInterface();
    }
  });

  var closeCardPopup = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  var doCardPopup = function (pinId) {
    closeCardPopup();
    var newCard = window.card(dataCopy[pinId]);
    map.insertBefore(newCard, filtersContainer);
  };

  var removeActivePin = function () {
    var pinActive = document.querySelector('.map__pin--active');
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  // Вешает обработчики событий на метки (для отрисовки карточки)
  var onPinClick = function (item) {
    item.addEventListener('click', function (evt) {
      removeActivePin();
      var button = evt.currentTarget;
      var pinId = button.getAttribute('data-id');
      doCardPopup(pinId);
      item.classList.add('map__pin--active');
    });
  };

  var onCloseClick = function (closeButton) {
    closeButton.addEventListener('click', function () {
      closeCardPopup();
      removeActivePin();
    });

    document.addEventListener('keydown', function (keydownEvt) {
      if (window.utils.isEscapeEvt(keydownEvt)) {
        closeCardPopup();
        removeActivePin();
      }
    });
  };

  // Сбрасываем интерфейс при отправке submit на сервер
  var dectivateInterface = function () {
    map.classList.add('map--faded');
    closeCardPopup();
    window.form.addDisabled();
    window.pin.removePins();
    window.form.resetLocationMapPinMain();
    window.formFilter.filtersDeactivate();
    form.reset();
  };

  window.backend.load(onSuccessData, window.popup.onError);

  window.map = {
    onCloseClick: onCloseClick,
    onPinClick: onPinClick,
    activateInterface: activateInterface,
    dectivateInterface: dectivateInterface
  };

})();
