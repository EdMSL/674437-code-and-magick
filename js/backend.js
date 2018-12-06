'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = xhr.status + ': Неверный запрос';
            break;
          case 401:
            error = xhr.status + ': Пользователь не авторизован';
            break;
          case 404:
            error = xhr.status + ': Страница с волшебниками не найдена';
            break;
          case 500:
            error = xhr.status + ': Неверный адрес для отправки';
            break;
          default:
            error = xhr.status + ': Произошла ошибка при попытке загрузить список волшебников. Пожалуйста,  обновите страницу';
        }

        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Превышено время ожидания. Пожалуйста, попробуйте позднее');
      });

      xhr.timeout = 10000;

      xhr.open('GET', 'https://js.dump.academy/code-and-magick/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad();
            break;
          case 400:
            error = xhr.status + ': Неверный запрос';
            break;
          case 401:
            error = xhr.status + ': Пользователь не авторизован';
            break;
          case 404:
            error = xhr.status + ': Ничего не найдено';
            break;
          case 500:
            error = xhr.status + ': Неверный адрес для отправки';
            break;
          default:
            error = xhr.status + ': Произошла ошибка при попытке сохранения персонажа, повторите попытку или  попробуйте позднее';
        }

        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Превышено время ожидания. Пожалуйста, попробуйте позднее');
      });

      xhr.timeout = 10000;

      xhr.open('POST', 'https://js.dump.academy/code-and-magick');
      xhr.send(data);
    },
  };
})();
