'use strict';

(function () {

  // Далее, создаем объявление
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Создает картинку из шаблона, и задает ей одрес из массива
  var getElementPhoto = function (advert) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < advert.offer.photos.length; i++) {
      var createImg = cardTemplate.querySelector('.popup__photo').cloneNode(true);

      createImg.src = advert.offer.photos[i];
      fragment.appendChild(createImg);
    }
    return fragment;
  };

  // Создает <li> - елемент списка, из массива features (картинки удобств)
  var renderFeatures = function (features) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var element = document.createElement('li');
      element.className = 'popup__feature popup__feature--' + features[i];
      fragment.appendChild(element);
    }
    return fragment;
  };

  // Создает DOM элемент (объявления на карте)
  var getCardElement = function (advert) {
    var card = cardTemplate.cloneNode(true);
    var featuresList = card.querySelector('.popup__features');
    var closeButton = card.querySelector('.popup__close');
    var titleElement = card.querySelector('.popup__title');
    var adressElement = card.querySelector('.popup__text--address');
    var priceElement = card.querySelector('.popup__text--price');
    var typeElement = card.querySelector('.popup__type');
    var capacityElement = card.querySelector('.popup__text--capacity');
    var timeElement = card.querySelector('.popup__text--time');
    var descriptionElement = card.querySelector('.popup__description');
    var photosListElement = card.querySelector('.popup__photos');
    var avatarElement = card.querySelector('.popup__avatar');
    window.map.onCloseClick(closeButton);

    if (advert.offer.title) {
      titleElement.textContent = advert.offer.title;
    } else {
      titleElement.remove();
    }
    if (advert.offer.address) {
      adressElement.textContent = advert.offer.address;
    } else {
      adressElement.remove();
    }
    if (advert.offer.price) {
      priceElement.textContent = advert.offer.price + '\u20BD' + '/ночь';
    } else {
      priceElement.remove();
    }
    if (advert.offer.type) {
      typeElement.textContent = advert.offer.type;
    } else {
      typeElement.remove();
    }
    if (advert.offer.rooms && advert.offer.guests) {
      capacityElement.textContent = advert.offer.rooms + ' комнаты для '
      + advert.offer.guests + ' гостей';
    } else {
      capacityElement.remove();
    }
    if (advert.offer.checkin && advert.offer.checkout) {
      timeElement.textContent = 'Заезд после '
      + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    } else {
      timeElement.remove();
    }
    if (advert.offer.description) {
      descriptionElement.textContent = advert.offer.description;
    } else {
      descriptionElement.remove();
    }
    if (advert.offer.photos) {
      photosListElement.textContent = '';
      photosListElement.appendChild(getElementPhoto(advert));
    } else {
      photosListElement.remove();
    }
    if (advert.author.avatar) {
      avatarElement.src = advert.author.avatar;
    } else {
      avatarElement.remove();
    }
    if (advert.offer.features) {
      featuresList.textContent = ''; //  удаляет все li
      featuresList.appendChild(renderFeatures(advert.offer.features)); // добавляет из массива li
    } else {
      featuresList.remove();
    }

    return card;
  };

  // Создает DOM фрагмент (объявления на карте)
  var getFragmentCard = function (arrIndex) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(getCardElement(arrIndex));
    return fragment;
  };

  window.card = getFragmentCard;

})();
