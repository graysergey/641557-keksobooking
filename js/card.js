'use strict';

(function () {

  // Далее, создаем объявление
  var cardTemplate = document.querySelector('#card').content;

  // Создает картинку из шаблона, и задает ей одрес из массива
  var getElementPhoto = function (advert) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < advert.offer.photos.length; i++) {
      var createImg = cardTemplate.querySelector('.map__card')
      .querySelector('.popup__photo').cloneNode(true);

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

  window.card = getFragmentCard;

})();
