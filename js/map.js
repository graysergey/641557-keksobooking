'use strict';

(function () {

  var PIN_ARROW = 12;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var filtersContainer = map.querySelector('.map__filters-container');
  var pins = map.querySelector('.map__pins');
  var pinWidth = mapPinMain.offsetWidth;
  var pinHeight = mapPinMain.offsetHeight;
  var dataCopy = [];

  // Записывает в поле Адреса - координаты главной метки
  var getCurentCoordsMainPin = function () {
    var locationX = Math.round(parseInt(mapPinMain.style.left, 10) + pinWidth / 2);
    var locationY = Math.round(parseInt(mapPinMain.style.top, 10));
    window.form.setAddress(locationX, Math.round((locationY + PIN_ARROW + pinHeight)));
  };

  // Записывает стартовые координаты пина
  var locationX = Math.round(parseInt(mapPinMain.style.left, 10));
  var locationY = Math.round(parseInt(mapPinMain.style.top, 10));

  // Сбрасывает расположение пина на дефолтное
  var resetLocationMapPinMain = function () {
    mapPinMain.style.left = locationX + 'px';
    mapPinMain.style.top = locationY + 'px';
  };

  // Активация интерфейса по нажанию, на главную метку карты.
  var activateInterface = function () {
    map.classList.remove('map--faded');
    window.form.removeDisabled();
    window.formMap.removeDisabled();
    window.backend.load(onSuccessData, window.popup.onError);
    window.previewPhotos.setListenerToLoadButton();
  };

  var updatePins = function (data) {
    pins.appendChild(window.pin.getPointerFragment(window.filter.getData(data)));
  };

  var onSuccessData = function (data) {
    dataCopy = data.slice();
    updatePins(dataCopy);
    window.filter.onChange(function () {
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
    return opendCard && opendCard.remove();
  };

  var opendCard;

  var renderCardPopup = function (pinId) {
    closeCardPopup();
    var newCard = window.createCard(window.filter.getData(dataCopy)[pinId]);
    opendCard = newCard;
    map.insertBefore(newCard, filtersContainer);
  };

  var removeActivePin = function () {
    return pinActive && pinActive.classList.remove('map__pin--active');
  };

  var pinActive;

  // Вешает обработчики событий на метки (для отрисовки карточки)
  var setListenerToPin = function (item) {
    item.addEventListener('click', function (evt) {
      removeActivePin();
      var button = evt.currentTarget;
      var pinId = button.getAttribute('data-id');
      renderCardPopup(pinId);
      item.classList.add('map__pin--active');
      pinActive = item;
    });
  };

  var setListenerToCard = function (closeButton) {
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
    resetLocationMapPinMain();
    window.form.addDisabled();
    window.pin.removePins();
    window.form.resetToDefault();
    window.formMap.filtersDeactivate();
    window.previewPhotos.clean();
    window.form.setAddress(Math.round(locationX + pinWidth / 2), Math.round((locationY + pinHeight / 2)));
  };

  window.form.setAddress(Math.round(locationX + pinWidth / 2), Math.round((locationY + pinHeight / 2)));
  window.setDraggablePin(map, mapPinMain, pinWidth, pinHeight);

  window.map = {
    setListenerToCard: setListenerToCard,
    setListenerToPin: setListenerToPin,
    activateInterface: activateInterface,
    dectivateInterface: dectivateInterface,
    getCurentCoordsMainPin: getCurentCoordsMainPin
  };

})();
