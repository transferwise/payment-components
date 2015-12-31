(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var template = require('./pay-button.html');

module.exports = function PayButtonComponent() {
  var directive = {
    bindToController: true,
    controller: function() {},
    controllerAs: 'vm',
    replace: true,
    restrict: 'E',
    scope: {
      currencySymbol: '=',
      amount: '=',
      isDisabled: '='
    },
    template: template
  };

  return directive;
};
},{"./pay-button.html":2}],2:[function(require,module,exports){
module.exports = '<button type="submit" class="btn btn-success btn-block m-t-md m-b-md"\n' +
    '  ng-disabled="vm.isDisabled">\n' +
    '  <span ng-if="!vm.isDisabled">\n' +
    '    Pay {{ ::vm.currencySymbol }}{{ ::vm.amount | number:2 }}\n' +
    '  </span>\n' +
    '  <span ng-if="vm.isDisabled">\n' +
    '    Processing the payment...\n' +
    '  </span>\n' +
    '</button>';
},{}],3:[function(require,module,exports){
'use strict';

var template = require('./payment-card-flipper.html');

module.exports = function PaymentCardFlipperComponent() {
  var directive = {
    bindToController: true,
    controller: function() {},
    controllerAs: 'vm',
    replace: true,
    restrict: 'E',
    scope: {
      brand: '=',
      isFlipped: '='
    },
    template: template,
    transclude: true
  };

  return directive;
};
},{"./payment-card-flipper.html":4}],4:[function(require,module,exports){
module.exports = '<div class="payment-card-flipper"\n' +
    '  ng-class="{\'payment-card-flipper--flipped\' : vm.isFlipped}">\n' +
    '  <div class="payment-card-flipper__wrapper">\n' +
    '    <div class="payment-card-flipper__front payment-card-icon"\n' +
    '      ng-class="\'payment-card-icon--\' + vm.brand"></div>\n' +
    '    <div class="payment-card-flipper__back payment-card-icon payment-card-icon--back"></div>\n' +
    '  </div>\n' +
    '  <ng-transclude></ng-transclude>\n' +
    '</div>';
},{}],5:[function(require,module,exports){
'use strict';

var template = require('./security-code-input.html');

module.exports = function SecurityCodeInputComponent() {
  var directive = {
    bindToController: true,
    controller: function() {},
    controllerAs: 'vm',
    replace: true,
    restrict: 'E',
    scope: {
      focused: '='
    },
    template: template
  };

  return directive;
};
},{"./security-code-input.html":6}],6:[function(require,module,exports){
module.exports = '<input type="text" name="securityCode" required\n' +
    '  class="form-control" autocomplete="off"\n' +
    '  placeholder="3 digits on the back"\n' +
    '  maxlength="3" ng-maxlength="3"\n' +
    '  ng-focus="vm.focused = true"\n' +
    '  ng-blur="vm.focused = false"\n' +
    '  payments-validate="cvc" payments-format="cvc" />';
},{}],7:[function(require,module,exports){
(function (global){
'use strict';

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);
var SecurityCodeInputComponent =
  require('./components/security-code-input/security-code-input.component');
var PaymentCardFlipperComponent =
  require('./components/payment-card-flipper/payment-card-flipper.component');
var PayButtonComponent =
  require('./components/pay-button/pay-button.component');

var common = angular.module('tw.paymentComponents.common', [
  'ngAnimate',
  'angularPayments',
  'tw.styleguide-components'
]);

common.directive('twSecurityCodeInput', SecurityCodeInputComponent);
common.directive('twPaymentCardFlipper', PaymentCardFlipperComponent);
common.directive('twPayButton', PayButtonComponent);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/pay-button/pay-button.component":1,"./components/payment-card-flipper/payment-card-flipper.component":3,"./components/security-code-input/security-code-input.component":5}],8:[function(require,module,exports){
'use strict';

var template = require('./new-card-form.html');

module.exports = function NewCardFormComponent() {
  var directive = {
    bindToController: true,
    controller: function() {},
    controllerAs: 'vm',
    replace: true,
    restrict: 'E',
    scope: {
      cardDetails: '=',
      currencySymbol: '=',
      amount: '=',
      onSubmit: '&',
      isProcessing: '='
    },
    template: template
  };

  return directive;
};
},{"./new-card-form.html":9}],9:[function(require,module,exports){
module.exports = '<form name="newCardForm" novalidate\n' +
    '  ng-submit="newCardForm.$valid && vm.onSubmit()">\n' +
    '\n' +
    '  <div class="form-group">\n' +
    '    <label for="name" class="control-label">Cardholder name</label>\n' +
    '    <input type="text" name="name" required class="form-control"\n' +
    '      placeholder="Your name as it appears on the card" autocomplete="off"\n' +
    '      ng-model="vm.cardDetails.name" />\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="form-group">\n' +
    '    <label for="card" class="control-label">Card number</label>\n' +
    '    <input type="text" name="number" required class="form-control"\n' +
    '      placeholder="The long number across the front" autocomplete="off"\n' +
    '      ng-model="vm.cardDetails.number"\n' +
    '      payments-validate="card"\n' +
    '      payments-type-model="vm.brand"\n' +
    '      payments-format="card" />\n' +
    '      <tw-payment-card-flipper\n' +
    '        class="tw-new-card-form__payment-card-icon"\n' +
    '        brand="vm.brand"\n' +
    '        is-flipped="vm.isSecurityCodeFocused">\n' +
    '        <div class="tw-new-card-form__security-code-line"\n' +
    '          ng-class="{ \'tw-new-card-form__security-code-line--visible\' :\n' +
    '            vm.isSecurityCodeFocused }">\n' +
    '        </div>\n' +
    '      </tw-payment-card-flipper>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="row">\n' +
    '    <div class="col-xs-6">\n' +
    '      <div class="form-group">\n' +
    '        <label for="expiry" class="control-label">Card expiry date</label>\n' +
    '        <input type="text" name="expiry" required class="form-control"\n' +
    '          placeholder="MM / YY" autocomplete="off"\n' +
    '          ng-model="vm.cardDetails.expiry"\n' +
    '          payments-validate="expiry"\n' +
    '          payments-format="expiry">\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div class="col-xs-6">\n' +
    '      <div class="form-group">\n' +
    '        <label for="securityCode" class="control-label">\n' +
    '          Security code\n' +
    '          <span ng-if="type">\n' +
    '            {{ vm.brand === \'visa\' ? \'(CVV)\' : \'(CVC)\'}}\n' +
    '          </span>\n' +
    '        </label>\n' +
    '        <tw-security-code-input\n' +
    '          ng-model="vm.cardDetails.securityCode"\n' +
    '          focused="vm.isSecurityCodeFocused">\n' +
    '        </tw-security-code-input>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <tw-pay-button\n' +
    '    currency-symbol="vm.currencySymbol"\n' +
    '    amount="vm.amount"\n' +
    '    is-disabled="vm.isProcessing">\n' +
    '  </tw-pay-button>\n' +
    '</form>';
},{}],10:[function(require,module,exports){
(function (global){
'use strict';

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);
require('../common/payment-components.common.module');

var NewCardFormComponent =
  require('./components/new-card-form/new-card-form.component');

var newCardForm = angular.module('tw.paymentComponents.newCardForm', [
  'tw.paymentComponents.common'
]);

newCardForm.directive('twNewCardForm', NewCardFormComponent);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/payment-components.common.module":7,"./components/new-card-form/new-card-form.component":8}],11:[function(require,module,exports){
(function (global){
'use strict';

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

require('./new-card-form/payment-components.new-card-form.module');
require('./saved-cards/payment-components.saved-cards.module');

angular.module('tw.paymentComponents', [
  'tw.paymentComponents.newCardForm',
  'tw.paymentComponents.savedCards'
]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./new-card-form/payment-components.new-card-form.module":10,"./saved-cards/payment-components.saved-cards.module":16}],12:[function(require,module,exports){
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
},{"./saved-card.html":13}],13:[function(require,module,exports){
module.exports = '<div class="tw-saved-card"\n' +
    '  ng-class="{ \'is-selected\' : vm.isSelected() }"\n' +
    '  ng-click="vm.selectCard()">\n' +
    '\n' +
    '  <small>\n' +
    '    <a href="" class="animate-opacity pull-right m-t"\n' +
    '      ng-if="!vm.isSelected()">\n' +
    '      Select card\n' +
    '    </a>\n' +
    '  </small>\n' +
    '\n' +
    '  <tw-payment-card-flipper\n' +
    '    class="tw-saved-card__payment-card-icon"\n' +
    '    brand="vm.brand"\n' +
    '    is-flipped="vm.isSecurityCodeFocused">\n' +
    '    <div class="tw-saved-card__security-code-line"\n' +
    '      ng-class="{ \'tw-saved-card__security-code-line--visible\' :\n' +
    '        vm.isSecurityCodeFocused }">\n' +
    '    </div>\n' +
    '  </tw-payment-card-flipper>\n' +
    '\n' +
    '  <span class="text-capitalize tw-saved-card__brand-type">\n' +
    '    {{ ::vm.brand }} {{ ::vm.type | lowercase }}\n' +
    '  </span>\n' +
    '  <small class="tw-saved-card__number">Ending in {{ ::vm.number }}</small>\n' +
    '\n' +
    '  <form name="savedCardPaymentForm" novalidate\n' +
    '    class="animate-opacity"\n' +
    '    ng-if="vm.isSelected()"\n' +
    '    ng-submit="savedCardPaymentForm.$valid && vm.onSubmit()">\n' +
    '\n' +
    '    <div class="row">\n' +
    '      <div class="col-sm-8 col-md-6">\n' +
    '        <div class="form-group m-b m-t-md">\n' +
    '          <label class="tw-saved-card__security-code-label\n' +
    '            control-label">\n' +
    '            Please re-enter your\n' +
    '            <span ng-if="vm.brand">\n' +
    '              {{ vm.brand === \'visa\' ? \'CVV\' : \'CVC\' }}\n' +
    '            </span>\n' +
    '          </label>\n' +
    '          <tw-security-code-input\n' +
    '            ng-model="vm.selected.securityCode"\n' +
    '            focused="vm.isSecurityCodeFocused">\n' +
    '          </tw-security-code-input>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <tw-pay-button\n' +
    '      currency-symbol="vm.currencySymbol"\n' +
    '      amount="vm.amount"\n' +
    '      is-disabled="vm.isProcessing">\n' +
    '    </tw-pay-button>\n' +
    '  </form>\n' +
    '</div>';
},{}],14:[function(require,module,exports){
'use strict';

var template = require('./saved-cards.html');

module.exports = function SavedCardsComponent() {
  var directive = {
    bindToController: true,
    controller: SavedCardsController,
    controllerAs: 'vm',
    restrict: 'E',
    scope: {
      cards: '=',
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

function SavedCardsController() {
  var vm = this;

  vm.getBrandFromVariant = getBrandFromVariant;

  function getBrandFromVariant(variant) {
    variant = variant.toLowerCase();

    if (variant.indexOf('visa') > -1) {
      return 'visa';
    } else if (variant.indexOf('mc') > -1) {
      return 'mastercard';
    } else if (variant.indexOf('bij') > -1 || variant.indexOf('maestro') > -1) {
      return 'maestro';
    } else {
      return variant;
    }
  }
}
},{"./saved-cards.html":15}],15:[function(require,module,exports){
module.exports = '<tw-saved-card\n' +
    '  ng-repeat="card in vm.cards track by card.adyenRecurringDetailReference"\n' +
    '  brand="vm.getBrandFromVariant(card.adyenVariant)"\n' +
    '  type="card.cardType"\n' +
    '  number="card.cardNumber"\n' +
    '  reference="card.adyenRecurringDetailReference"\n' +
    '  selected="vm.selected"\n' +
    '  currency-symbol="vm.currencySymbol"\n' +
    '  amount="vm.amount"\n' +
    '  on-submit="vm.onSubmit()"\n' +
    '  is-processing="vm.isProcessing">\n' +
    '</tw-saved-card>';
},{}],16:[function(require,module,exports){
(function (global){
'use strict';

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);
require('../common/payment-components.common.module');

var SavedCardComponent =
  require('./components/saved-card/saved-card.component');
var SavedCardsComponent =
  require('./components/saved-cards/saved-cards.component');

var savedCards = angular.module('tw.paymentComponents.savedCards', [
  'tw.paymentComponents.common'
]);

savedCards.directive('twSavedCard', SavedCardComponent);
savedCards.directive('twSavedCards', SavedCardsComponent);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/payment-components.common.module":7,"./components/saved-card/saved-card.component":12,"./components/saved-cards/saved-cards.component":14}]},{},[11]);
