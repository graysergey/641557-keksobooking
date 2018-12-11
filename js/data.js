'use strict';

(function () {

  var mapWidth = document.querySelector('.map').offsetWidth;
  var pinWidth = document.querySelector('.map__pin--main').offsetWidth;

  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 15;
  var PIN__HALF__WIDTH = pinWidth / 2;
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;
  var LOCATION_MIN_X = PIN__HALF__WIDTH;
  var LOCATION_MAX_X = mapWidth - PIN__HALF__WIDTH;
  var ADS_COUNT = 8;


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
    var adverts = [];

    for (var i = 0; i < amount; i++) {
      var locationX = Window.utils.getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X);
      var locationY = Window.utils.getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);
      var checkinRandom = Math.floor(Math.random() * checkinTimes.length);
      var checkoutRandom = Math.floor(Math.random() * checkoutTimes.length);


      var card = {
        author: {
          avatar: getLinkAvatar(i)
        },

        offer: {
          title: titles[i],
          address: locationX + ', ' + locationY,
          price: Window.utils.getRandomNumber(PRICE_MIN, PRICE_MAX),
          type: getRandomPlaces(types),
          rooms: Window.utils.getRandomNumber(ROOMS_MIN, ROOMS_MAX),
          guests: Window.utils.getRandomNumber(GUESTS_MIN, GUESTS_MAX),
          checkin: checkinTimes[checkinRandom],
          checkout: checkoutTimes[checkoutRandom],
          features: Window.utils.getRandomLengthArray(featuresArray),
          description: '',
          photos: Window.utils.shuffleArray(photos)
        },

        location: {
          x: locationX,
          y: locationY
        }
      };
      adverts.push(card);
    }
    return adverts;
  };

  Window.adverts = createAdsArray(ADS_COUNT);

})();
