'use strict';

var template = require('./saved-card.html');

module.exports = function SavedCardComponent() {
  var directive = {
    bindToController: true,
    controller: SavedCardController,
    controllerAs: 'vm',
    replace: true,
    restrict: 'E',
    scope: {
      brand: '=',
      type: '=',
      number: '=',
      reference: '=',
      selected: '=',
      currencySymbol: '=',
      amount: '=',
      onSubmit: '&',
      isProcessing: '='
    },
    template: template
  };

  return directive;
};

function SavedCardController($element, $timeout) {
  var vm = this;

  vm.isSelected = isSelected;
  vm.selectCard = selectCard;

  function selectCard() {
    if (!isSelected()) {
      vm.selected = {reference: vm.reference};

      $timeout(focusSecurityCodeInput, 300);
    }
  }

  function isSelected() {
    if (!vm.selected) {
      return false;
    }
    return vm.selected.reference === vm.reference;
  }

  function focusSecurityCodeInput() {
    $element.find('input')[0].focus();
  }
}