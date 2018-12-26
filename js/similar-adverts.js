'use strict';

(function () {

  // var filtersForm = document.querySelector('.map__filters');
  // var typeSelect = filtersForm.querySelector('housing-type');
  // var priceSelect = filtersForm.querySelector('housing-price');
  // var roomsSelect = filtersForm.querySelector('housing-rooms');
  // var guestsSelect = filtersForm.querySelector('housing-guests');
  var pins = document.querySelector('.map__pins');
  var cards = [];

  // filtersForm.addEventListener('change', updatePins);

  // var getFiltredPins = function () {

  // };

  var updatePins = function () {
    pins.appendChild(window.pin.getPointerFragment(cards));
  };

  // колбек данных от сервера
  var onSuccessData = function (data) {
    cards = data;
    window.cards = cards;
  };

  window.backend.load(onSuccessData, window.popup.onError);

  window.similarAdverds = {
    updatePins: updatePins
  };

})();
