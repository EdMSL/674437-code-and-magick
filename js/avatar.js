'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var fileChooser = setup.querySelector('.upload input[type=file]');
  var avatarImg = setup.querySelector('.setup-user-pic');
  var avatarImgMain = document.querySelector('.setup-open-icon');

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarImg.src = reader.result;
        avatarImgMain.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
