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
    window.formAds.filtersActivate();
    window.backend.load(onSuccessData, window.popup.onError);
  };

  var updatePins = function (data) {
    pins.appendChild(window.pin.getPointerFragment(window.filter.getFiltredData(data)));
  };

  var onSuccessData = function (data) {
    dataCopy = data.slice();
    updatePins(dataCopy);
    window.filter.onChangeFilter(function () {
      window.debounce(function () {
        closeCardPopup();
        updatePins(dataCopy);
      });
    });
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();

    if (window.utils.isEnterEvent(evt)) {
      activateInterface();
    }
  });

  var closeCardPopup = function () {
    var card = document.querySelector('.map__card');
    return card && card.remove();
  };

  var renderCardPopup = function (pinId) {
    closeCardPopup();
    var newCard = window.card(window.filter.getFiltredData(dataCopy)[pinId]);
    map.insertBefore(newCard, filtersContainer);
  };

  var removeActivePin = function () {
    var pinActive = document.querySelector('.map__pin--active');
    return pinActive && pinActive.classList.remove('map__pin--active');
  };

  // Вешает обработчики событий на метки (для отрисовки карточки)
  var onPinClick = function (item) {
    item.addEventListener('click', function (evt) {
      removeActivePin();
      var button = evt.currentTarget;
      var pinId = button.getAttribute('data-id');
      renderCardPopup(pinId);
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

  // функция сброса интерфейса, используется при submit
  var dectivateInterface = function () {
    map.classList.add('map--faded');
    closeCardPopup();
    window.form.addDisabled();
    window.pin.removePins();
    window.form.resetLocationMapPinMain();
    window.formAds.filtersDeactivate();
    form.reset();
  };

  window.map = {
    onCloseClick: onCloseClick,
    onPinClick: onPinClick,
    activateInterface: activateInterface,
    dectivateInterface: dectivateInterface
  };

})();
