'use strict';

var mapWidth = document.querySelector('.map').offsetWidth;
var mapPinMain = document.querySelector('.map__pins').querySelector('.map__pin--main');
var pinWidth = mapPinMain.offsetWidth;
var pinHeight = document.querySelector('.map__pin--main').offsetHeight;
var PIN_HALF_WIDTH = pinWidth / 2;
var PIN_HALF_HEIGHT = pinHeight / 2;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var LOCATION_MIN_X = PIN_HALF_WIDTH;

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    window.activateInterface();

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
      x: Math.floor(LOCATION_MIN_X - PIN_HALF_WIDTH),
      y: Math.floor(LOCATION_MIN_Y - pinHeight)
    };

    var maxCoords = {
      x: Math.floor(mapWidth - pinWidth),
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
