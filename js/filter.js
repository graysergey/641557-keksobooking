'use strict';

(function () {

  var filtersForm = document.querySelector('.map__filters');
  var typeSelect = filtersForm.querySelector('#housing-type');
  // var priceSelect = filtersForm.querySelector('housing-price');
  // var roomsSelect = filtersForm.querySelector('housing-rooms');
  // var guestsSelect = filtersForm.querySelector('housing-guests');

  var onChangeFilter = function (func) {
    typeSelect.addEventListener('change', func);
  };

  var getFiltredType = function (advert) {

    return typeSelect.value === advert.offer.type || typeSelect.value === 'any';
  };

  var getFiltredData = function (arrayData) {
    return arrayData.filter(function (item) {
      return getFiltredType(item);
    });
  };

  window.filter = {
    onChangeFilter: onChangeFilter,
    getFiltredData: getFiltredData
  };

})();
