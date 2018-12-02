'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var dialogHandle = document.querySelector('.upload');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    function onMouseMove(evtMove) {
      evtMove.preventDefault();
      dragged = true;

      var newTop;
      var newLeft;
      var windowWidth = document.documentElement.clientWidth;
      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY,
      };

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      newTop = setup.offsetTop - shift.y;
      newLeft = setup.offsetLeft - shift.x;

      if (setup.offsetTop < 0) {
        newTop = 0;
      }
      // т.к  у окна настроек прописано translateX(-50%), то отталкиваемся от половины шинины окна
      if (setup.offsetLeft < setup.offsetWidth / 2) {
        newLeft = setup.offsetWidth / 2;
      }
      if (setup.offsetLeft + setup.offsetWidth - setup.offsetWidth / 2 > windowWidth) {
        newLeft = windowWidth - setup.offsetWidth + (setup.offsetWidth / 2) - shift.y;
      }

      setup.style.top = newTop + 'px';
      setup.style.left = newLeft + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtDrag) {
          evtDrag.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
