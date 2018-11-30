'use strict';

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var totalSimilarWizards = 4;
var availableNamesOfWizard = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var availableSurnamesOfWizard = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var availableCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var availableEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var availableFireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var openSetupButton = document.querySelector('.setup-open');
var closeSetupButton = document.querySelector('.setup-close');
var wizardNameInput = setup.querySelector('.setup-user-name');
var playerWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var playerWizardCoatInput = setup.querySelector('.setup-player [name="coat-color"]');
var playerWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var playerWizardEyesInput = setup.querySelector('.setup-player [name="eyes-color"]');
var playerWizardFireball = setup.querySelector('.setup-fireball-wrap');
var playerWizardFireballInput = setup.querySelector('.setup-fireball-wrap [name="fireball-color"]');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWizardName(names, surnames) {
  return names[getRandomNumber(0, names.length - 1)] + ' ' + surnames[getRandomNumber(0, surnames.length - 1)];
}

function generateSimilarWizardData() {
  var similarWizard = {};

  similarWizard.name = generateWizardName(availableNamesOfWizard, availableSurnamesOfWizard);
  similarWizard.coatColor = availableCoatColor[getRandomNumber(0, availableCoatColor.length - 1)];
  similarWizard.eyesColor = availableEyesColor[getRandomNumber(0, availableEyesColor.length - 1)];

  return similarWizard;
}

function generateListOfSimilarWizards(totalWizards) {
  var wizardsList = [];
  for (var i = 0; i < totalWizards; i++) {
    wizardsList.push(generateSimilarWizardData());
  }
  return wizardsList;
}

function generateSimilarWizardsListElement(wizardElement) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardElement = similarWizardTemplate.cloneNode(true);
  var similarWizardName = similarWizardElement.querySelector('.setup-similar-label');
  var similarWizardCoatColor = similarWizardElement.querySelector('.wizard-coat');
  var similarWizardEyesColor = similarWizardElement.querySelector('.wizard-eyes');

  similarWizardName.textContent = wizardElement.name;
  similarWizardCoatColor.style.fill = wizardElement.coatColor;
  similarWizardEyesColor.style.fill = wizardElement.eyesColor;

  return similarWizardElement;
}

function renderListOfSimilarWizards(wizardsList) {
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsList.length; i++) {
    fragment.appendChild(generateSimilarWizardsListElement(wizardsList[i]));
  }

  similarWizardsList.appendChild(fragment);
}

function openSetup() {
  setup.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');
  document.addEventListener('keydown', onOpenSetupKeydown);
}

function closeSetup() {
  setup.classList.add('hidden');
  setupSimilar.classList.add('hidden');
  document.removeEventListener('keydown', onOpenSetupKeydown);
}

function onOpenSetupButtonClick() {
  openSetup();
}

function onCloseSetupButtonClick() {
  closeSetup();
}

function onCloseSetupButtonKeydown(evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closeSetup();
  }
}

function onOpenSetupButtonKeydown(evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openSetup();
  }
}

var onOpenSetupKeydown = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeSetup();
  }
};

function onNameInputFocus() {
  if (wizardNameInput.focus) {
    document.removeEventListener('keydown', onOpenSetupKeydown);
  }
}

function onNameInputBlur() {
  if (wizardNameInput.blur) {
    document.addEventListener('keydown', onOpenSetupKeydown);
  }
}

function onPlayerWizardCoatClick() {
  playerWizardCoat.style.fill = playerWizardCoatInput.value = availableCoatColor[getRandomNumber(0, availableCoatColor.length - 1)];
}

function onPlayerWizardEyesClick() {
  playerWizardEyes.style.fill = playerWizardEyesInput.value = availableEyesColor[getRandomNumber(0, availableEyesColor.length - 1)];
}

function onPlayerWizardFireballClick() {
  playerWizardFireball.style.backgroundColor = playerWizardFireballInput.value = availableFireballColor[getRandomNumber(0, availableFireballColor.length - 1)];
}

function setPlayerSetupListeners() {
  openSetupButton.addEventListener('click', onOpenSetupButtonClick);
  openSetupButton.addEventListener('keydown', onOpenSetupButtonKeydown);
  closeSetupButton.addEventListener('click', onCloseSetupButtonClick);
  closeSetupButton.addEventListener('keydown', onCloseSetupButtonKeydown);
  wizardNameInput.addEventListener('focus', onNameInputFocus);
  wizardNameInput.addEventListener('blur', onNameInputBlur);
  playerWizardCoat.addEventListener('click', onPlayerWizardCoatClick);
  playerWizardEyes.addEventListener('click', onPlayerWizardEyesClick);
  playerWizardFireball.addEventListener('click', onPlayerWizardFireballClick);
}

renderListOfSimilarWizards(generateListOfSimilarWizards(totalSimilarWizards));

setPlayerSetupListeners();
