'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';

  function onLoadSucces(data) {
    return data;
  }
  function onSaveSucces() {

  }

  function onSubmitFormLoad(xhr, data, success, fail) {
    if (xhr.status === 200) {
      success(xhr.response);
    } else {
      fail('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
    }
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad('Успех!');
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },
  };
})();
