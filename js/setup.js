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

var openSetupButton = document.querySelector('.setup-open-icon');
var closeSetupButton = document.querySelector('.setup-close');
var wizardNameInput = setup.querySelector('.setup-user-name');
var submitButton = setup.querySelector('.setup-submit');

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

function showElement(element) {
  element.classList.remove('hidden');
}

function closeElement(element) {
  element.classList.add('hidden');
}

function onOpenSetupButtonClick() {
  showElement(setup);
  showElement(setupSimilar);
}

function onCloseSetupButtonClick() {
  closeElement(setup);
  closeElement(setupSimilar);
}

function onCloseSetupButtonKeydown(evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closeElement(setup);
    closeElement(setupSimilar);
  }
}

function onOpenSetupButtonKeydown(evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    showElement(setup);
    showElement(setupSimilar);
  }
}

var onOpenSetupKeydown = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeElement(setup);
    closeElement(setupSimilar);
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

function onSubmitButtonKeydown(evt) {
  if (evt.keyCode !== ENTER_KEY_CODE) {
    return false;
  }
}

openSetupButton.addEventListener('click', onOpenSetupButtonClick);
openSetupButton.addEventListener('keydown', onOpenSetupButtonKeydown);
closeSetupButton.addEventListener('click', onCloseSetupButtonClick);
closeSetupButton.addEventListener('keydown', onCloseSetupButtonKeydown);
document.addEventListener('keydown', onOpenSetupKeydown);
wizardNameInput.addEventListener('focus', onNameInputFocus);
wizardNameInput.addEventListener('blur', onNameInputBlur);
submitButton.addEventListener('keydown', onSubmitButtonKeydown);

renderListOfSimilarWizards(generateListOfSimilarWizards(totalSimilarWizards));
