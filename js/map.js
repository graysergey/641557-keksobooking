'use strict';

(function () {

  var PIN_ARROW = 12;

  var mapPinMain = document.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map').querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var pinWidth = mapPinMain.offsetWidth;
  var pinHeight = mapPinMain.offsetHeight;
  var pinHalfWidth = pinWidth / 2;
  var pinHalfHeight = pinHeight / 2;
  var dataCopy = [];

  // Записывает в поле Адреса - координаты главной метки
  var getCurentCoordsMainPin = function () {
    var locationX = Math.round(parseInt(mapPinMain.style.left, 10) + pinHalfWidth);
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
    window.formAds.removeDisabled();
    window.backend.load(onSuccessData, window.popup.onError);
    window.previewPhotos.onLoadAvatar();
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
    var newCard = window.createCard(window.filter.getFiltredData(dataCopy)[pinId]);
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
    resetLocationMapPinMain();
    window.form.addDisabled();
    window.pin.removePins();
    window.form.resetToDefault();
    window.formAds.filtersDeactivate();
    window.previewPhotos.clean();
    window.form.setAddress(Math.round(locationX + pinHalfWidth), Math.round((locationY + pinHalfHeight)));
  };

  window.form.setAddress(Math.round(locationX + pinHalfWidth), Math.round((locationY + pinHalfHeight)));
  window.setDraggablePin(map);

  window.map = {
    onCloseClick: onCloseClick,
    onPinClick: onPinClick,
    activateInterface: activateInterface,
    dectivateInterface: dectivateInterface,
    getCurentCoordsMainPin: getCurentCoordsMainPin
  };

})();
