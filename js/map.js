'use strict';

var title = ['Большая уютная квартира',
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
var description = '';
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var addressX = '600';
var addressY = '350';
var priceFrom = 1000;
var priceTo = 1000000;
var roomsFrom = 1;
var roomsTo = 5;
var guestsFrom = 1;
var guestsTo = 15;
var locationYFrom = 130;
var locationYTo = 630;
var offsetWidth = document.querySelector('.map').offsetWidth;

var shufleArray = function (array) {
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

var createArrayAds = function (amount) {
  var ads = [];

  var arrayAvatarsNumbers = ['1', '2', '3', '4', '5', '6', '7', '8']; //фиктивный массив для случайного номера в аватарке
  var numbersForAvatars = shufleArray(arrayAvatarsNumbers);
  var titels = shufleArray(title);
  for (var i = 0; i < amount; i++) {
    var author = {};
    var offer = {};
    var location = {};
    var ad = {
    };

    author.avatar = 'img/avatars/user' + '0' + numbersForAvatars[i] + '.png';

    offer.title = titels[i];
    offer.address = addressX + ', ' + addressY;
    offer.price = getRandomNumber(priceFrom, priceTo);
    offer.type = types[Math.floor(Math.random() * types.length)];
    offer.rooms = getRandomNumber(roomsFrom, roomsTo);
    offer.guests = getRandomNumber(guestsFrom, guestsTo);
    offer.checkin = checkinTimes[Math.floor(Math.random() * checkinTimes.length)];
    offer.checkout = checkoutTimes[Math.floor(Math.random() * checkoutTimes.length)];
    offer.features = getRandomLengthArray(featuresArray);
    offer.description = description;
    offer.photos = shufleArray(photos);

    location.x = Math.round(Math.random() * offsetWidth);
    location.y = getRandomNumber(locationYFrom, locationYTo);

    ad.author = author;
    ad.offer = offer;
    ad.location = location;

    ads.push(ad);
  }
  return ads;
};

createArrayAds(8);



var map = document.querySelector('.map');
map.classList.remove('map--faded');
