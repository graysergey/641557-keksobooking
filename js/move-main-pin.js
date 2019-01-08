'use strict';

var MAP_PIN_MAIN = document.querySelector('.map__pins').querySelector('.map__pin--main');
var PIN_WIDTH = MAP_PIN_MAIN.offsetWidth;
var PIN_HEIGHT = document.querySelector('.map__pin--main').offsetHeight;
var PIN_HALF_WIDTH = PIN_WIDTH / 2;
var PIN_HALF_HEIGHT = PIN_HEIGHT / 2;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var LOCATION_MIN_X = PIN_HALF_WIDTH;
var mapWidth = document.querySelector('.map').offsetWidth;

MAP_PIN_MAIN.addEventListener('mousedown', function (evt) {
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

    var newCoordsX = MAP_PIN_MAIN.offsetLeft - shift.x;
    var newCoordsY = MAP_PIN_MAIN.offsetTop - shift.y;

    var minCoords = {
      x: Math.floor(LOCATION_MIN_X - PIN_HALF_WIDTH),
      y: Math.floor(LOCATION_MIN_Y - PIN_HEIGHT)
    };

    var maxCoords = {
      x: Math.floor(mapWidth - PIN_WIDTH),
      y: Math.floor(LOCATION_MAX_Y - PIN_HALF_HEIGHT)
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

    MAP_PIN_MAIN.style.left = newCoordsX + 'px';
    MAP_PIN_MAIN.style.top = newCoordsY + 'px';
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
