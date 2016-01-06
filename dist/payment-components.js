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
    '  tw-validation\n' +
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
    '      tw-validation\n' +
    '      ng-model="vm.cardDetails.name" />\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="form-group">\n' +
    '    <label for="card" class="control-label">Card number</label>\n' +
    '    <input type="text" name="number" required class="form-control"\n' +
    '      placeholder="The long number across the front" autocomplete="off"\n' +
    '      ng-model="vm.cardDetails.number"\n' +
    '      tw-validation\n' +
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
    '          tw-validation\n' +
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tbW9uL2NvbXBvbmVudHMvcGF5LWJ1dHRvbi9wYXktYnV0dG9uLmNvbXBvbmVudC5qcyIsInNyYy9jb21tb24vY29tcG9uZW50cy9wYXktYnV0dG9uL3BheS1idXR0b24uaHRtbCIsInNyYy9jb21tb24vY29tcG9uZW50cy9wYXltZW50LWNhcmQtZmxpcHBlci9wYXltZW50LWNhcmQtZmxpcHBlci5jb21wb25lbnQuanMiLCJzcmMvY29tbW9uL2NvbXBvbmVudHMvcGF5bWVudC1jYXJkLWZsaXBwZXIvcGF5bWVudC1jYXJkLWZsaXBwZXIuaHRtbCIsInNyYy9jb21tb24vY29tcG9uZW50cy9zZWN1cml0eS1jb2RlLWlucHV0L3NlY3VyaXR5LWNvZGUtaW5wdXQuY29tcG9uZW50LmpzIiwic3JjL2NvbW1vbi9jb21wb25lbnRzL3NlY3VyaXR5LWNvZGUtaW5wdXQvc2VjdXJpdHktY29kZS1pbnB1dC5odG1sIiwic3JjL2NvbW1vbi9wYXltZW50LWNvbXBvbmVudHMuY29tbW9uLm1vZHVsZS5qcyIsInNyYy9uZXctY2FyZC1mb3JtL2NvbXBvbmVudHMvbmV3LWNhcmQtZm9ybS9uZXctY2FyZC1mb3JtLmNvbXBvbmVudC5qcyIsInNyYy9uZXctY2FyZC1mb3JtL2NvbXBvbmVudHMvbmV3LWNhcmQtZm9ybS9uZXctY2FyZC1mb3JtLmh0bWwiLCJzcmMvbmV3LWNhcmQtZm9ybS9wYXltZW50LWNvbXBvbmVudHMubmV3LWNhcmQtZm9ybS5tb2R1bGUuanMiLCJzcmMvcGF5bWVudC1jb21wb25lbnRzLm1vZHVsZS5qcyIsInNyYy9zYXZlZC1jYXJkcy9jb21wb25lbnRzL3NhdmVkLWNhcmQvc2F2ZWQtY2FyZC5jb21wb25lbnQuanMiLCJzcmMvc2F2ZWQtY2FyZHMvY29tcG9uZW50cy9zYXZlZC1jYXJkL3NhdmVkLWNhcmQuaHRtbCIsInNyYy9zYXZlZC1jYXJkcy9jb21wb25lbnRzL3NhdmVkLWNhcmRzL3NhdmVkLWNhcmRzLmNvbXBvbmVudC5qcyIsInNyYy9zYXZlZC1jYXJkcy9jb21wb25lbnRzL3NhdmVkLWNhcmRzL3NhdmVkLWNhcmRzLmh0bWwiLCJzcmMvc2F2ZWQtY2FyZHMvcGF5bWVudC1jb21wb25lbnRzLnNhdmVkLWNhcmRzLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9wYXktYnV0dG9uLmh0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBQYXlCdXR0b25Db21wb25lbnQoKSB7XG4gIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHt9LFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGN1cnJlbmN5U3ltYm9sOiAnPScsXG4gICAgICBhbW91bnQ6ICc9JyxcbiAgICAgIGlzRGlzYWJsZWQ6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAnPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrIG0tdC1tZCBtLWItbWRcIlxcbicgK1xuICAgICcgIG5nLWRpc2FibGVkPVwidm0uaXNEaXNhYmxlZFwiPlxcbicgK1xuICAgICcgIDxzcGFuIG5nLWlmPVwiIXZtLmlzRGlzYWJsZWRcIj5cXG4nICtcbiAgICAnICAgIFBheSB7eyA6OnZtLmN1cnJlbmN5U3ltYm9sIH19e3sgOjp2bS5hbW91bnQgfCBudW1iZXI6MiB9fVxcbicgK1xuICAgICcgIDwvc3Bhbj5cXG4nICtcbiAgICAnICA8c3BhbiBuZy1pZj1cInZtLmlzRGlzYWJsZWRcIj5cXG4nICtcbiAgICAnICAgIFByb2Nlc3NpbmcgdGhlIHBheW1lbnQuLi5cXG4nICtcbiAgICAnICA8L3NwYW4+XFxuJyArXG4gICAgJzwvYnV0dG9uPic7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3BheW1lbnQtY2FyZC1mbGlwcGVyLmh0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBQYXltZW50Q2FyZEZsaXBwZXJDb21wb25lbnQoKSB7XG4gIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHt9LFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGJyYW5kOiAnPScsXG4gICAgICBpc0ZsaXBwZWQ6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIHRyYW5zY2x1ZGU6IHRydWVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwicGF5bWVudC1jYXJkLWZsaXBwZXJcIlxcbicgK1xuICAgICcgIG5nLWNsYXNzPVwie1xcJ3BheW1lbnQtY2FyZC1mbGlwcGVyLS1mbGlwcGVkXFwnIDogdm0uaXNGbGlwcGVkfVwiPlxcbicgK1xuICAgICcgIDxkaXYgY2xhc3M9XCJwYXltZW50LWNhcmQtZmxpcHBlcl9fd3JhcHBlclwiPlxcbicgK1xuICAgICcgICAgPGRpdiBjbGFzcz1cInBheW1lbnQtY2FyZC1mbGlwcGVyX19mcm9udCBwYXltZW50LWNhcmQtaWNvblwiXFxuJyArXG4gICAgJyAgICAgIG5nLWNsYXNzPVwiXFwncGF5bWVudC1jYXJkLWljb24tLVxcJyArIHZtLmJyYW5kXCI+PC9kaXY+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC1jYXJkLWZsaXBwZXJfX2JhY2sgcGF5bWVudC1jYXJkLWljb24gcGF5bWVudC1jYXJkLWljb24tLWJhY2tcIj48L2Rpdj5cXG4nICtcbiAgICAnICA8L2Rpdj5cXG4nICtcbiAgICAnICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuJyArXG4gICAgJzwvZGl2Pic7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3NlY3VyaXR5LWNvZGUtaW5wdXQuaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFNlY3VyaXR5Q29kZUlucHV0Q29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7fSxcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBmb2N1c2VkOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gJzxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWN1cml0eUNvZGVcIiByZXF1aXJlZFxcbicgK1xuICAgICcgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCJcXG4nICtcbiAgICAnICBwbGFjZWhvbGRlcj1cIjMgZGlnaXRzIG9uIHRoZSBiYWNrXCJcXG4nICtcbiAgICAnICBtYXhsZW5ndGg9XCIzXCIgbmctbWF4bGVuZ3RoPVwiM1wiXFxuJyArXG4gICAgJyAgbmctZm9jdXM9XCJ2bS5mb2N1c2VkID0gdHJ1ZVwiXFxuJyArXG4gICAgJyAgbmctYmx1cj1cInZtLmZvY3VzZWQgPSBmYWxzZVwiXFxuJyArXG4gICAgJyAgdHctdmFsaWRhdGlvblxcbicgK1xuICAgICcgIHBheW1lbnRzLXZhbGlkYXRlPVwiY3ZjXCIgcGF5bWVudHMtZm9ybWF0PVwiY3ZjXCIgLz4nOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snYW5ndWxhciddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnYW5ndWxhciddIDogbnVsbCk7XG52YXIgU2VjdXJpdHlDb2RlSW5wdXRDb21wb25lbnQgPVxuICByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2VjdXJpdHktY29kZS1pbnB1dC9zZWN1cml0eS1jb2RlLWlucHV0LmNvbXBvbmVudCcpO1xudmFyIFBheW1lbnRDYXJkRmxpcHBlckNvbXBvbmVudCA9XG4gIHJlcXVpcmUoJy4vY29tcG9uZW50cy9wYXltZW50LWNhcmQtZmxpcHBlci9wYXltZW50LWNhcmQtZmxpcHBlci5jb21wb25lbnQnKTtcbnZhciBQYXlCdXR0b25Db21wb25lbnQgPVxuICByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGF5LWJ1dHRvbi9wYXktYnV0dG9uLmNvbXBvbmVudCcpO1xuXG52YXIgY29tbW9uID0gYW5ndWxhci5tb2R1bGUoJ3R3LnBheW1lbnRDb21wb25lbnRzLmNvbW1vbicsIFtcbiAgJ25nQW5pbWF0ZScsXG4gICdhbmd1bGFyUGF5bWVudHMnLFxuICAndHcuc3R5bGVndWlkZS1jb21wb25lbnRzJ1xuXSk7XG5cbmNvbW1vbi5kaXJlY3RpdmUoJ3R3U2VjdXJpdHlDb2RlSW5wdXQnLCBTZWN1cml0eUNvZGVJbnB1dENvbXBvbmVudCk7XG5jb21tb24uZGlyZWN0aXZlKCd0d1BheW1lbnRDYXJkRmxpcHBlcicsIFBheW1lbnRDYXJkRmxpcHBlckNvbXBvbmVudCk7XG5jb21tb24uZGlyZWN0aXZlKCd0d1BheUJ1dHRvbicsIFBheUJ1dHRvbkNvbXBvbmVudCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL25ldy1jYXJkLWZvcm0uaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE5ld0NhcmRGb3JtQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7fSxcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBjYXJkRGV0YWlsczogJz0nLFxuICAgICAgY3VycmVuY3lTeW1ib2w6ICc9JyxcbiAgICAgIGFtb3VudDogJz0nLFxuICAgICAgb25TdWJtaXQ6ICcmJyxcbiAgICAgIGlzUHJvY2Vzc2luZzogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8Zm9ybSBuYW1lPVwibmV3Q2FyZEZvcm1cIiBub3ZhbGlkYXRlXFxuJyArXG4gICAgJyAgbmctc3VibWl0PVwibmV3Q2FyZEZvcm0uJHZhbGlkICYmIHZtLm9uU3VibWl0KClcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgIDxsYWJlbCBmb3I9XCJuYW1lXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+Q2FyZGhvbGRlciBuYW1lPC9sYWJlbD5cXG4nICtcbiAgICAnICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxcbicgK1xuICAgICcgICAgICBwbGFjZWhvbGRlcj1cIllvdXIgbmFtZSBhcyBpdCBhcHBlYXJzIG9uIHRoZSBjYXJkXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCJcXG4nICtcbiAgICAnICAgICAgdHctdmFsaWRhdGlvblxcbicgK1xuICAgICcgICAgICBuZy1tb2RlbD1cInZtLmNhcmREZXRhaWxzLm5hbWVcIiAvPlxcbicgK1xuICAgICcgIDwvZGl2PlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbicgK1xuICAgICcgICAgPGxhYmVsIGZvcj1cImNhcmRcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj5DYXJkIG51bWJlcjwvbGFiZWw+XFxuJyArXG4gICAgJyAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibnVtYmVyXCIgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxcbicgK1xuICAgICcgICAgICBwbGFjZWhvbGRlcj1cIlRoZSBsb25nIG51bWJlciBhY3Jvc3MgdGhlIGZyb250XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCJcXG4nICtcbiAgICAnICAgICAgbmctbW9kZWw9XCJ2bS5jYXJkRGV0YWlscy5udW1iZXJcIlxcbicgK1xuICAgICcgICAgICB0dy12YWxpZGF0aW9uXFxuJyArXG4gICAgJyAgICAgIHBheW1lbnRzLXZhbGlkYXRlPVwiY2FyZFwiXFxuJyArXG4gICAgJyAgICAgIHBheW1lbnRzLXR5cGUtbW9kZWw9XCJ2bS5icmFuZFwiXFxuJyArXG4gICAgJyAgICAgIHBheW1lbnRzLWZvcm1hdD1cImNhcmRcIiAvPlxcbicgK1xuICAgICcgICAgICA8dHctcGF5bWVudC1jYXJkLWZsaXBwZXJcXG4nICtcbiAgICAnICAgICAgICBjbGFzcz1cInR3LW5ldy1jYXJkLWZvcm1fX3BheW1lbnQtY2FyZC1pY29uXCJcXG4nICtcbiAgICAnICAgICAgICBicmFuZD1cInZtLmJyYW5kXCJcXG4nICtcbiAgICAnICAgICAgICBpcy1mbGlwcGVkPVwidm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkXCI+XFxuJyArXG4gICAgJyAgICAgICAgPGRpdiBjbGFzcz1cInR3LW5ldy1jYXJkLWZvcm1fX3NlY3VyaXR5LWNvZGUtbGluZVwiXFxuJyArXG4gICAgJyAgICAgICAgICBuZy1jbGFzcz1cInsgXFwndHctbmV3LWNhcmQtZm9ybV9fc2VjdXJpdHktY29kZS1saW5lLS12aXNpYmxlXFwnIDpcXG4nICtcbiAgICAnICAgICAgICAgICAgdm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkIH1cIj5cXG4nICtcbiAgICAnICAgICAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgICAgPC90dy1wYXltZW50LWNhcmQtZmxpcHBlcj5cXG4nICtcbiAgICAnICA8L2Rpdj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbicgK1xuICAgICcgICAgPGRpdiBjbGFzcz1cImNvbC14cy02XCI+XFxuJyArXG4gICAgJyAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XFxuJyArXG4gICAgJyAgICAgICAgPGxhYmVsIGZvcj1cImV4cGlyeVwiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPkNhcmQgZXhwaXJ5IGRhdGU8L2xhYmVsPlxcbicgK1xuICAgICcgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJleHBpcnlcIiByZXF1aXJlZCBjbGFzcz1cImZvcm0tY29udHJvbFwiXFxuJyArXG4gICAgJyAgICAgICAgICBwbGFjZWhvbGRlcj1cIk1NIC8gWVlcIiBhdXRvY29tcGxldGU9XCJvZmZcIlxcbicgK1xuICAgICcgICAgICAgICAgbmctbW9kZWw9XCJ2bS5jYXJkRGV0YWlscy5leHBpcnlcIlxcbicgK1xuICAgICcgICAgICAgICAgdHctdmFsaWRhdGlvblxcbicgK1xuICAgICcgICAgICAgICAgcGF5bWVudHMtdmFsaWRhdGU9XCJleHBpcnlcIlxcbicgK1xuICAgICcgICAgICAgICAgcGF5bWVudHMtZm9ybWF0PVwiZXhwaXJ5XCI+XFxuJyArXG4gICAgJyAgICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTZcIj5cXG4nICtcbiAgICAnICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgICAgICA8bGFiZWwgZm9yPVwic2VjdXJpdHlDb2RlXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+XFxuJyArXG4gICAgJyAgICAgICAgICBTZWN1cml0eSBjb2RlXFxuJyArXG4gICAgJyAgICAgICAgICA8c3BhbiBuZy1pZj1cInR5cGVcIj5cXG4nICtcbiAgICAnICAgICAgICAgICAge3sgdm0uYnJhbmQgPT09IFxcJ3Zpc2FcXCcgPyBcXCcoQ1ZWKVxcJyA6IFxcJyhDVkMpXFwnfX1cXG4nICtcbiAgICAnICAgICAgICAgIDwvc3Bhbj5cXG4nICtcbiAgICAnICAgICAgICA8L2xhYmVsPlxcbicgK1xuICAgICcgICAgICAgIDx0dy1zZWN1cml0eS1jb2RlLWlucHV0XFxuJyArXG4gICAgJyAgICAgICAgICBuZy1tb2RlbD1cInZtLmNhcmREZXRhaWxzLnNlY3VyaXR5Q29kZVwiXFxuJyArXG4gICAgJyAgICAgICAgICBmb2N1c2VkPVwidm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkXCI+XFxuJyArXG4gICAgJyAgICAgICAgPC90dy1zZWN1cml0eS1jb2RlLWlucHV0PlxcbicgK1xuICAgICcgICAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgIDwvZGl2PlxcbicgK1xuICAgICcgIDwvZGl2PlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8dHctcGF5LWJ1dHRvblxcbicgK1xuICAgICcgICAgY3VycmVuY3ktc3ltYm9sPVwidm0uY3VycmVuY3lTeW1ib2xcIlxcbicgK1xuICAgICcgICAgYW1vdW50PVwidm0uYW1vdW50XCJcXG4nICtcbiAgICAnICAgIGlzLWRpc2FibGVkPVwidm0uaXNQcm9jZXNzaW5nXCI+XFxuJyArXG4gICAgJyAgPC90dy1wYXktYnV0dG9uPlxcbicgK1xuICAgICc8L2Zvcm0+JzsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbmd1bGFyID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2FuZ3VsYXInXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2FuZ3VsYXInXSA6IG51bGwpO1xucmVxdWlyZSgnLi4vY29tbW9uL3BheW1lbnQtY29tcG9uZW50cy5jb21tb24ubW9kdWxlJyk7XG5cbnZhciBOZXdDYXJkRm9ybUNvbXBvbmVudCA9XG4gIHJlcXVpcmUoJy4vY29tcG9uZW50cy9uZXctY2FyZC1mb3JtL25ldy1jYXJkLWZvcm0uY29tcG9uZW50Jyk7XG5cbnZhciBuZXdDYXJkRm9ybSA9IGFuZ3VsYXIubW9kdWxlKCd0dy5wYXltZW50Q29tcG9uZW50cy5uZXdDYXJkRm9ybScsIFtcbiAgJ3R3LnBheW1lbnRDb21wb25lbnRzLmNvbW1vbidcbl0pO1xuXG5uZXdDYXJkRm9ybS5kaXJlY3RpdmUoJ3R3TmV3Q2FyZEZvcm0nLCBOZXdDYXJkRm9ybUNvbXBvbmVudCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYW5ndWxhciA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Wydhbmd1bGFyJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydhbmd1bGFyJ10gOiBudWxsKTtcblxucmVxdWlyZSgnLi9uZXctY2FyZC1mb3JtL3BheW1lbnQtY29tcG9uZW50cy5uZXctY2FyZC1mb3JtLm1vZHVsZScpO1xucmVxdWlyZSgnLi9zYXZlZC1jYXJkcy9wYXltZW50LWNvbXBvbmVudHMuc2F2ZWQtY2FyZHMubW9kdWxlJyk7XG5cbmFuZ3VsYXIubW9kdWxlKCd0dy5wYXltZW50Q29tcG9uZW50cycsIFtcbiAgJ3R3LnBheW1lbnRDb21wb25lbnRzLm5ld0NhcmRGb3JtJyxcbiAgJ3R3LnBheW1lbnRDb21wb25lbnRzLnNhdmVkQ2FyZHMnXG5dKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vc2F2ZWQtY2FyZC5odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gU2F2ZWRDYXJkQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogU2F2ZWRDYXJkQ29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBicmFuZDogJz0nLFxuICAgICAgdHlwZTogJz0nLFxuICAgICAgbnVtYmVyOiAnPScsXG4gICAgICByZWZlcmVuY2U6ICc9JyxcbiAgICAgIHNlbGVjdGVkOiAnPScsXG4gICAgICBjdXJyZW5jeVN5bWJvbDogJz0nLFxuICAgICAgYW1vdW50OiAnPScsXG4gICAgICBvblN1Ym1pdDogJyYnLFxuICAgICAgaXNQcm9jZXNzaW5nOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59O1xuXG5mdW5jdGlvbiBTYXZlZENhcmRDb250cm9sbGVyKCRlbGVtZW50LCAkdGltZW91dCkge1xuICB2YXIgdm0gPSB0aGlzO1xuXG4gIHZtLmlzU2VsZWN0ZWQgPSBpc1NlbGVjdGVkO1xuICB2bS5zZWxlY3RDYXJkID0gc2VsZWN0Q2FyZDtcblxuICBmdW5jdGlvbiBzZWxlY3RDYXJkKCkge1xuICAgIGlmICghaXNTZWxlY3RlZCgpKSB7XG4gICAgICB2bS5zZWxlY3RlZCA9IHtyZWZlcmVuY2U6IHZtLnJlZmVyZW5jZX07XG5cbiAgICAgICR0aW1lb3V0KGZvY3VzU2VjdXJpdHlDb2RlSW5wdXQsIDMwMCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTZWxlY3RlZCgpIHtcbiAgICBpZiAoIXZtLnNlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB2bS5zZWxlY3RlZC5yZWZlcmVuY2UgPT09IHZtLnJlZmVyZW5jZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvY3VzU2VjdXJpdHlDb2RlSW5wdXQoKSB7XG4gICAgJGVsZW1lbnQuZmluZCgnaW5wdXQnKVswXS5mb2N1cygpO1xuICB9XG59IiwibW9kdWxlLmV4cG9ydHMgPSAnPGRpdiBjbGFzcz1cInR3LXNhdmVkLWNhcmRcIlxcbicgK1xuICAgICcgIG5nLWNsYXNzPVwieyBcXCdpcy1zZWxlY3RlZFxcJyA6IHZtLmlzU2VsZWN0ZWQoKSB9XCJcXG4nICtcbiAgICAnICBuZy1jbGljaz1cInZtLnNlbGVjdENhcmQoKVwiPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8c21hbGw+XFxuJyArXG4gICAgJyAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJhbmltYXRlLW9wYWNpdHkgcHVsbC1yaWdodCBtLXRcIlxcbicgK1xuICAgICcgICAgICBuZy1pZj1cIiF2bS5pc1NlbGVjdGVkKClcIj5cXG4nICtcbiAgICAnICAgICAgU2VsZWN0IGNhcmRcXG4nICtcbiAgICAnICAgIDwvYT5cXG4nICtcbiAgICAnICA8L3NtYWxsPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8dHctcGF5bWVudC1jYXJkLWZsaXBwZXJcXG4nICtcbiAgICAnICAgIGNsYXNzPVwidHctc2F2ZWQtY2FyZF9fcGF5bWVudC1jYXJkLWljb25cIlxcbicgK1xuICAgICcgICAgYnJhbmQ9XCJ2bS5icmFuZFwiXFxuJyArXG4gICAgJyAgICBpcy1mbGlwcGVkPVwidm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkXCI+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwidHctc2F2ZWQtY2FyZF9fc2VjdXJpdHktY29kZS1saW5lXCJcXG4nICtcbiAgICAnICAgICAgbmctY2xhc3M9XCJ7IFxcJ3R3LXNhdmVkLWNhcmRfX3NlY3VyaXR5LWNvZGUtbGluZS0tdmlzaWJsZVxcJyA6XFxuJyArXG4gICAgJyAgICAgICAgdm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkIH1cIj5cXG4nICtcbiAgICAnICAgIDwvZGl2PlxcbicgK1xuICAgICcgIDwvdHctcGF5bWVudC1jYXJkLWZsaXBwZXI+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgIDxzcGFuIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplIHR3LXNhdmVkLWNhcmRfX2JyYW5kLXR5cGVcIj5cXG4nICtcbiAgICAnICAgIHt7IDo6dm0uYnJhbmQgfX0ge3sgOjp2bS50eXBlIHwgbG93ZXJjYXNlIH19XFxuJyArXG4gICAgJyAgPC9zcGFuPlxcbicgK1xuICAgICcgIDxzbWFsbCBjbGFzcz1cInR3LXNhdmVkLWNhcmRfX251bWJlclwiPkVuZGluZyBpbiB7eyA6OnZtLm51bWJlciB9fTwvc21hbGw+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgIDxmb3JtIG5hbWU9XCJzYXZlZENhcmRQYXltZW50Rm9ybVwiIG5vdmFsaWRhdGVcXG4nICtcbiAgICAnICAgIGNsYXNzPVwiYW5pbWF0ZS1vcGFjaXR5XCJcXG4nICtcbiAgICAnICAgIG5nLWlmPVwidm0uaXNTZWxlY3RlZCgpXCJcXG4nICtcbiAgICAnICAgIG5nLXN1Ym1pdD1cInNhdmVkQ2FyZFBheW1lbnRGb3JtLiR2YWxpZCAmJiB2bS5vblN1Ym1pdCgpXCI+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbicgK1xuICAgICcgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTggY29sLW1kLTZcIj5cXG4nICtcbiAgICAnICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtLWIgbS10LW1kXCI+XFxuJyArXG4gICAgJyAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ0dy1zYXZlZC1jYXJkX19zZWN1cml0eS1jb2RlLWxhYmVsXFxuJyArXG4gICAgJyAgICAgICAgICAgIGNvbnRyb2wtbGFiZWxcIj5cXG4nICtcbiAgICAnICAgICAgICAgICAgUGxlYXNlIHJlLWVudGVyIHlvdXJcXG4nICtcbiAgICAnICAgICAgICAgICAgPHNwYW4gbmctaWY9XCJ2bS5icmFuZFwiPlxcbicgK1xuICAgICcgICAgICAgICAgICAgIHt7IHZtLmJyYW5kID09PSBcXCd2aXNhXFwnID8gXFwnQ1ZWXFwnIDogXFwnQ1ZDXFwnIH19XFxuJyArXG4gICAgJyAgICAgICAgICAgIDwvc3Bhbj5cXG4nICtcbiAgICAnICAgICAgICAgIDwvbGFiZWw+XFxuJyArXG4gICAgJyAgICAgICAgICA8dHctc2VjdXJpdHktY29kZS1pbnB1dFxcbicgK1xuICAgICcgICAgICAgICAgICBuZy1tb2RlbD1cInZtLnNlbGVjdGVkLnNlY3VyaXR5Q29kZVwiXFxuJyArXG4gICAgJyAgICAgICAgICAgIGZvY3VzZWQ9XCJ2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWRcIj5cXG4nICtcbiAgICAnICAgICAgICAgIDwvdHctc2VjdXJpdHktY29kZS1pbnB1dD5cXG4nICtcbiAgICAnICAgICAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgICA8L2Rpdj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgICA8dHctcGF5LWJ1dHRvblxcbicgK1xuICAgICcgICAgICBjdXJyZW5jeS1zeW1ib2w9XCJ2bS5jdXJyZW5jeVN5bWJvbFwiXFxuJyArXG4gICAgJyAgICAgIGFtb3VudD1cInZtLmFtb3VudFwiXFxuJyArXG4gICAgJyAgICAgIGlzLWRpc2FibGVkPVwidm0uaXNQcm9jZXNzaW5nXCI+XFxuJyArXG4gICAgJyAgICA8L3R3LXBheS1idXR0b24+XFxuJyArXG4gICAgJyAgPC9mb3JtPlxcbicgK1xuICAgICc8L2Rpdj4nOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9zYXZlZC1jYXJkcy5odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gU2F2ZWRDYXJkc0NvbXBvbmVudCgpIHtcbiAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IFNhdmVkQ2FyZHNDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBjYXJkczogJz0nLFxuICAgICAgc2VsZWN0ZWQ6ICc9JyxcbiAgICAgIGN1cnJlbmN5U3ltYm9sOiAnPScsXG4gICAgICBhbW91bnQ6ICc9JyxcbiAgICAgIG9uU3VibWl0OiAnJicsXG4gICAgICBpc1Byb2Nlc3Npbmc6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn07XG5cbmZ1bmN0aW9uIFNhdmVkQ2FyZHNDb250cm9sbGVyKCkge1xuICB2YXIgdm0gPSB0aGlzO1xuXG4gIHZtLmdldEJyYW5kRnJvbVZhcmlhbnQgPSBnZXRCcmFuZEZyb21WYXJpYW50O1xuXG4gIGZ1bmN0aW9uIGdldEJyYW5kRnJvbVZhcmlhbnQodmFyaWFudCkge1xuICAgIHZhcmlhbnQgPSB2YXJpYW50LnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAodmFyaWFudC5pbmRleE9mKCd2aXNhJykgPiAtMSkge1xuICAgICAgcmV0dXJuICd2aXNhJztcbiAgICB9IGVsc2UgaWYgKHZhcmlhbnQuaW5kZXhPZignbWMnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gJ21hc3RlcmNhcmQnO1xuICAgIH0gZWxzZSBpZiAodmFyaWFudC5pbmRleE9mKCdiaWonKSA+IC0xIHx8wqB2YXJpYW50LmluZGV4T2YoJ21hZXN0cm8nKSA+IC0xKSB7XG4gICAgICByZXR1cm4gJ21hZXN0cm8nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFyaWFudDtcbiAgICB9XG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9ICc8dHctc2F2ZWQtY2FyZFxcbicgK1xuICAgICcgIG5nLXJlcGVhdD1cImNhcmQgaW4gdm0uY2FyZHMgdHJhY2sgYnkgY2FyZC5hZHllblJlY3VycmluZ0RldGFpbFJlZmVyZW5jZVwiXFxuJyArXG4gICAgJyAgYnJhbmQ9XCJ2bS5nZXRCcmFuZEZyb21WYXJpYW50KGNhcmQuYWR5ZW5WYXJpYW50KVwiXFxuJyArXG4gICAgJyAgdHlwZT1cImNhcmQuY2FyZFR5cGVcIlxcbicgK1xuICAgICcgIG51bWJlcj1cImNhcmQuY2FyZE51bWJlclwiXFxuJyArXG4gICAgJyAgcmVmZXJlbmNlPVwiY2FyZC5hZHllblJlY3VycmluZ0RldGFpbFJlZmVyZW5jZVwiXFxuJyArXG4gICAgJyAgc2VsZWN0ZWQ9XCJ2bS5zZWxlY3RlZFwiXFxuJyArXG4gICAgJyAgY3VycmVuY3ktc3ltYm9sPVwidm0uY3VycmVuY3lTeW1ib2xcIlxcbicgK1xuICAgICcgIGFtb3VudD1cInZtLmFtb3VudFwiXFxuJyArXG4gICAgJyAgb24tc3VibWl0PVwidm0ub25TdWJtaXQoKVwiXFxuJyArXG4gICAgJyAgaXMtcHJvY2Vzc2luZz1cInZtLmlzUHJvY2Vzc2luZ1wiPlxcbicgK1xuICAgICc8L3R3LXNhdmVkLWNhcmQ+JzsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbmd1bGFyID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2FuZ3VsYXInXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2FuZ3VsYXInXSA6IG51bGwpO1xucmVxdWlyZSgnLi4vY29tbW9uL3BheW1lbnQtY29tcG9uZW50cy5jb21tb24ubW9kdWxlJyk7XG5cbnZhciBTYXZlZENhcmRDb21wb25lbnQgPVxuICByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2F2ZWQtY2FyZC9zYXZlZC1jYXJkLmNvbXBvbmVudCcpO1xudmFyIFNhdmVkQ2FyZHNDb21wb25lbnQgPVxuICByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2F2ZWQtY2FyZHMvc2F2ZWQtY2FyZHMuY29tcG9uZW50Jyk7XG5cbnZhciBzYXZlZENhcmRzID0gYW5ndWxhci5tb2R1bGUoJ3R3LnBheW1lbnRDb21wb25lbnRzLnNhdmVkQ2FyZHMnLCBbXG4gICd0dy5wYXltZW50Q29tcG9uZW50cy5jb21tb24nXG5dKTtcblxuc2F2ZWRDYXJkcy5kaXJlY3RpdmUoJ3R3U2F2ZWRDYXJkJywgU2F2ZWRDYXJkQ29tcG9uZW50KTtcbnNhdmVkQ2FyZHMuZGlyZWN0aXZlKCd0d1NhdmVkQ2FyZHMnLCBTYXZlZENhcmRzQ29tcG9uZW50KTsiXX0=
