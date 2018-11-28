'use strict';

var widthMap = document.querySelector('.map').offsetWidth;

var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 15;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var LOCATION_MIN_X = 25;
var LOCATION_MAX_X = widthMap - 25;
var DESCRIPTION = 'Великолепные аппартаменты в центре Токио';
var ADS_COUNT = 8;

var pointers = document.querySelector('.map__pins');
var adOnMap = document.querySelector('.map').querySelector('.map__filters-container');
// var filtersContainer = document.querySelector('.map__filters-container');

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
  return 'img/avatars/user0' + (i + 1) + '.png';
};

var getRandomPlace = function (array) {
  var index;
  var indexArray = array[Math.floor(Math.random() * array.length)];

  if (indexArray === 'flat') {
    index = 'Квартира';
  } else if (indexArray === 'bungalo') {
    index = 'Бунгало';
  } else if (indexArray === 'house') {
    index = 'Дом';
  } else if (indexArray === 'place') {
    index = 'Дворец';
  }
  return index;
};

// Создает массив объявлений
var createAdsArray = function (amount) {
  var ads = [];

  for (var i = 0; i < amount; i++) {
    var locationX = getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X);
    var locationY = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

    var ad = {
      author: {
        avatar: getUserAvatar(i)
      },

      offer: {
        title: titles[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(PRICE_MIN, PRICE_MAX),
        type: getRandomPlace(types),
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

// записываем в переменную массив объявлений
var ads = createAdsArray(ADS_COUNT);
// console.log(createAdsArray(ADS_COUNT));

// показывает активное состояние карты
var map = document.querySelector('.map');
map.classList.remove('map--faded');


var pointerTemplate = document.querySelector('#pin');

// Создает DOM элемент (отметки на карте)
var getPointerElement = function (ad) {
  var elementPointer = pointerTemplate.cloneNode(true).content;
  var pin = elementPointer.querySelector('.map__pin');
  var avatar = elementPointer.querySelector('img');

  pin.style.left = ad.location.x + 'px';
  pin.style.top = ad.location.y + 'px';
  avatar.src = ad.author.avatar;
  avatar.alt = ad.offer.title;

  return elementPointer;
};

// Создает DOM фрагмент (отметки на карте)
var getPointerFragment = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(getPointerElement(array[i]));
  }
  return fragment;
};
pointers.appendChild(getPointerFragment(ads));


var cardTemplate = document.querySelector('#card').content;

// Создает img с нужным src
var getElementPhoto = function (data) {
  var elementImg = cardTemplate
    .querySelector('.popup__photo').cloneNode(true);
  elementImg.src = data;

  return elementImg;
};

// Создает список img в блоке popup__photos
var getElementsPhoto = function (array) {
  var photoContainer = cardTemplate.querySelector('.popup__photos');

  for (var i = 0; i < array.length; i++) {
    var imgElement = getElementPhoto(array[i]);
    photoContainer.appendChild(imgElement);
  }
  return photoContainer;
};

// Создает DOM элемент (объявления на карте)
var getCardElement = function (ad) {
  var elementCard = cardTemplate.cloneNode(true);
  var card = elementCard.querySelector('.map__card');


  // var testFragment = document.createDocumentFragment();
  // var test = document.createElement('div');
  // test.classList.add('map__card');
  // test.textContent = 'Какой то текст на странице' + ' 60 ' + 'еще какой то текст '
  //   + (70 - 20 * 2) + 'еще много много текста';
  // testFragment.appendChild(test);
  // return testFragment.appendChild(test);

  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '\u20BD' + '/ночь';
  card.querySelector('.popup__type').textContent = ad.offer.type;
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для '
    + ad.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  // card.querySelector('.popup__features').querySelectorAll('.popup__feature');
  card.querySelector('.popup__description').textContent = ad.offer.description;
  card.querySelector('.popup__photos') = getElementsPhoto(photos);

  return card;
};
// console.log(getCardElement(ads[0]));
// adOnMap.appendChild(getCardElement());

// Создает DOM фрагмент (объявления на карте)
var getFragmentCard = function (array) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getCardElement(array[0]));
  return fragment;
};
// console.log(getFragmentCard(ads[0]));

// adOnMap.insertBefore(getFragmentCard(ads), filtersContainer);
adOnMap.appendChild(getFragmentCard(ads));
