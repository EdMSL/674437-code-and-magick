'use strict';

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var totalSimilarWizards = 4;
var availableNamesOfWizard = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var availableSurnamesOfWizard = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var availableCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var availableEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

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

showElement(setup);
showElement(setupSimilar);

renderListOfSimilarWizards(generateListOfSimilarWizards(totalSimilarWizards));
