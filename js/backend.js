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
        error();
      }
    });

    xhr.addEventListener('error', function () {
      error();
    });

    xhr.timeout = 10000;
    xhr.addEventListener('timeout', function () {
      error();
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

  window.backend = {
    load: load,
    upload: upload
  };

})();
