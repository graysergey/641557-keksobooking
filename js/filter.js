'use strict';

(function () {

  var filtersForm = document.querySelector('.map__filters');
  var typeSelect = filtersForm.querySelector('#housing-type');
  var priceSelect = filtersForm.querySelector('#housing-price');
  var roomsSelect = filtersForm.querySelector('#housing-rooms');
  var guestsSelect = filtersForm.querySelector('#housing-guests');
  // var housingFeatures = filtersForm.querySelector('#housing-features');
  var priceRooms = {
    min: 10000,
    max: 50000
  };

  var onChangeFilter = function (func) {
    typeSelect.addEventListener('change', func);
    priceSelect.addEventListener('change', func);
    roomsSelect.addEventListener('change', func);
    guestsSelect.addEventListener('change', func);
  };

  var getFiltredType = function (advert) {
    return typeSelect.value === advert.offer.type || typeSelect.value === 'any';
  };

  var getFiltredPrice = function (advert) {
    if (priceSelect.value === 'low') {
      return advert.offer.price < priceRooms.min;
    } else if (priceSelect.value === 'middle') {
      return advert.offer.price >= priceRooms.min && advert.offer.price <= priceRooms.max;
    } else if (priceSelect.value === 'high') {
      return advert.offer.price >= priceRooms.max;
    }
    return true;
  };

  var getFiltredRooms = function (advert) {
    return +roomsSelect.value === advert.offer.rooms || roomsSelect.value === 'any';
  };

  var getFiltredGuests = function (advert) {
    return +guestsSelect.value === advert.offer.guests || guestsSelect.value === 'any';
  };

  // var getFiltredFeatures = function (advert) {
  //   var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
  // };

  var getFiltredData = function (arrayData) {
    return arrayData.filter(function (item) {
      return getFiltredType(item) && getFiltredPrice(item) && getFiltredRooms(item) && getFiltredGuests(item);
    });
  };

  window.filter = {
    onChangeFilter: onChangeFilter,
    getFiltredData: getFiltredData
  };

})();
