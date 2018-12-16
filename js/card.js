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

  var onCloseClick = function (closeButton) {
    closeButton.addEventListener('click', function () {
      window.map.closeCardPopup();
    });

    document.addEventListener('keydown', function (keydownEvt) {
      if (window.utils.isEscapeEvt(keydownEvt)) {
        window.map.closeCardPopup();
      }
    });
  };

  // Создает DOM элемент (объявления на карте)
  var getCardElement = function (advert) {
    var card = cardTemplate.cloneNode(true);
    var featuresList = card.querySelector('.popup__features');
    var closeButton = card.querySelector('.popup__close');
    onCloseClick(closeButton);

    card.querySelector('.popup__title').textContent = advert.offer.title;
    card.querySelector('.popup__text--address').textContent = advert.offer.address;
    card.querySelector('.popup__text--price').textContent = advert.offer.price + '\u20BD' + '/ночь';
    card.querySelector('.popup__type').textContent = advert.offer.type;
    card.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для '
      + advert.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после '
      + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    card.querySelector('.popup__description').textContent = advert.offer.description;
    card.querySelector('.popup__photos').textContent = '';
    card.querySelector('.popup__photos').appendChild(getElementPhoto(advert));
    card.querySelector('.popup__avatar').src = advert.author.avatar;

    //  удаляет все li
    featuresList.textContent = '';

    // добавляет из массива li
    featuresList.appendChild(renderFeatures(advert.offer.features));

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
