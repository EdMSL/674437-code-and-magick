'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_CORNER_RADIUS = 20;
var GAP = 10;
var BAR_WIDTH = 40;
var GISTOGRAMM_HEIGHT = 150;
var LINE_HEIGHT_MODIFICATOR = 4;

var textStyle = {
  font: '16px PT Mono',
  color: '#000000',
  fontSize: function () {
    var fontArr = this.font.split(' ');
    var fontSize = parseInt(fontArr[0], 10);
    return fontSize;
  }
};
var textHeight = textStyle.fontSize() + LINE_HEIGHT_MODIFICATOR;
var barHeight = CLOUD_HEIGHT - GISTOGRAMM_HEIGHT - GAP;
var congratulationsTextArr = ['Ура, вы победили!', 'Список результатов:'];

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + CLOUD_CORNER_RADIUS, y);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_CORNER_RADIUS, y);
  ctx.arcTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH, y + CLOUD_HEIGHT, CLOUD_CORNER_RADIUS);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - CLOUD_CORNER_RADIUS);
  ctx.arcTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x, y + CLOUD_HEIGHT, CLOUD_CORNER_RADIUS);
  ctx.lineTo(x + CLOUD_CORNER_RADIUS, y + CLOUD_HEIGHT);
  ctx.arcTo(x, y + CLOUD_HEIGHT, x, y, CLOUD_CORNER_RADIUS);
  ctx.lineTo(x, y + CLOUD_CORNER_RADIUS);
  ctx.arcTo(x, y, x + CLOUD_WIDTH, y, CLOUD_CORNER_RADIUS);
  ctx.closePath();
  ctx.fill();
}

function getColor(color, modificator) {
  if (color[0] === '#') {
    var newColor = color.slice(1);
    var newColorArr = [];

    if (newColor.length < 6) {
      return '#000000';
    }

    for (var i = 0; i < newColor.length; i += 2) {
      newColorArr.push(newColor.substr(i,2));
    }

    for (var j = 0; j < newColorArr.length; j++) {
      newColorArr[j] = Math.round(parseInt(newColorArr[j],16) * modificator);
      newColorArr[j] = (newColorArr[j]).toString(16);

      if (newColorArr[j].length < 2) {
        newColorArr[j] = '0' + newColorArr[j];
      }

      if (newColorArr[j].length > 2) {
        newColorArr[j] = newColorArr[j].slice(1);
      }
    }

    return '#' + newColorArr.join('');

  } else {
    return '#000000';
  }
}

function renderText(ctx, x, y, arr, color) {
  for (var i = 0; i < arr.length; i++) {
    if (color) {
      ctx.fillStyle = color;
    } else {
      ctx.fillStyle = textStyle.color;
    }
    ctx.fillText(arr[i], x, y + i * textHeight);
  }
}

function renderRect(ctx, x, y, width, height, color) {
  if (color) {
    ctx.fillStyle = color;
  } else {
    ctx.fillStyle = '#000000';
  }
  ctx.fillRect(x, y, width, height);
}

window.renderStatistics = function (ctx, players, times) {
  if (players.length !== times.length) {
    players.length = times.length = Math.min(players.length, times.length);
  }

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.textBaseline = 'hanging';
  renderText(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2, congratulationsTextArr);

  var maxTime = Math.max.apply(null, times);

  for (var i = 0; i < players.length; i++) {
    var currentPlayerArr = [];
    var currentTimeArr = [];
    currentPlayerArr.push(players[i]);
    currentTimeArr.push(Math.round(times[i]));
    renderText(ctx, (CLOUD_X + GAP * 2) + ((BAR_WIDTH * 2 + GAP) * i), CLOUD_HEIGHT - GAP * 2, currentPlayerArr);

    if (currentPlayerArr[0] === 'Вы') {
      renderRect(ctx, (CLOUD_X + GAP * 2) + ((BAR_WIDTH * 2 + GAP) * i), CLOUD_HEIGHT - ((barHeight * times[i]) / maxTime) - textHeight - GAP, BAR_WIDTH, (barHeight * times[i]) / maxTime, '#ff0000');
    } else {
      renderRect(ctx, (CLOUD_X + GAP * 2) + ((BAR_WIDTH * 2 + GAP) * i), CLOUD_HEIGHT - ((barHeight * times[i]) / maxTime) - textHeight - GAP, BAR_WIDTH, (barHeight * times[i]) / maxTime, getColor('#0000ff', times[i] / maxTime));
    }

    renderText(ctx, (CLOUD_X + GAP * 2) + ((BAR_WIDTH * 2 + GAP) * i), CLOUD_HEIGHT - GAP * 2 - (barHeight * times[i]) / maxTime - textHeight - GAP, currentTimeArr);
  }
};
