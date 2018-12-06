'use strict';

(function () {
  var ERROR_BLOCK_TIMEOUT = 3000;

  var setup = document.querySelector('.setup');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupSimilar = document.querySelector('.setup-similar');
  var totalSimilarWizards = 4;
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


  function generateSimilarWizardsListElement(wizardElement) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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

    for (var i = 0; i < totalSimilarWizards; i++) {
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
    setup.style.left = '';
    setup.style.top = '';
  }

  function onOpenSetupButtonClick() {
    openSetup();
  }

  function onCloseSetupButtonClick() {
    closeSetup();
  }

  function onCloseSetupButtonKeydown(evt) {
    window.utils.isEnterEvent(evt, closeSetup);
  }

  function onOpenSetupButtonKeydown(evt) {
    window.utils.isEnterEvent(evt, openSetup);
  }

  var onOpenSetupKeydown = function (evt) {
    window.utils.isEscEvent(evt, closeSetup);
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
    playerWizardCoat.style.fill = playerWizardCoatInput.value = window.utils.getRandomValueFromArray(availableCoatColor);
  }

  function onPlayerWizardEyesClick() {
    playerWizardEyes.style.fill = playerWizardEyesInput.value = window.utils.getRandomValueFromArray(availableEyesColor);
  }

  function onPlayerWizardFireballClick() {
    playerWizardFireball.style.backgroundColor = playerWizardFireballInput.value = window.utils.getRandomValueFromArray(availableFireballColor);
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

  setPlayerSetupListeners();

  function showErrorBlock(message) {
    var errorBlock = document.createElement('div');
    errorBlock.id = 'error-block';
    errorBlock.style = 'z-index: 5; font-size: 15px; background-color: red; padding: 5px;';
    errorBlock.textContent = message;
    errorBlock.style.position = 'fixed';
    errorBlock.style.left = 0;
    errorBlock.style.top = 0;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
    setTimeout(function () {
      document.body.removeChild(errorBlock);
    }, ERROR_BLOCK_TIMEOUT);
  }

  function onErrorSave(message) {
    showErrorBlock(message);
  }

  function onSuccessSave() {
    closeSetup();
  }

  setupForm.addEventListener('submit', function (evt) {
    window.backend.save('https://js.dump.academy/code-and-magick', new FormData(setupForm), onSuccessSave, onErrorSave);
    evt.preventDefault();
  });

  function onSuccessLoad(wizardsList) {
    renderListOfSimilarWizards(wizardsList);
  }

  function onErrorLoad(message) {
    showErrorBlock(message);
  }

  window.backend.load('https://js.dump.academy/code-and-magick/data', onSuccessLoad, onErrorLoad);
})();
