'use strict';

(function () {

  var selectRoomNumber = document.querySelector('#room_number');
  var capasitySelectGroop = document.querySelector('#capacity');
  var capacitySelectItem = capasitySelectGroop.querySelectorAll('option');
  var pinHeight = document.querySelector('.map__pin--main').offsetHeight;
  var pinWidth = document.querySelector('.map__pin--main').offsetWidth;
  var mapPinMain = document.querySelector('.map__pins').querySelector('.map__pin--main');
  var PIN_ARROW = 12;
  var PIN_HALF_HEIGHT = pinHeight / 2;
  var PIN_HALF_WIDTH = pinWidth / 2;
  var minPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Удаляет disabled у всех fieldset в форме ad-form
  var form = document.querySelector('.ad-form');
  var removeDisabled = function () {
    var fieldset = form.querySelectorAll('fieldset');
    form.classList.remove('ad-form--disabled');

    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].removeAttribute('disabled');
    }
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
    var locationX = Math.round(parseInt(mapPinMain.style.left, 10) + PIN_HALF_WIDTH);
    var locationY = Math.round(parseInt(mapPinMain.style.top, 10) + PIN_HALF_HEIGHT);
    var inputAddress = form.querySelector('#address');

    inputAddress.setAttribute('value', locationX + ', '
      + Math.round(((locationY - PIN_HALF_HEIGHT) + PIN_ARROW + pinHeight)));
  };
  getLocationMapPinMain();

  window.form = {
    removeDisabled: removeDisabled,
    getLocationMapPinMain: getLocationMapPinMain
  };

})();
