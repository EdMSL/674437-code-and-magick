'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var totalWizards = 4;
  var coatColor;
  var eyesColor;
  var wizards = [];

  function generateSimilarWizardsListElement(wizardElement) {
    var similarWizardElement = similarWizardTemplate.cloneNode(true);
    var similarWizardName = similarWizardElement.querySelector('.setup-similar-label');
    var similarWizardCoatColor = similarWizardElement.querySelector('.wizard-coat');
    var similarWizardEyesColor = similarWizardElement.querySelector('.wizard-eyes');

    similarWizardName.textContent = wizardElement.name;
    similarWizardCoatColor.style.fill = wizardElement.colorCoat;
    similarWizardEyesColor.style.fill = wizardElement.colorEyes;

    return similarWizardElement;
  }

  function renderListOfSimilarWizards(wizardsList) {
    var similarWizardsList = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    var quontityOfRenderWizards = wizards.length > totalWizards ? totalWizards : wizards.length;

    similarWizardsList.innerHTML = '';

    for (var i = 0; i < quontityOfRenderWizards; i++) {
      fragment.appendChild(generateSimilarWizardsListElement(wizardsList[i]));
    }

    similarWizardsList.appendChild(fragment);
  }

  function getRank(wizard) {
    var moreRankStep = 2;
    var lessRankStep = 1;
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += moreRankStep;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += lessRankStep;
    }

    return rank;
  }

  function updateWizards() {
    renderListOfSimilarWizards(wizards.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  }

  var onWizardEyesClick = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var onWizardCoatClick = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  function onSuccessLoad(data) {
    wizards = data;
    updateWizards();
  }

  function onErrorLoad(message) {
    window.utils.showErrorBlock(message);
  }

  window.backend.load('https://js.dump.academy/code-and-magick/data', onSuccessLoad, onErrorLoad);

  window.similar = {
    onWizardEyesClick: onWizardEyesClick,
    onWizardCoatClick: onWizardCoatClick
  };
})();
