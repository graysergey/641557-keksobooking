'use strict';

(function () {

  var selectRoomNumber = document.querySelector('#room_number');
  var capasitySelectGroop = document.querySelector('#capacity');
  var capacitySelectItem = capasitySelectGroop.querySelectorAll('option');
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
    form.reset();
  };

  var setAddress = function (x, y) {
    var inputAddress = form.querySelector('#address');
    inputAddress.setAttribute('value', x + ', ' + y);
  };

  window.form = {
    removeDisabled: removeDisabled,
    addDisabled: addDisabled,
    resetToDefault: resetForm,
    setAddress: setAddress
  };

})();
