'use strict';

(function () {

  var SUCCESS_CODE = 200;

  var URL = {
    load: 'https://js.dump.academy/keksobooking/data',
    upload: 'https://js.dump.academy/keksobooking'
  };

  var xhrRender = function (onLoad, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        error('Статус ответа сервера: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения');
    });

    xhr.timeout = 30000;
    xhr.addEventListener('timeout', function () {
      error('Запрос не успел выполняться за  ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  var load = function (onLoad, error) {
    var xhr = xhrRender(onLoad, error);
    xhr.open('GET', URL.load);
    xhr.send();
  };

  var upload = function (data, onLoad, error) {
    var xhr = xhrRender(onLoad, error);
    xhr.open('POST', URL.upload);
    xhr.send(data);
  };

  function onError(errorMessage) {
    var popup = document.createElement('div');
    popup.style = 'display: flex; margin: 0 auto; min-height: 50px; justify-content: center; align-items: center; color: #fff; background-color: red; z-index: 100';
    popup.style.position = 'absolute';
    popup.style.left = 0;
    popup.style.right = 0;
    popup.style.fontSize = '35px';
    popup.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', popup);
  }

  window.backend = {
    load: load,
    upload: upload,
    onError: onError
  };

})();
