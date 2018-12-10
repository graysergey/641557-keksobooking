'use strict';

var mapWidth = document.querySelector('.map').offsetWidth;
var pinWidth = document.querySelector('.map__pin--main').offsetWidth;
var pinHeight = document.querySelector('.map__pin--main').offsetHeight;
var pointers = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map').querySelector('.map__filters-container');
var map = document.querySelector('.map');


// Активация интерфейса по нажанию, на главную метку карты.

var activateInterface = function () {
  map.classList.remove('map--faded');
  pointers.appendChild(getPointerFragment(ads)); // Отрисовывает отметки на карте
  removeDisabled();
  onPinClick(); // Вызывает функцию (обработчик событий)
};

var mapPinMain = pointers.querySelector('.map__pin--main');

mapPinMain.addEventListener('keydown', function (evt) {
  evt.preventDefault();

  if (isEnterEvent(evt)) {
    activateInterface();
  }
});

// Отрисовка объявлений при нажатии на метки

var isEnterEvent = function (evt) {
  return evt.keyCode === ENTER__KEYCODE;
};

var isEscapeEvt = function (evt) {
  return evt.keyCode === ESC__KEYCODE;
};

var closeCardPopup = function () {
  var card = document.querySelector('.map__card');
  if (card) {
    card.remove();
  }
};

var doCardPopup = function (pinId) {
  var card = document.querySelector('.map__card');
  if (card) {
    closeCardPopup();
  }
  var newCard = getFragmentCard(ads[pinId]);
  map.insertBefore(newCard, filtersContainer);
};

// Вешает обработчик событий на метки
var onPinClick = function () {
  var pinsList = pointers.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pinsList.length; i++) {
    pinsList[i].addEventListener('click', function (evt) {
      var button = evt.currentTarget;
      var pinId = button.getAttribute('data-id');
      doCardPopup(pinId);

      var closeButton = document.querySelector('.popup__close');
      closeButton.addEventListener('click', function () {
        closeCardPopup();
      });

      document.addEventListener('keydown', function (keydownEvt) {
        if (isEscapeEvt(keydownEvt)) {
          closeCardPopup();
        }
      });
    });
  }
};

