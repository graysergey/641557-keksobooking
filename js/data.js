'use strict';

var mapWidth = document.querySelector('.map').offsetWidth;
var pinWidth = document.querySelector('.map__pin--main').offsetWidth;
var pinHeight = document.querySelector('.map__pin--main').offsetHeight;

var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 15;
var PIN__HALF__WIDTH = pinWidth / 2;
var PIN__HALF__HEIGHT = pinHeight / 2;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var LOCATION_MIN_X = PIN__HALF__WIDTH;
var LOCATION_MAX_X = mapWidth - PIN__HALF__WIDTH;
var ADS_COUNT = 8;
var PIN__ARROW = 12;
var ESC__KEYCODE = 27;
var ENTER__KEYCODE = 13;

var titles = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var types = ['bungalo', 'house', 'flat', 'place'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var minPrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var getLinkAvatar = function (i) {
  return 'img/avatars/user0' + (i + 1) + '.png';
};

var getRandomPlaces = function (array) {
  var index;
  var indexArray = array[Math.floor(Math.random() * array.length)];

  switch (indexArray) {
    case 'flat':
      index = 'Квартира';
      break;
    case 'bungalo':
      index = 'Бунгало';
      break;
    case 'house':
      index = 'Дом';
      break;
    case 'place': index = 'Дворец';
  }
  return index;
};

// Создает массив объявлений
var createAdsArray = function (amount) {
  var ads = [];

  for (var i = 0; i < amount; i++) {
    var locationX = getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X);
    var locationY = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);
    var checkinRandom = Math.floor(Math.random() * checkinTimes.length);
    var checkoutRandom = Math.floor(Math.random() * checkoutTimes.length);


    var ad = {
      author: {
        avatar: getLinkAvatar(i)
      },

      offer: {
        title: titles[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(PRICE_MIN, PRICE_MAX),
        type: getRandomPlaces(types),
        rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        checkin: checkinTimes[checkinRandom],
        checkout: checkoutTimes[checkoutRandom],
        features: getRandomLengthArray(featuresArray),
        description: '',
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
