'use strict';

// module5-task1 Личный проект: максимум подвижности

// Вешает обработчик движения на пин. Активирует карту в движении
// Ограничивает движение пина по карте в заданых размерах
mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    activateInterface();

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
      x: Math.floor(LOCATION_MIN_X - PIN__HALF__WIDTH),
      y: Math.floor(LOCATION_MIN_Y - pinHeight)
    };

    var maxCoords = {
      x: Math.floor(mapWidth - pinWidth),
      y: Math.floor(LOCATION_MAX_Y - PIN__HALF__HEIGHT)
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
    getLocationMapPinMain();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

