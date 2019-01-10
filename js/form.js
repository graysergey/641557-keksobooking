'use strict';

(function () {

  var PIN_ARROW = 12;
  var pinHeight = document.querySelector('.map__pin--main').offsetHeight;
  var pinWidth = document.querySelector('.map__pin--main').offsetWidth;
  var pinHalfHeight = pinHeight / 2;
  var pinHalfWidth = pinWidth / 2;
  var selectRoomNumber = document.querySelector('#room_number');
  var capasitySelectGroop = document.querySelector('#capacity');
  var capacitySelectItem = capasitySelectGroop.querySelectorAll('option');
  var mapPinMain = document.querySelector('.map__pins').querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var minPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Удаляет disabled у всех fieldset в форме ad-form
  var removeDisabled = function () {
    var fieldset = form.querySelectorAll('fieldset');
    form.classList.remove('ad-form--disabled');

    fieldset.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  // Добавляет disabled всем fieldset формы
  var addDisabled = function () {
    var fieldset = form.querySelectorAll('fieldset');
    form.classList.add('ad-form--disabled');

    fieldset.forEach(function (item) {
      item.setAttribute('disabled', true);
    });
  };

  var onCapacityPlacesChange = function () {
    if (selectRoomNumber.value === '1') {
      capacitySelectItem[0].setAttribute('disabled', true);
      capacitySelectItem[1].setAttribute('disabled', true);
      capacitySelectItem[2].removeAttribute('disabled');
      capacitySelectItem[3].setAttribute('disabled', true);
      capasitySelectGroop.value = '1';
    } else if (selectRoomNumber.value === '2') {
      capacitySelectItem[0].setAttribute('disabled', true);
      capacitySelectItem[1].removeAttribute('disabled');
      capacitySelectItem[2].removeAttribute('disabled');
      capacitySelectItem[3].setAttribute('disabled', true);
      capasitySelectGroop.value = '2';
    } else if (selectRoomNumber.value === '3') {
      capacitySelectItem[0].removeAttribute('disabled');
      capacitySelectItem[1].removeAttribute('disabled');
      capacitySelectItem[2].removeAttribute('disabled');
      capacitySelectItem[3].setAttribute('disabled', true);
      capasitySelectGroop.value = '3';
    } else if (selectRoomNumber.value === '100') {
      capacitySelectItem[0].setAttribute('disabled', true);
      capacitySelectItem[1].setAttribute('disabled', true);
      capacitySelectItem[2].setAttribute('disabled', true);
      capacitySelectItem[3].removeAttribute('disabled');
      capasitySelectGroop.value = '0';
    }
  };

  selectRoomNumber.addEventListener('change', onCapacityPlacesChange);

  // Делает зависимость времени заезда и выезда
  var timesIn = document.querySelector('#timein');
  var timesOut = document.querySelector('#timeout');

  timesIn.addEventListener('change', function (evt) {
    timesOut.value = evt.target.value;
  });

  timesOut.addEventListener('change', function (evt) {
    timesIn.value = evt.target.value;
  });

  // Устанавливает минимальную цену учитывая тип жилья
  var priceInput = document.querySelector('#price');
  var typeHose = document.querySelector('#type');

  var setMinPrice = function (price) {
    priceInput.min = price;
    priceInput.placeholder = price;
  };

  typeHose.addEventListener('change', function (evt) {
    setMinPrice(minPrice[evt.target.value]);
  });

  // Записывает в поле Адреса - координаты главной метки
  var getLocationMapPinMain = function () {
    var inputAddress = form.querySelector('#address');
    var locationX = Math.round(parseInt(mapPinMain.style.left, 10) + pinHalfWidth);
    var locationY = Math.round(parseInt(mapPinMain.style.top, 10) + pinHalfHeight);

    inputAddress.setAttribute('value', locationX + ', ' + Math.round(((locationY - pinHalfHeight) + PIN_ARROW + pinHeight)));
  };
  getLocationMapPinMain();
  // Сбрасывает координаты пина
  var locationX = Math.round(parseInt(mapPinMain.style.left, 10));
  var locationY = Math.round(parseInt(mapPinMain.style.top, 10));

  var resetLocationMapPinMain = function () {
    mapPinMain.style.left = locationX + 'px';
    mapPinMain.style.top = locationY + 'px';
    getLocationMapPinMain();
  };

  // Обработчик submit
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), function () {
      window.popup.onSuccess();
      window.map.dectivateInterface();
    },
    window.popup.onError
    );
  });

  // обработчик reset
  var buttonResetForm = form.querySelector('.ad-form__reset');
  buttonResetForm.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.dectivateInterface();
  });

  buttonResetForm.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (window.utils.isEnterEvent(evt)) {
      window.map.dectivateInterface();
    }
  });

  var resetForm = function () {
    resetLocationMapPinMain();
    form.reset();
  };

  window.form = {
    removeDisabled: removeDisabled,
    getLocationMapPinMain: getLocationMapPinMain,
    addDisabled: addDisabled,
    resetToDefault: resetForm
  };

})();
