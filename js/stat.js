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

var timesArr = [5000, 7000, 9000, 4000, 6000];

window.renderStatistics = function (ctx, players, times) {
  players = timesArr;
  console.log(players.length, times.length);
  console.log(players.length !== times.length);
  if (players.length !== times.length) {
    players.lenght = 4;
    times.length = 4;
  }

  console.log(players);
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.textBaseline = 'hanging';
  renderText(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2, congratulationsTextArr);

  var maxTime = Math.max.apply(null, times);
  for (var i = 0; i < players.length; i++) {
    // ctx.fillStyle = '#000';
    var currentPlayerArr = [];
    var currentTimeArr = [];
    currentPlayerArr.push(players[i]);
    currentTimeArr.push(Math.round(times[i]));
    renderText(ctx, (CLOUD_X + GAP * 2) + ((BAR_WIDTH * 2 + GAP) * i), CLOUD_HEIGHT - GAP * 2, currentPlayerArr);
    renderRect(ctx, (CLOUD_X + GAP * 2) + ((BAR_WIDTH * 2 + GAP) * i), CLOUD_HEIGHT - ((barHeight * times[i]) / maxTime) - textHeight - GAP, BAR_WIDTH, (barHeight * times[i]) / maxTime);
    renderText(ctx, (CLOUD_X + GAP * 2) + ((BAR_WIDTH * 2 + GAP) * i), CLOUD_HEIGHT - GAP * 2 - (barHeight * times[i]) / maxTime - textHeight - GAP, currentTimeArr);
  }
};
