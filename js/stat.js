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
  fontSize: 16
};
var textHeight = textStyle.fontSize + LINE_HEIGHT_MODIFICATOR;
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

function renderText(ctx, x, y, arr, color) {
  for (var i = 0; i < arr.length; i++) {
    ctx.fillStyle = color ? color : textStyle.color;
    ctx.fillText(arr[i], x, y + i * textHeight);
  }
}

function renderRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color ? color : '#000000';
  ctx.fillRect(x, y, width, height);
}

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

function renderGistogramm(ctx, players, times, maxTime, n) {
  var currentPlayerArr = [];
  var currentTimeArr = [];
  currentPlayerArr.push(players[n]);
  currentTimeArr.push(Math.round(times[n]));
  renderText(ctx, (CLOUD_X + GAP * 2) + ((BAR_WIDTH * 2 + GAP) * n), CLOUD_HEIGHT - GAP * 2, currentPlayerArr);

  if (currentPlayerArr[0] === 'Вы') {
    renderRect(ctx, (CLOUD_X + GAP * 2) + ((BAR_WIDTH * 2 + GAP) * n), CLOUD_HEIGHT - ((barHeight * times[n]) / maxTime) - textHeight - GAP, BAR_WIDTH, (barHeight * times[n]) / maxTime, 'rgba(255, 0, 0, 1)');
  } else {
    renderRect(ctx, (CLOUD_X + GAP * 2) + ((BAR_WIDTH * 2 + GAP) * n), CLOUD_HEIGHT - ((barHeight * times[n]) / maxTime) - textHeight - GAP, BAR_WIDTH, (barHeight * times[n]) / maxTime, 'rgba(0, 0, 255, ' + (times[n] / maxTime).toFixed(2) + ')');
  }

  renderText(ctx, (CLOUD_X + GAP * 2) + ((BAR_WIDTH * 2 + GAP) * n), CLOUD_HEIGHT - GAP * 2 - (barHeight * times[n]) / maxTime - textHeight - GAP, currentTimeArr);
}

window.renderStatistics = function (ctx, players, times) {
  if (players.length !== times.length) {
    players.length = times.length = Math.min(players.length, times.length);
  }

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.textBaseline = 'hanging';
  renderText(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2, congratulationsTextArr);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    renderGistogramm(ctx, players, times, maxTime, i);
  }
};
