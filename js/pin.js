'use strict';

(function () {

  var pointerTemplate = document.querySelector('#pin').content;

  // Создает DOM элемент (отметки на карте)
  var getPointerElement = function (card, index) {
    var elementPointer = pointerTemplate.cloneNode(true);
    var pin = elementPointer.querySelector('.map__pin');
    var avatarUser = elementPointer.querySelector('img');
    window.map.onPinClick(pin);

    pin.style.left = card.location.x + 'px';
    pin.style.top = card.location.y + 'px';
    pin.setAttribute('data-id', index);
    avatarUser.src = card.author.avatar;
    avatarUser.alt = card.offer.title;

    return elementPointer;
  };

  // Создает DOM фрагмент (отметки на карте)
  var getPointerFragment = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(getPointerElement(array[i], i));
    }
    return fragment;
  };

  // Удаляет отметки на карте
  var removePins = function () {
    var pinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pinsList) {
      pinsList.forEach(function (item) {
        item.remove();
      });
    }
  };

  window.pin = {
    getPointerFragment: getPointerFragment,
    removePins: removePins
  };

})();
