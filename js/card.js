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
    var titleElement = card.querySelector('.popup__title');
    var adressElement = card.querySelector('.popup__text--address');
    var priceElement = card.querySelector('.popup__text--price');
    var typeElement = card.querySelector('.popup__type');
    var capacityElement = card.querySelector('.popup__text--capacity');
    var timeElement = card.querySelector('.popup__text--time');
    var descriptionElement = card.querySelector('.popup__description');
    var photosListElement = card.querySelector('.popup__photos');
    var avatarElement = card.querySelector('.popup__avatar');

    var closeButton = card.querySelector('.popup__close');
    window.map.onCloseClick(closeButton);

    if (advert.offer.title.length !== 0) {
      titleElement.textContent = advert.offer.title;
    } else {
      titleElement.remove();
    }
    if (advert.offer.address.length !== 0) {
      adressElement.textContent = advert.offer.address;
    } else {
      adressElement.remove();
    }
    if (advert.offer.price.length !== 0) {
      priceElement.textContent = advert.offer.price + '\u20BD' + '/ночь';
    } else {
      priceElement.remove();
    }
    if (advert.offer.type.length !== 0) {
      typeElement.textContent = advert.offer.type;
    } else {
      typeElement.remove();
    }
    if (advert.offer.rooms.length && advert.offer.guests.length !== 0) {
      capacityElement.textContent = advert.offer.rooms + ' комнаты для '
      + advert.offer.guests + ' гостей';
    } else {
      capacityElement.remove();
    }
    if (advert.offer.checkin.length && advert.offer.checkout.length !== 0) {
      timeElement.textContent = 'Заезд после '
      + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    } else {
      timeElement.remove();
    }
    if (advert.offer.description.length !== 0) {
      descriptionElement.textContent = advert.offer.description;
    } else {
      descriptionElement.remove();
    }
    if (advert.offer.photos.length !== 0) {
      photosListElement.textContent = '';
      photosListElement.appendChild(getElementPhoto(advert));
    } else {
      photosListElement.remove();
    }
    if (advert.author.avatar.length !== 0) {
      avatarElement.src = advert.author.avatar;
    } else {
      avatarElement.remove();
    }
    if (advert.offer.features.length !== 0) {
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
