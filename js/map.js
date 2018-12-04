'use strict';

var mapWidth = document.querySelector('.map').offsetWidth;
var pinWidth = document.querySelector('.map__pin--main').offsetWidth;
var pinHeight = document.querySelector('.map__pin--main').offsetHeight;
var pointers = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map').querySelector('.map__filters-container');
var map = document.querySelector('.map');

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
var DESCRIPTION = 'Великолепные аппартаменты в центре Токио (текст для теста)';
var ADS_COUNT = 8;

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
  return array.slice(getRandomNumber(1, array.length - 1));
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

// Далее создание меток
var pointerTemplate = document.querySelector('#pin');

// Создает DOM элемент (отметки на карте). Присваивает метке индекс
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


// Далее, создаем объявление
var cardTemplate = document.querySelector('#card').content;

// Создает картинку из шаблона, и задает ей одрес из массива
var getElementPhoto = function (ad) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ad.offer.photos.length; i++) {
    var createImg = cardTemplate.querySelector('.map__card')
    .querySelector('.popup__photo').cloneNode(true);

    createImg.src = ad.offer.photos[i];
    fragment.appendChild(createImg);
  }
  return fragment;
};

// Создает <li> - елемент списка, из массива features (картинки удобств)
var renderFeatures = function (features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var newElement = document.createElement('li');
    newElement.className = 'popup__feature popup__feature--' + features[i];
    fragment.appendChild(newElement);
  }
  return fragment;
};

// Создает DOM элемент (объявления на карте)
var getCardElement = function (ad) {
  var elementCard = cardTemplate.cloneNode(true);
  var card = elementCard.querySelector('.map__card');
  var featuresList = card.querySelector('.popup__features');

  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '\u20BD' + '/ночь';
  card.querySelector('.popup__type').textContent = ad.offer.type;
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для '
    + ad.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после '
    + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  card.querySelector('.popup__description').textContent = ad.offer.description;
  card.querySelector('.popup__photos').textContent = '';
  card.querySelector('.popup__photos').appendChild(getElementPhoto(ad));
  card.querySelector('.popup__avatar').src = ad.author.avatar;

  //  удаляет все li
  featuresList.textContent = '';

  // добавляет из массива li
  featuresList.appendChild(renderFeatures(ad.offer.features));

  return card;
};

// Создает DOM фрагмент (объявления на карте)
var getFragmentCard = function (arrIndex) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getCardElement(arrIndex));
  return fragment;
};

// Активация интерфейса по нажанию, на главную метку карты.
var ESC__KEYCODE = 27;
var ENTER__KEYCODE = 13;

var activateInterface = function () {
  map.classList.remove('map--faded');
  pointers.appendChild(getPointerFragment(ads)); // Отрисовывает отметки на карте
  removeDisabled();
  onPinClick(); // Вызывает функцию (обработчик событий)
};

// Удаляет disabled у всех fieldset в форме ad-form
var form = document.querySelector('.ad-form');
var removeDisabled = function () {
  var fieldset = form.querySelectorAll('fieldset');
  form.classList.remove('ad-form--disabled');

  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].removeAttribute('disabled');
  }
};

var mapPinMain = pointers.querySelector('.map__pin--main');

mapPinMain.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  activateInterface();
});

mapPinMain.addEventListener('keydown', function (evt) {
  evt.preventDefault();

  if (isEnterEvent(evt)) {
    activateInterface();
  }
});

// Записывает в поле Адреса - координаты главной метки
var getLocationMapPinMain = function () {
  var locationX = String(Math.round(parseInt(mapPinMain.style.left, 10) + PIN__HALF__WIDTH));
  var locationY = String(Math.round(parseInt(mapPinMain.style.top, 10) + PIN__HALF__HEIGHT));
  var inputAddress = form.querySelector('#address');

  inputAddress.setAttribute('value', locationX + ', ' + locationY);
};
getLocationMapPinMain();


// Отрисовка объявления при нажатии на метку

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
