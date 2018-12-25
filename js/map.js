'use strict';

(function () {

  var pins = document.querySelector('.map__pins');
  var mapPinMain = pins.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map').querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var cards = [];


  // Активация интерфейса по нажанию, на главную метку карты.
  var activateInterface = function () {
    map.classList.remove('map--faded');
    pins.appendChild(window.pin.getPointerFragment(cards));
    window.form.removeDisabled();
    window.formFilter.filtersActivate();
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
    var newCard = window.card(cards[pinId]);
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

  // колбек данных от сервера
  var onSuccessData = function (data) {
    cards = data;
  };

  window.backend.load(onSuccessData);

  window.map = {
    onCloseClick: onCloseClick,
    onPinClick: onPinClick,
    activateInterface: activateInterface,
    dectivateInterface: dectivateInterface
  };

})();
