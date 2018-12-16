'use strict';

(function () {

  var pins = document.querySelector('.map__pins');
  var mapPinMain = pins.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map').querySelector('.map__filters-container');
  var map = document.querySelector('.map');


  // Активация интерфейса по нажанию, на главную метку карты.
  var activateInterface = function () {
    map.classList.remove('map--faded');
    window.backend.load(function (array) { // вызываем колбек / берем данные от сервера
      pins.appendChild(window.pin.getPointerFragment(array));
    });
    window.form.removeDisabled();
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
    var card = document.querySelector('.map__card');
    if (card) {
      closeCardPopup();
    }
    window.backend.load(function (array) {
      var newCard = window.card(array[pinId]);
      map.insertBefore(newCard, filtersContainer);
    });
  };

  // Вешает обработчики событий на метки (для отрисовки карточки)
  var onPinClick = function (item) {
    item.addEventListener('click', function (evt) {
      var button = evt.currentTarget;
      var pinId = button.getAttribute('data-id');
      doCardPopup(pinId);
    });
  };

  var onCloseClick = function (closeButton) {
    closeButton.addEventListener('click', function () {
      closeCardPopup();
    });

    document.addEventListener('keydown', function (keydownEvt) {
      if (window.utils.isEscapeEvt(keydownEvt)) {
        closeCardPopup();
      }
    });
  };

  // Сбрасываем интерфейс при отправке submit на сервер
  var dectivateInterface = function () {
    map.classList.add('map--faded');
    window.form.addDisabled();
    window.pin.removePins();
    window.form.resetLocationMapPinMain();
  };

  window.map = {
    onCloseClick: onCloseClick,
    onPinClick: onPinClick,
    activateInterface: activateInterface,
    dectivateInterface: dectivateInterface
  };

})();
