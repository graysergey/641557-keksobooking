'use strict';

// Далее создание меток
var pointerTemplate = document.querySelector('#pin');

// Создает D OM элемент (отметки на карте). Присваивает метке индекс
var getPointerElement = function (ad, index) {
  var elementPointer = pointerTemplate.cloneNode(true).content;
  var pin = elementPointer.querySelector('.map__pin');
  var avatar = elementPointer.querySelector('img');

  pin.style.left = ad.location.x + 'px';
  pin.style.top = ad.location.y + 'px';
  pin.setAttribute('data-id', index);
  avatar.src = ad.author.avatar;
  avatar.alt = ad.offer.title;

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
