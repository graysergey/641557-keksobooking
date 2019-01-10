'use strict';

(function () {

  var filtersForm = document.querySelector('.map__filters');
  var selectsFormFilters = filtersForm.querySelectorAll('select');
  var fieldsetFormFilter = filtersForm.querySelector('fieldset');

  var filtersDeactivate = function () {
    selectsFormFilters.forEach(function (item) {
      item.setAttribute('disabled', true);
    });
    fieldsetFormFilter.setAttribute('disabled', true);
  };
  filtersDeactivate();

  var removeDisabled = function () {
    selectsFormFilters.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    fieldsetFormFilter.removeAttribute('disabled');
  };

  window.formAds = {
    filtersDeactivate: filtersDeactivate,
    removeDisabled: removeDisabled
  };

})();
