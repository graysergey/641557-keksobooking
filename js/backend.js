'use strict';

(function () {

  var SUCCESS_CODE = 200;
  var form = document.querySelector('.ad-form');
  // console.log(form);

  var URL = {
    load: 'https://js.dump.academy/keksobooking/data',
    upload: 'https://js.dump.academy/keksobooking'
  };

  var xhrRender = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа сервера: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = 30000;
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполняться за  ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = xhrRender(onLoad, onError);
    xhr.open('GET', URL.load);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = xhrRender(onLoad, onError);
    xhr.open('POST', URL.load);
    xhr.send(data);
  };

  var onError = function (errorMessage) {
    var popup = document.createElement('div');
    popup.style = 'display: flex; margin: 0 auto; min-height: 50px; justify-content: center; align-items: center; color: #fff; background-color: red; z-index: 100';
    popup.style.position = 'absolute';
    popup.style.left = 0;
    popup.style.right = 0;
    popup.style.fontSize = '35px';
    popup.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', popup);
  };

  form.addEventListener('submit', function (evt) {
    upload(new FormData(form), function () {

    },
    onError
    );
    evt.preventDefault();
  });

  window.backend = {
    load: load,
    upload: upload,
    // onError: onError
  };

})();
