'use strict';

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
