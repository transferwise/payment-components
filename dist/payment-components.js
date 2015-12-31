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

},{"../common/payment-components.common.module":7,"./components/saved-card/saved-card.component":12,"./components/saved-cards/saved-cards.component":14}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tbW9uL2NvbXBvbmVudHMvcGF5LWJ1dHRvbi9wYXktYnV0dG9uLmNvbXBvbmVudC5qcyIsInNyYy9jb21tb24vY29tcG9uZW50cy9wYXktYnV0dG9uL3BheS1idXR0b24uaHRtbCIsInNyYy9jb21tb24vY29tcG9uZW50cy9wYXltZW50LWNhcmQtZmxpcHBlci9wYXltZW50LWNhcmQtZmxpcHBlci5jb21wb25lbnQuanMiLCJzcmMvY29tbW9uL2NvbXBvbmVudHMvcGF5bWVudC1jYXJkLWZsaXBwZXIvcGF5bWVudC1jYXJkLWZsaXBwZXIuaHRtbCIsInNyYy9jb21tb24vY29tcG9uZW50cy9zZWN1cml0eS1jb2RlLWlucHV0L3NlY3VyaXR5LWNvZGUtaW5wdXQuY29tcG9uZW50LmpzIiwic3JjL2NvbW1vbi9jb21wb25lbnRzL3NlY3VyaXR5LWNvZGUtaW5wdXQvc2VjdXJpdHktY29kZS1pbnB1dC5odG1sIiwic3JjL2NvbW1vbi9wYXltZW50LWNvbXBvbmVudHMuY29tbW9uLm1vZHVsZS5qcyIsInNyYy9uZXctY2FyZC1mb3JtL2NvbXBvbmVudHMvbmV3LWNhcmQtZm9ybS9uZXctY2FyZC1mb3JtLmNvbXBvbmVudC5qcyIsInNyYy9uZXctY2FyZC1mb3JtL2NvbXBvbmVudHMvbmV3LWNhcmQtZm9ybS9uZXctY2FyZC1mb3JtLmh0bWwiLCJzcmMvbmV3LWNhcmQtZm9ybS9wYXltZW50LWNvbXBvbmVudHMubmV3LWNhcmQtZm9ybS5tb2R1bGUuanMiLCJzcmMvcGF5bWVudC1jb21wb25lbnRzLm1vZHVsZS5qcyIsInNyYy9zYXZlZC1jYXJkcy9jb21wb25lbnRzL3NhdmVkLWNhcmQvc2F2ZWQtY2FyZC5jb21wb25lbnQuanMiLCJzcmMvc2F2ZWQtY2FyZHMvY29tcG9uZW50cy9zYXZlZC1jYXJkL3NhdmVkLWNhcmQuaHRtbCIsInNyYy9zYXZlZC1jYXJkcy9jb21wb25lbnRzL3NhdmVkLWNhcmRzL3NhdmVkLWNhcmRzLmNvbXBvbmVudC5qcyIsInNyYy9zYXZlZC1jYXJkcy9jb21wb25lbnRzL3NhdmVkLWNhcmRzL3NhdmVkLWNhcmRzLmh0bWwiLCJzcmMvc2F2ZWQtY2FyZHMvcGF5bWVudC1jb21wb25lbnRzLnNhdmVkLWNhcmRzLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vcGF5LWJ1dHRvbi5odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUGF5QnV0dG9uQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7fSxcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBjdXJyZW5jeVN5bWJvbDogJz0nLFxuICAgICAgYW1vdW50OiAnPScsXG4gICAgICBpc0Rpc2FibGVkOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gJzxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayBtLXQtbWQgbS1iLW1kXCJcXG4nICtcbiAgICAnICBuZy1kaXNhYmxlZD1cInZtLmlzRGlzYWJsZWRcIj5cXG4nICtcbiAgICAnICA8c3BhbiBuZy1pZj1cIiF2bS5pc0Rpc2FibGVkXCI+XFxuJyArXG4gICAgJyAgICBQYXkge3sgOjp2bS5jdXJyZW5jeVN5bWJvbCB9fXt7IDo6dm0uYW1vdW50IHwgbnVtYmVyOjIgfX1cXG4nICtcbiAgICAnICA8L3NwYW4+XFxuJyArXG4gICAgJyAgPHNwYW4gbmctaWY9XCJ2bS5pc0Rpc2FibGVkXCI+XFxuJyArXG4gICAgJyAgICBQcm9jZXNzaW5nIHRoZSBwYXltZW50Li4uXFxuJyArXG4gICAgJyAgPC9zcGFuPlxcbicgK1xuICAgICc8L2J1dHRvbj4nOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9wYXltZW50LWNhcmQtZmxpcHBlci5odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUGF5bWVudENhcmRGbGlwcGVyQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7fSxcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBicmFuZDogJz0nLFxuICAgICAgaXNGbGlwcGVkOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICB0cmFuc2NsdWRlOiB0cnVlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAnPGRpdiBjbGFzcz1cInBheW1lbnQtY2FyZC1mbGlwcGVyXCJcXG4nICtcbiAgICAnICBuZy1jbGFzcz1cIntcXCdwYXltZW50LWNhcmQtZmxpcHBlci0tZmxpcHBlZFxcJyA6IHZtLmlzRmxpcHBlZH1cIj5cXG4nICtcbiAgICAnICA8ZGl2IGNsYXNzPVwicGF5bWVudC1jYXJkLWZsaXBwZXJfX3dyYXBwZXJcIj5cXG4nICtcbiAgICAnICAgIDxkaXYgY2xhc3M9XCJwYXltZW50LWNhcmQtZmxpcHBlcl9fZnJvbnQgcGF5bWVudC1jYXJkLWljb25cIlxcbicgK1xuICAgICcgICAgICBuZy1jbGFzcz1cIlxcJ3BheW1lbnQtY2FyZC1pY29uLS1cXCcgKyB2bS5icmFuZFwiPjwvZGl2PlxcbicgK1xuICAgICcgICAgPGRpdiBjbGFzcz1cInBheW1lbnQtY2FyZC1mbGlwcGVyX19iYWNrIHBheW1lbnQtY2FyZC1pY29uIHBheW1lbnQtY2FyZC1pY29uLS1iYWNrXCI+PC9kaXY+XFxuJyArXG4gICAgJyAgPC9kaXY+XFxuJyArXG4gICAgJyAgPG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPlxcbicgK1xuICAgICc8L2Rpdj4nOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9zZWN1cml0eS1jb2RlLWlucHV0Lmh0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTZWN1cml0eUNvZGVJbnB1dENvbXBvbmVudCgpIHtcbiAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge30sXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgZm9jdXNlZDogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2VjdXJpdHlDb2RlXCIgcmVxdWlyZWRcXG4nICtcbiAgICAnICBjbGFzcz1cImZvcm0tY29udHJvbFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiXFxuJyArXG4gICAgJyAgcGxhY2Vob2xkZXI9XCIzIGRpZ2l0cyBvbiB0aGUgYmFja1wiXFxuJyArXG4gICAgJyAgbWF4bGVuZ3RoPVwiM1wiIG5nLW1heGxlbmd0aD1cIjNcIlxcbicgK1xuICAgICcgIG5nLWZvY3VzPVwidm0uZm9jdXNlZCA9IHRydWVcIlxcbicgK1xuICAgICcgIG5nLWJsdXI9XCJ2bS5mb2N1c2VkID0gZmFsc2VcIlxcbicgK1xuICAgICcgIHBheW1lbnRzLXZhbGlkYXRlPVwiY3ZjXCIgcGF5bWVudHMtZm9ybWF0PVwiY3ZjXCIgLz4nOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snYW5ndWxhciddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnYW5ndWxhciddIDogbnVsbCk7XG52YXIgU2VjdXJpdHlDb2RlSW5wdXRDb21wb25lbnQgPVxuICByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2VjdXJpdHktY29kZS1pbnB1dC9zZWN1cml0eS1jb2RlLWlucHV0LmNvbXBvbmVudCcpO1xudmFyIFBheW1lbnRDYXJkRmxpcHBlckNvbXBvbmVudCA9XG4gIHJlcXVpcmUoJy4vY29tcG9uZW50cy9wYXltZW50LWNhcmQtZmxpcHBlci9wYXltZW50LWNhcmQtZmxpcHBlci5jb21wb25lbnQnKTtcbnZhciBQYXlCdXR0b25Db21wb25lbnQgPVxuICByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGF5LWJ1dHRvbi9wYXktYnV0dG9uLmNvbXBvbmVudCcpO1xuXG52YXIgY29tbW9uID0gYW5ndWxhci5tb2R1bGUoJ3R3LnBheW1lbnRDb21wb25lbnRzLmNvbW1vbicsIFtcbiAgJ25nQW5pbWF0ZScsXG4gICdhbmd1bGFyUGF5bWVudHMnLFxuICAndHcuc3R5bGVndWlkZS1jb21wb25lbnRzJ1xuXSk7XG5cbmNvbW1vbi5kaXJlY3RpdmUoJ3R3U2VjdXJpdHlDb2RlSW5wdXQnLCBTZWN1cml0eUNvZGVJbnB1dENvbXBvbmVudCk7XG5jb21tb24uZGlyZWN0aXZlKCd0d1BheW1lbnRDYXJkRmxpcHBlcicsIFBheW1lbnRDYXJkRmxpcHBlckNvbXBvbmVudCk7XG5jb21tb24uZGlyZWN0aXZlKCd0d1BheUJ1dHRvbicsIFBheUJ1dHRvbkNvbXBvbmVudCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL25ldy1jYXJkLWZvcm0uaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE5ld0NhcmRGb3JtQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7fSxcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBjYXJkRGV0YWlsczogJz0nLFxuICAgICAgY3VycmVuY3lTeW1ib2w6ICc9JyxcbiAgICAgIGFtb3VudDogJz0nLFxuICAgICAgb25TdWJtaXQ6ICcmJyxcbiAgICAgIGlzUHJvY2Vzc2luZzogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8Zm9ybSBuYW1lPVwibmV3Q2FyZEZvcm1cIiBub3ZhbGlkYXRlXFxuJyArXG4gICAgJyAgbmctc3VibWl0PVwibmV3Q2FyZEZvcm0uJHZhbGlkICYmIHZtLm9uU3VibWl0KClcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgIDxsYWJlbCBmb3I9XCJuYW1lXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+Q2FyZGhvbGRlciBuYW1lPC9sYWJlbD5cXG4nICtcbiAgICAnICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxcbicgK1xuICAgICcgICAgICBwbGFjZWhvbGRlcj1cIllvdXIgbmFtZSBhcyBpdCBhcHBlYXJzIG9uIHRoZSBjYXJkXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCJcXG4nICtcbiAgICAnICAgICAgbmctbW9kZWw9XCJ2bS5jYXJkRGV0YWlscy5uYW1lXCIgLz5cXG4nICtcbiAgICAnICA8L2Rpdj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgIDxsYWJlbCBmb3I9XCJjYXJkXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+Q2FyZCBudW1iZXI8L2xhYmVsPlxcbicgK1xuICAgICcgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm51bWJlclwiIHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcXG4nICtcbiAgICAnICAgICAgcGxhY2Vob2xkZXI9XCJUaGUgbG9uZyBudW1iZXIgYWNyb3NzIHRoZSBmcm9udFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiXFxuJyArXG4gICAgJyAgICAgIG5nLW1vZGVsPVwidm0uY2FyZERldGFpbHMubnVtYmVyXCJcXG4nICtcbiAgICAnICAgICAgcGF5bWVudHMtdmFsaWRhdGU9XCJjYXJkXCJcXG4nICtcbiAgICAnICAgICAgcGF5bWVudHMtdHlwZS1tb2RlbD1cInZtLmJyYW5kXCJcXG4nICtcbiAgICAnICAgICAgcGF5bWVudHMtZm9ybWF0PVwiY2FyZFwiIC8+XFxuJyArXG4gICAgJyAgICAgIDx0dy1wYXltZW50LWNhcmQtZmxpcHBlclxcbicgK1xuICAgICcgICAgICAgIGNsYXNzPVwidHctbmV3LWNhcmQtZm9ybV9fcGF5bWVudC1jYXJkLWljb25cIlxcbicgK1xuICAgICcgICAgICAgIGJyYW5kPVwidm0uYnJhbmRcIlxcbicgK1xuICAgICcgICAgICAgIGlzLWZsaXBwZWQ9XCJ2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWRcIj5cXG4nICtcbiAgICAnICAgICAgICA8ZGl2IGNsYXNzPVwidHctbmV3LWNhcmQtZm9ybV9fc2VjdXJpdHktY29kZS1saW5lXCJcXG4nICtcbiAgICAnICAgICAgICAgIG5nLWNsYXNzPVwieyBcXCd0dy1uZXctY2FyZC1mb3JtX19zZWN1cml0eS1jb2RlLWxpbmUtLXZpc2libGVcXCcgOlxcbicgK1xuICAgICcgICAgICAgICAgICB2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWQgfVwiPlxcbicgK1xuICAgICcgICAgICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgICA8L3R3LXBheW1lbnQtY2FyZC1mbGlwcGVyPlxcbicgK1xuICAgICcgIDwvZGl2PlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTZcIj5cXG4nICtcbiAgICAnICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgICAgICA8bGFiZWwgZm9yPVwiZXhwaXJ5XCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+Q2FyZCBleHBpcnkgZGF0ZTwvbGFiZWw+XFxuJyArXG4gICAgJyAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImV4cGlyeVwiIHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcXG4nICtcbiAgICAnICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTU0gLyBZWVwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiXFxuJyArXG4gICAgJyAgICAgICAgICBuZy1tb2RlbD1cInZtLmNhcmREZXRhaWxzLmV4cGlyeVwiXFxuJyArXG4gICAgJyAgICAgICAgICBwYXltZW50cy12YWxpZGF0ZT1cImV4cGlyeVwiXFxuJyArXG4gICAgJyAgICAgICAgICBwYXltZW50cy1mb3JtYXQ9XCJleHBpcnlcIj5cXG4nICtcbiAgICAnICAgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtNlwiPlxcbicgK1xuICAgICcgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbicgK1xuICAgICcgICAgICAgIDxsYWJlbCBmb3I9XCJzZWN1cml0eUNvZGVcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj5cXG4nICtcbiAgICAnICAgICAgICAgIFNlY3VyaXR5IGNvZGVcXG4nICtcbiAgICAnICAgICAgICAgIDxzcGFuIG5nLWlmPVwidHlwZVwiPlxcbicgK1xuICAgICcgICAgICAgICAgICB7eyB2bS5icmFuZCA9PT0gXFwndmlzYVxcJyA/IFxcJyhDVlYpXFwnIDogXFwnKENWQylcXCd9fVxcbicgK1xuICAgICcgICAgICAgICAgPC9zcGFuPlxcbicgK1xuICAgICcgICAgICAgIDwvbGFiZWw+XFxuJyArXG4gICAgJyAgICAgICAgPHR3LXNlY3VyaXR5LWNvZGUtaW5wdXRcXG4nICtcbiAgICAnICAgICAgICAgIG5nLW1vZGVsPVwidm0uY2FyZERldGFpbHMuc2VjdXJpdHlDb2RlXCJcXG4nICtcbiAgICAnICAgICAgICAgIGZvY3VzZWQ9XCJ2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWRcIj5cXG4nICtcbiAgICAnICAgICAgICA8L3R3LXNlY3VyaXR5LWNvZGUtaW5wdXQ+XFxuJyArXG4gICAgJyAgICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgPC9kaXY+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgIDx0dy1wYXktYnV0dG9uXFxuJyArXG4gICAgJyAgICBjdXJyZW5jeS1zeW1ib2w9XCJ2bS5jdXJyZW5jeVN5bWJvbFwiXFxuJyArXG4gICAgJyAgICBhbW91bnQ9XCJ2bS5hbW91bnRcIlxcbicgK1xuICAgICcgICAgaXMtZGlzYWJsZWQ9XCJ2bS5pc1Byb2Nlc3NpbmdcIj5cXG4nICtcbiAgICAnICA8L3R3LXBheS1idXR0b24+XFxuJyArXG4gICAgJzwvZm9ybT4nOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snYW5ndWxhciddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnYW5ndWxhciddIDogbnVsbCk7XG5yZXF1aXJlKCcuLi9jb21tb24vcGF5bWVudC1jb21wb25lbnRzLmNvbW1vbi5tb2R1bGUnKTtcblxudmFyIE5ld0NhcmRGb3JtQ29tcG9uZW50ID1cbiAgcmVxdWlyZSgnLi9jb21wb25lbnRzL25ldy1jYXJkLWZvcm0vbmV3LWNhcmQtZm9ybS5jb21wb25lbnQnKTtcblxudmFyIG5ld0NhcmRGb3JtID0gYW5ndWxhci5tb2R1bGUoJ3R3LnBheW1lbnRDb21wb25lbnRzLm5ld0NhcmRGb3JtJywgW1xuICAndHcucGF5bWVudENvbXBvbmVudHMuY29tbW9uJ1xuXSk7XG5cbm5ld0NhcmRGb3JtLmRpcmVjdGl2ZSgndHdOZXdDYXJkRm9ybScsIE5ld0NhcmRGb3JtQ29tcG9uZW50KTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbmd1bGFyID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2FuZ3VsYXInXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2FuZ3VsYXInXSA6IG51bGwpO1xuXG5yZXF1aXJlKCcuL25ldy1jYXJkLWZvcm0vcGF5bWVudC1jb21wb25lbnRzLm5ldy1jYXJkLWZvcm0ubW9kdWxlJyk7XG5yZXF1aXJlKCcuL3NhdmVkLWNhcmRzL3BheW1lbnQtY29tcG9uZW50cy5zYXZlZC1jYXJkcy5tb2R1bGUnKTtcblxuYW5ndWxhci5tb2R1bGUoJ3R3LnBheW1lbnRDb21wb25lbnRzJywgW1xuICAndHcucGF5bWVudENvbXBvbmVudHMubmV3Q2FyZEZvcm0nLFxuICAndHcucGF5bWVudENvbXBvbmVudHMuc2F2ZWRDYXJkcydcbl0pOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9zYXZlZC1jYXJkLmh0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTYXZlZENhcmRDb21wb25lbnQoKSB7XG4gIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiBTYXZlZENhcmRDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGJyYW5kOiAnPScsXG4gICAgICB0eXBlOiAnPScsXG4gICAgICBudW1iZXI6ICc9JyxcbiAgICAgIHJlZmVyZW5jZTogJz0nLFxuICAgICAgc2VsZWN0ZWQ6ICc9JyxcbiAgICAgIGN1cnJlbmN5U3ltYm9sOiAnPScsXG4gICAgICBhbW91bnQ6ICc9JyxcbiAgICAgIG9uU3VibWl0OiAnJicsXG4gICAgICBpc1Byb2Nlc3Npbmc6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn07XG5cbmZ1bmN0aW9uIFNhdmVkQ2FyZENvbnRyb2xsZXIoJGVsZW1lbnQsICR0aW1lb3V0KSB7XG4gIHZhciB2bSA9IHRoaXM7XG5cbiAgdm0uaXNTZWxlY3RlZCA9IGlzU2VsZWN0ZWQ7XG4gIHZtLnNlbGVjdENhcmQgPSBzZWxlY3RDYXJkO1xuXG4gIGZ1bmN0aW9uIHNlbGVjdENhcmQoKSB7XG4gICAgaWYgKCFpc1NlbGVjdGVkKCkpIHtcbiAgICAgIHZtLnNlbGVjdGVkID0ge3JlZmVyZW5jZTogdm0ucmVmZXJlbmNlfTtcblxuICAgICAgJHRpbWVvdXQoZm9jdXNTZWN1cml0eUNvZGVJbnB1dCwgMzAwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1NlbGVjdGVkKCkge1xuICAgIGlmICghdm0uc2VsZWN0ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHZtLnNlbGVjdGVkLnJlZmVyZW5jZSA9PT0gdm0ucmVmZXJlbmNlO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9jdXNTZWN1cml0eUNvZGVJbnB1dCgpIHtcbiAgICAkZWxlbWVudC5maW5kKCdpbnB1dCcpWzBdLmZvY3VzKCk7XG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwidHctc2F2ZWQtY2FyZFwiXFxuJyArXG4gICAgJyAgbmctY2xhc3M9XCJ7IFxcJ2lzLXNlbGVjdGVkXFwnIDogdm0uaXNTZWxlY3RlZCgpIH1cIlxcbicgK1xuICAgICcgIG5nLWNsaWNrPVwidm0uc2VsZWN0Q2FyZCgpXCI+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgIDxzbWFsbD5cXG4nICtcbiAgICAnICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cImFuaW1hdGUtb3BhY2l0eSBwdWxsLXJpZ2h0IG0tdFwiXFxuJyArXG4gICAgJyAgICAgIG5nLWlmPVwiIXZtLmlzU2VsZWN0ZWQoKVwiPlxcbicgK1xuICAgICcgICAgICBTZWxlY3QgY2FyZFxcbicgK1xuICAgICcgICAgPC9hPlxcbicgK1xuICAgICcgIDwvc21hbGw+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgIDx0dy1wYXltZW50LWNhcmQtZmxpcHBlclxcbicgK1xuICAgICcgICAgY2xhc3M9XCJ0dy1zYXZlZC1jYXJkX19wYXltZW50LWNhcmQtaWNvblwiXFxuJyArXG4gICAgJyAgICBicmFuZD1cInZtLmJyYW5kXCJcXG4nICtcbiAgICAnICAgIGlzLWZsaXBwZWQ9XCJ2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWRcIj5cXG4nICtcbiAgICAnICAgIDxkaXYgY2xhc3M9XCJ0dy1zYXZlZC1jYXJkX19zZWN1cml0eS1jb2RlLWxpbmVcIlxcbicgK1xuICAgICcgICAgICBuZy1jbGFzcz1cInsgXFwndHctc2F2ZWQtY2FyZF9fc2VjdXJpdHktY29kZS1saW5lLS12aXNpYmxlXFwnIDpcXG4nICtcbiAgICAnICAgICAgICB2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWQgfVwiPlxcbicgK1xuICAgICcgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgPC90dy1wYXltZW50LWNhcmQtZmxpcHBlcj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWNhcGl0YWxpemUgdHctc2F2ZWQtY2FyZF9fYnJhbmQtdHlwZVwiPlxcbicgK1xuICAgICcgICAge3sgOjp2bS5icmFuZCB9fSB7eyA6OnZtLnR5cGUgfCBsb3dlcmNhc2UgfX1cXG4nICtcbiAgICAnICA8L3NwYW4+XFxuJyArXG4gICAgJyAgPHNtYWxsIGNsYXNzPVwidHctc2F2ZWQtY2FyZF9fbnVtYmVyXCI+RW5kaW5nIGluIHt7IDo6dm0ubnVtYmVyIH19PC9zbWFsbD5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGZvcm0gbmFtZT1cInNhdmVkQ2FyZFBheW1lbnRGb3JtXCIgbm92YWxpZGF0ZVxcbicgK1xuICAgICcgICAgY2xhc3M9XCJhbmltYXRlLW9wYWNpdHlcIlxcbicgK1xuICAgICcgICAgbmctaWY9XCJ2bS5pc1NlbGVjdGVkKClcIlxcbicgK1xuICAgICcgICAgbmctc3VibWl0PVwic2F2ZWRDYXJkUGF5bWVudEZvcm0uJHZhbGlkICYmIHZtLm9uU3VibWl0KClcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuJyArXG4gICAgJyAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOCBjb2wtbWQtNlwiPlxcbicgK1xuICAgICcgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG0tYiBtLXQtbWRcIj5cXG4nICtcbiAgICAnICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInR3LXNhdmVkLWNhcmRfX3NlY3VyaXR5LWNvZGUtbGFiZWxcXG4nICtcbiAgICAnICAgICAgICAgICAgY29udHJvbC1sYWJlbFwiPlxcbicgK1xuICAgICcgICAgICAgICAgICBQbGVhc2UgcmUtZW50ZXIgeW91clxcbicgK1xuICAgICcgICAgICAgICAgICA8c3BhbiBuZy1pZj1cInZtLmJyYW5kXCI+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAge3sgdm0uYnJhbmQgPT09IFxcJ3Zpc2FcXCcgPyBcXCdDVlZcXCcgOiBcXCdDVkNcXCcgfX1cXG4nICtcbiAgICAnICAgICAgICAgICAgPC9zcGFuPlxcbicgK1xuICAgICcgICAgICAgICAgPC9sYWJlbD5cXG4nICtcbiAgICAnICAgICAgICAgIDx0dy1zZWN1cml0eS1jb2RlLWlucHV0XFxuJyArXG4gICAgJyAgICAgICAgICAgIG5nLW1vZGVsPVwidm0uc2VsZWN0ZWQuc2VjdXJpdHlDb2RlXCJcXG4nICtcbiAgICAnICAgICAgICAgICAgZm9jdXNlZD1cInZtLmlzU2VjdXJpdHlDb2RlRm9jdXNlZFwiPlxcbicgK1xuICAgICcgICAgICAgICAgPC90dy1zZWN1cml0eS1jb2RlLWlucHV0PlxcbicgK1xuICAgICcgICAgICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgIDwvZGl2PlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICAgIDx0dy1wYXktYnV0dG9uXFxuJyArXG4gICAgJyAgICAgIGN1cnJlbmN5LXN5bWJvbD1cInZtLmN1cnJlbmN5U3ltYm9sXCJcXG4nICtcbiAgICAnICAgICAgYW1vdW50PVwidm0uYW1vdW50XCJcXG4nICtcbiAgICAnICAgICAgaXMtZGlzYWJsZWQ9XCJ2bS5pc1Byb2Nlc3NpbmdcIj5cXG4nICtcbiAgICAnICAgIDwvdHctcGF5LWJ1dHRvbj5cXG4nICtcbiAgICAnICA8L2Zvcm0+XFxuJyArXG4gICAgJzwvZGl2Pic7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3NhdmVkLWNhcmRzLmh0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTYXZlZENhcmRzQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogU2F2ZWRDYXJkc0NvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGNhcmRzOiAnPScsXG4gICAgICBzZWxlY3RlZDogJz0nLFxuICAgICAgY3VycmVuY3lTeW1ib2w6ICc9JyxcbiAgICAgIGFtb3VudDogJz0nLFxuICAgICAgb25TdWJtaXQ6ICcmJyxcbiAgICAgIGlzUHJvY2Vzc2luZzogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTtcblxuZnVuY3Rpb24gU2F2ZWRDYXJkc0NvbnRyb2xsZXIoKSB7XG4gIHZhciB2bSA9IHRoaXM7XG5cbiAgdm0uZ2V0QnJhbmRGcm9tVmFyaWFudCA9IGdldEJyYW5kRnJvbVZhcmlhbnQ7XG5cbiAgZnVuY3Rpb24gZ2V0QnJhbmRGcm9tVmFyaWFudCh2YXJpYW50KSB7XG4gICAgdmFyaWFudCA9IHZhcmlhbnQudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmICh2YXJpYW50LmluZGV4T2YoJ3Zpc2EnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gJ3Zpc2EnO1xuICAgIH0gZWxzZSBpZiAodmFyaWFudC5pbmRleE9mKCdtYycpID4gLTEpIHtcbiAgICAgIHJldHVybiAnbWFzdGVyY2FyZCc7XG4gICAgfSBlbHNlIGlmICh2YXJpYW50LmluZGV4T2YoJ2JpaicpID4gLTEgfHzCoHZhcmlhbnQuaW5kZXhPZignbWFlc3RybycpID4gLTEpIHtcbiAgICAgIHJldHVybiAnbWFlc3Rybyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YXJpYW50O1xuICAgIH1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gJzx0dy1zYXZlZC1jYXJkXFxuJyArXG4gICAgJyAgbmctcmVwZWF0PVwiY2FyZCBpbiB2bS5jYXJkcyB0cmFjayBieSBjYXJkLmFkeWVuUmVjdXJyaW5nRGV0YWlsUmVmZXJlbmNlXCJcXG4nICtcbiAgICAnICBicmFuZD1cInZtLmdldEJyYW5kRnJvbVZhcmlhbnQoY2FyZC5hZHllblZhcmlhbnQpXCJcXG4nICtcbiAgICAnICB0eXBlPVwiY2FyZC5jYXJkVHlwZVwiXFxuJyArXG4gICAgJyAgbnVtYmVyPVwiY2FyZC5jYXJkTnVtYmVyXCJcXG4nICtcbiAgICAnICByZWZlcmVuY2U9XCJjYXJkLmFkeWVuUmVjdXJyaW5nRGV0YWlsUmVmZXJlbmNlXCJcXG4nICtcbiAgICAnICBzZWxlY3RlZD1cInZtLnNlbGVjdGVkXCJcXG4nICtcbiAgICAnICBjdXJyZW5jeS1zeW1ib2w9XCJ2bS5jdXJyZW5jeVN5bWJvbFwiXFxuJyArXG4gICAgJyAgYW1vdW50PVwidm0uYW1vdW50XCJcXG4nICtcbiAgICAnICBvbi1zdWJtaXQ9XCJ2bS5vblN1Ym1pdCgpXCJcXG4nICtcbiAgICAnICBpcy1wcm9jZXNzaW5nPVwidm0uaXNQcm9jZXNzaW5nXCI+XFxuJyArXG4gICAgJzwvdHctc2F2ZWQtY2FyZD4nOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snYW5ndWxhciddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnYW5ndWxhciddIDogbnVsbCk7XG5yZXF1aXJlKCcuLi9jb21tb24vcGF5bWVudC1jb21wb25lbnRzLmNvbW1vbi5tb2R1bGUnKTtcblxudmFyIFNhdmVkQ2FyZENvbXBvbmVudCA9XG4gIHJlcXVpcmUoJy4vY29tcG9uZW50cy9zYXZlZC1jYXJkL3NhdmVkLWNhcmQuY29tcG9uZW50Jyk7XG52YXIgU2F2ZWRDYXJkc0NvbXBvbmVudCA9XG4gIHJlcXVpcmUoJy4vY29tcG9uZW50cy9zYXZlZC1jYXJkcy9zYXZlZC1jYXJkcy5jb21wb25lbnQnKTtcblxudmFyIHNhdmVkQ2FyZHMgPSBhbmd1bGFyLm1vZHVsZSgndHcucGF5bWVudENvbXBvbmVudHMuc2F2ZWRDYXJkcycsIFtcbiAgJ3R3LnBheW1lbnRDb21wb25lbnRzLmNvbW1vbidcbl0pO1xuXG5zYXZlZENhcmRzLmRpcmVjdGl2ZSgndHdTYXZlZENhcmQnLCBTYXZlZENhcmRDb21wb25lbnQpO1xuc2F2ZWRDYXJkcy5kaXJlY3RpdmUoJ3R3U2F2ZWRDYXJkcycsIFNhdmVkQ2FyZHNDb21wb25lbnQpOyJdfQ==
