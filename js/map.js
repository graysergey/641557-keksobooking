'use strict';
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 15;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var DESCRIPTION = '';
var ADS_COUNT = 8;

var widthMap = document.querySelector('.map').offsetWidth;
var widthPointer = document.querySelector('.map__pin').offsetWidth;
var pointerTemlate = document.querySelector('#pin')
  .content.querySelector('.map__pin');
var pointerElement = document.querySelector('.map__pin');

var titles = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Перемешивает массив
var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var getRandomNumber = function (from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

var getRandomLengthArray = function (array) {
  return array.slice(Math.floor(getRandomNumber(1, array.length)));
};

var getUserAvatar = function (i) {
  return 'img/avatars/user0' + i + 1 + '.png';
};

// Создает массив объявлений
var createAdsArray = function (amount) {
  var ads = [];

  for (var i = 0; i < amount; i++) {
    var locationX = Math.round(Math.random() * widthMap);
    var locationY = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

    var ad = {
      author: {
        avatar: getUserAvatar
      },

      offer: {
        title: titles[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(PRICE_MIN, PRICE_MAX),
        type: types[Math.floor(Math.random() * types.length)],
        rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        checkin: checkinTimes[Math.floor(Math.random() * checkinTimes.length)],
        checkout: checkoutTimes[Math.floor(Math.random() * checkoutTimes.length)],
        features: getRandomLengthArray(featuresArray),
        description: DESCRIPTION,
        photos: shuffleArray(photos)
      },

      location: {
        x: locationX,
        y: locationY
      }
    };
    ads.push(ad);
  }
  return ads;
};

var ads = createAdsArray(ADS_COUNT);

// показывает активное состояние карты
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Создает DOM элемент (отметки на карте)
var getPointerElement = function (ad) {
  var elementPointer = pointerTemlate.cloneNode(true);

  elementPointer.style.left = (ad.location.x + 'px') - (widthPointer / 2);
  elementPointer.src = ad.author.avatar;
  elementPointer.alt = ad.offer.title;

  return elementPointer;
};

// Создает DOM фрагмент
var getPointerFragment = function (count) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count - 1; i++) {
    fragment.appendChild(getPointerElement(ads[i]));
  }
};

// Запускает предидущий код (должен отрисовать метки)
pointerElement.appendChild(getPointerFragment(ADS_COUNT));
