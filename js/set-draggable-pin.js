'use strict';

(function () {

  window.setDraggablePin = function (mapElement, pinElement, pinWidth, pinHeight) {

    var LOCATION_MIN_Y = 130;
    var LOCATION_MAX_Y = 630;

    var mapWidth = mapElement.offsetWidth;
    var locationMinX = pinWidth / 2;

    pinElement.addEventListener('mousedown', function (evt) {
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
        }

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var newCoordsX = pinElement.offsetLeft - shift.x;
        var newCoordsY = pinElement.offsetTop - shift.y;

        var minCoords = {
          x: Math.floor(locationMinX - pinWidth / 2),
          y: Math.floor(LOCATION_MIN_Y - pinHeight)
        };

        var maxCoords = {
          x: Math.floor(mapWidth - pinWidth),
          y: Math.floor(LOCATION_MAX_Y - pinHeight / 2)
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

        pinElement.style.left = newCoordsX + 'px';
        pinElement.style.top = newCoordsY + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.map.getCurentCoordsMainPin();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

})();
