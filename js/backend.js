'use strict';

(function () {

  var SUCCESS_CODE = 200;

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

  window.backend = {
    load: load,
    // upload: upload,
    // onError: onError
  };

})();
