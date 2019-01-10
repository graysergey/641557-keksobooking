'use strict';

(function () {

  // Далее, создаем объявление
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Создает картинку из шаблона, и задает ей одрес из массива
  var getElementPhoto = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      var createImg = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      createImg.src = photo;
      fragment.appendChild(createImg);
    });
    return fragment;
  };

  // Создает <li> - елемент списка, из массива features (картинки удобств)
  var getFeatures = function (features) {
    var fragment = document.createDocumentFragment();
    features.forEach(function (feature) {
      var element = document.createElement('li');
      element.className = 'popup__feature popup__feature--' + feature;
      fragment.appendChild(element);
    });
    return fragment;
  };


  // проверка наличия элементов карточки
  var renderTitle = function (title, card) {
    var titleElement = card.querySelector('.popup__title');
    if (title.length) {
      titleElement.textContent = title;
    } else {
      titleElement.remove();
    }
  };

  var renderAddress = function (address, card) {
    var adressElement = card.querySelector('.popup__text--address');
    if (address.length) {
      adressElement.textContent = address;
    } else {
      adressElement.remove();
    }
  };

  var renderPrice = function (price, card) {
    var priceElement = card.querySelector('.popup__text--price');
    if (price.length) {
      priceElement.textContent = price + '\u20BD' + '/ночь';
    } else {
      priceElement.remove();
    }
  };

  var renderType = function (type, card) {
    var typeElement = card.querySelector('.popup__type');
    if (type.length) {
      typeElement.textContent = type;
    } else {
      typeElement.remove();
    }
  };

  var renderCapacity = function (rooms, guests, card) {
    var capacityElement = card.querySelector('.popup__text--capacity');
    if (rooms.length && guests.length) {
      capacityElement.textContent = rooms + ' комнаты для ' + guests + ' гостей';
    } else {
      capacityElement.remove();
    }
  };

  var renderCheckin = function (checkin, checkout, card) {
    var timeElement = card.querySelector('.popup__text--time');
    if (checkin.length && checkout.length) {
      timeElement.textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    } else {
      timeElement.remove();
    }
  };

  var renderDescription = function (description, card) {
    var descriptionElement = card.querySelector('.popup__description');
    if (description.length) {
      descriptionElement.textContent = description;
    } else {
      descriptionElement.remove();
    }
  };

  var renderPhotos = function (photos, card) {
    var photosListElement = card.querySelector('.popup__photos');
    if (photos.length) {
      photosListElement.textContent = '';
      photosListElement.appendChild(getElementPhoto(photos));
    } else {
      photosListElement.remove();
    }
  };

  var renderAvatar = function (avatar, card) {
    var avatarElement = card.querySelector('.popup__avatar');
    if (avatar.length) {
      avatarElement.src = avatar;
    } else {
      avatarElement.remove();
    }
  };

  var renderFeatures = function (features, card) {
    var featuresList = card.querySelector('.popup__features');
    if (features.length) {
      featuresList.textContent = ''; //  удаляет все li
      featuresList.appendChild(getFeatures(features)); // добавляет из массива li
    } else {
      featuresList.remove();
    }
  };

  // Создает DOM элемент (объявления на карте)
  var getCardElement = function (advert) {
    var card = cardTemplate.cloneNode(true);
    var closeButton = card.querySelector('.popup__close');
    window.map.setListenerToCard(closeButton);

    renderTitle(advert.offer.title, card);
    renderAddress(advert.offer.address, card);
    renderPrice(advert.offer.price, card);
    renderType(advert.offer.type, card);
    renderCapacity(advert.offer.rooms, advert.offer.guests, card);
    renderCheckin(advert.offer.checkin, advert.offer.checkout, card);
    renderDescription(advert.offer.description, card);
    renderPhotos(advert.offer.photos, card);
    renderAvatar(advert.author.avatar, card);
    renderFeatures(advert.offer.features, card);

    return card;
  };

  window.createCard = getCardElement;

})();
