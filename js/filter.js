'use strict';

(function () {

  var filtersForm = document.querySelector('.map__filters');
  var typeSelect = filtersForm.querySelector('#housing-type');
  var priceSelect = filtersForm.querySelector('#housing-price');
  var roomsSelect = filtersForm.querySelector('#housing-rooms');
  var guestsSelect = filtersForm.querySelector('#housing-guests');
  var housingFeatures = filtersForm.querySelector('#housing-features');
  var priceRooms = {
    min: 10000,
    max: 50000
  };

  var onChangeFilter = function (func) {
    filtersForm.addEventListener('change', func);
  };

  var getFiltredType = function (advert) {
    return typeSelect.value === advert.offer.type || typeSelect.value === 'any';
  };

  var getFiltredPrice = function (advert) {
    var price;
    switch (priceSelect.value) {
      case 'any':
        price = true;
        break;
      case 'low':
        price = advert.offer.price < priceRooms.min;
        break;
      case 'middle':
        price = advert.offer.price >= priceRooms.min && advert.offer.price <= priceRooms.max;
        break;
      case 'high':
        price = advert.offer.price >= priceRooms.max;
    }
    return price;
  };

  var getFiltredRooms = function (advert) {
    return Number(roomsSelect.value) === advert.offer.rooms || roomsSelect.value === 'any';
  };

  var getFiltredGuests = function (advert) {
    return Number(guestsSelect.value) === advert.offer.guests || guestsSelect.value === 'any';
  };

  var getFiltredFeatures = function (advert) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    var feature = true;
    Array.from(checkedFeatures).every(function (checkbox) {
      feature = advert.offer.features.indexOf(checkbox.value) !== -1;
      return feature;
    });
    return feature;
  };

  var getFiltredData = function (arrayData) {
    return arrayData.filter(function (item) {
      return getFiltredType(item) && getFiltredPrice(item) && getFiltredRooms(item) && getFiltredGuests(item) && getFiltredFeatures(item);
    });
  };

  window.filter = {
    onChangeFilter: onChangeFilter,
    getFiltredData: getFiltredData
  };

})();
