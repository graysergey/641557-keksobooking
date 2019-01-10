'use strict';

(function () {

  window.setDraggablePin = function (mapElement) {

    var LOCATION_MIN_Y = 130;
    var LOCATION_MAX_Y = 630;
    var mapPinMain = mapElement.querySelector('.map__pin--main');
    var pinWidth = mapPinMain.offsetWidth;
    var pinHeight = mapPinMain.offsetHeight;
    var pinHalfWidth = pinWidth / 2;
    var pinHalfHeight = pinHeight / 2;
    var locationMinX = pinHalfWidth;
    var mapWidth = document.querySelector('.map').offsetWidth;

    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var isMapActive = document.querySelector('.map--faded');
        if (isMapActive) {
          window.map.activateInterface();
          window.formAds.filtersActivate();
        }

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var newCoordsX = mapPinMain.offsetLeft - shift.x;
        var newCoordsY = mapPinMain.offsetTop - shift.y;

        var minCoords = {
          x: Math.floor(locationMinX - pinHalfWidth),
          y: Math.floor(LOCATION_MIN_Y - pinHeight)
        };

        var maxCoords = {
          x: Math.floor(mapWidth - pinWidth),
          y: Math.floor(LOCATION_MAX_Y - pinHalfHeight)
        };

        if (newCoordsY < minCoords.y) {
          newCoordsY = minCoords.y;
        }

        if (newCoordsY > maxCoords.y) {
          newCoordsY = maxCoords.y;
        }

        if (newCoordsX < minCoords.x) {
          newCoordsX = minCoords.x;
        }

        if (newCoordsX > maxCoords.x) {
          newCoordsX = maxCoords.x;
        }

        mapPinMain.style.left = newCoordsX + 'px';
        mapPinMain.style.top = newCoordsY + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.form.getLocationMapPinMain();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

})();
