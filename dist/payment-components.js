(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var template = require('../templates/new-card-form.html');

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
},{"../templates/new-card-form.html":8}],2:[function(require,module,exports){
'use strict';

var template = require('../templates/pay-button.html');

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
},{"../templates/pay-button.html":9}],3:[function(require,module,exports){
'use strict';

var template = require('../templates/payment-card-flipper.html');

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
},{"../templates/payment-card-flipper.html":10}],4:[function(require,module,exports){
(function (global){
'use strict';

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);
var NewCardFormComponent = require('./new-card-form.component');
var SavedCardComponent = require('./saved-card.component');
var SavedCardsComponent = require('./saved-cards.component');
var SecurityCodeInputComponent = require('./security-code-input.component');
var PaymentCardFlipperComponent = require('./payment-card-flipper.component');
var PayButtonComponent = require('./pay-button.component');

var paymentComponents = angular.module('tw.paymentComponents', [
  'ngAnimate', 'angularPayments', 'tw.styleguide-components'
]);
paymentComponents.directive('twNewCardForm', NewCardFormComponent);
paymentComponents.directive('twSavedCard', SavedCardComponent);
paymentComponents.directive('twSavedCards', SavedCardsComponent);
paymentComponents.directive('twSecurityCodeInput', SecurityCodeInputComponent);
paymentComponents.directive('twPaymentCardFlipper', PaymentCardFlipperComponent);
paymentComponents.directive('twPayButton', PayButtonComponent);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./new-card-form.component":1,"./pay-button.component":2,"./payment-card-flipper.component":3,"./saved-card.component":5,"./saved-cards.component":6,"./security-code-input.component":7}],5:[function(require,module,exports){
'use strict';

var template = require('../templates/saved-card.html');

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

function SavedCardController() {
  var vm = this;

  vm.isSelected = isSelected;
  vm.selectCard = selectCard;

  function selectCard() {
    if (!isSelected()) {
      vm.selected = {reference: vm.reference};
    }
  }

  function isSelected() {
    if (!vm.selected) {
      return false;
    }
    return vm.selected.reference === vm.reference;
  }
}
},{"../templates/saved-card.html":11}],6:[function(require,module,exports){
'use strict';

var template = require('../templates/saved-cards.html');

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
},{"../templates/saved-cards.html":12}],7:[function(require,module,exports){
'use strict';

var template = require('../templates/security-code-input.html');

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
},{"../templates/security-code-input.html":13}],8:[function(require,module,exports){
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
    '    <input type="text" name="card" required class="form-control"\n' +
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
},{}],9:[function(require,module,exports){
module.exports = '<button type="submit" class="btn btn-success btn-block m-t-md m-b-md"\n' +
    '  ng-disabled="vm.isDisabled">\n' +
    '  <span ng-if="!vm.isDisabled">\n' +
    '    Pay {{ ::vm.currencySymbol }}{{ ::vm.amount | number:2 }}\n' +
    '  </span>\n' +
    '  <span ng-if="vm.isDisabled">\n' +
    '    Processing the payment...\n' +
    '  </span>\n' +
    '</button>';
},{}],10:[function(require,module,exports){
module.exports = '<div class="payment-card-flipper"\n' +
    '  ng-class="{\'payment-card-flipper--flipped\' : vm.isFlipped}">\n' +
    '  <div class="payment-card-flipper__wrapper">\n' +
    '    <div class="payment-card-flipper__front payment-card-icon"\n' +
    '      ng-class="\'payment-card-icon--\' + vm.brand"></div>\n' +
    '    <div class="payment-card-flipper__back payment-card-icon payment-card-icon--back"></div>\n' +
    '  </div>\n' +
    '  <ng-transclude></ng-transclude>\n' +
    '</div>';
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
module.exports = '<input type="text" name="securityCode" required\n' +
    '  class="form-control" autocomplete="off"\n' +
    '  placeholder="3 digits on the back"\n' +
    '  maxlength="3" ng-maxlength="3"\n' +
    '  ng-focus="vm.focused = true"\n' +
    '  ng-blur="vm.focused = false"\n' +
    '  payments-validate="cvc" payments-format="cvc" />';
},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc2NyaXB0cy9uZXctY2FyZC1mb3JtLmNvbXBvbmVudC5qcyIsImFzc2V0cy9zY3JpcHRzL3BheS1idXR0b24uY29tcG9uZW50LmpzIiwiYXNzZXRzL3NjcmlwdHMvcGF5bWVudC1jYXJkLWZsaXBwZXIuY29tcG9uZW50LmpzIiwiYXNzZXRzL3NjcmlwdHMvcGF5bWVudC1jb21wb25lbnRzLm1vZHVsZS5qcyIsImFzc2V0cy9zY3JpcHRzL3NhdmVkLWNhcmQuY29tcG9uZW50LmpzIiwiYXNzZXRzL3NjcmlwdHMvc2F2ZWQtY2FyZHMuY29tcG9uZW50LmpzIiwiYXNzZXRzL3NjcmlwdHMvc2VjdXJpdHktY29kZS1pbnB1dC5jb21wb25lbnQuanMiLCJhc3NldHMvdGVtcGxhdGVzL25ldy1jYXJkLWZvcm0uaHRtbCIsImFzc2V0cy90ZW1wbGF0ZXMvcGF5LWJ1dHRvbi5odG1sIiwiYXNzZXRzL3RlbXBsYXRlcy9wYXltZW50LWNhcmQtZmxpcHBlci5odG1sIiwiYXNzZXRzL3RlbXBsYXRlcy9zYXZlZC1jYXJkLmh0bWwiLCJhc3NldHMvdGVtcGxhdGVzL3NhdmVkLWNhcmRzLmh0bWwiLCJhc3NldHMvdGVtcGxhdGVzL3NlY3VyaXR5LWNvZGUtaW5wdXQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL3RlbXBsYXRlcy9uZXctY2FyZC1mb3JtLmh0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBOZXdDYXJkRm9ybUNvbXBvbmVudCgpIHtcbiAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge30sXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgY2FyZERldGFpbHM6ICc9JyxcbiAgICAgIGN1cnJlbmN5U3ltYm9sOiAnPScsXG4gICAgICBhbW91bnQ6ICc9JyxcbiAgICAgIG9uU3VibWl0OiAnJicsXG4gICAgICBpc1Byb2Nlc3Npbmc6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuLi90ZW1wbGF0ZXMvcGF5LWJ1dHRvbi5odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUGF5QnV0dG9uQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7fSxcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBjdXJyZW5jeVN5bWJvbDogJz0nLFxuICAgICAgYW1vdW50OiAnPScsXG4gICAgICBpc0Rpc2FibGVkOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi4vdGVtcGxhdGVzL3BheW1lbnQtY2FyZC1mbGlwcGVyLmh0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBQYXltZW50Q2FyZEZsaXBwZXJDb21wb25lbnQoKSB7XG4gIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHt9LFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGJyYW5kOiAnPScsXG4gICAgICBpc0ZsaXBwZWQ6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIHRyYW5zY2x1ZGU6IHRydWVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbmd1bGFyID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2FuZ3VsYXInXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2FuZ3VsYXInXSA6IG51bGwpO1xudmFyIE5ld0NhcmRGb3JtQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9uZXctY2FyZC1mb3JtLmNvbXBvbmVudCcpO1xudmFyIFNhdmVkQ2FyZENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc2F2ZWQtY2FyZC5jb21wb25lbnQnKTtcbnZhciBTYXZlZENhcmRzQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9zYXZlZC1jYXJkcy5jb21wb25lbnQnKTtcbnZhciBTZWN1cml0eUNvZGVJbnB1dENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc2VjdXJpdHktY29kZS1pbnB1dC5jb21wb25lbnQnKTtcbnZhciBQYXltZW50Q2FyZEZsaXBwZXJDb21wb25lbnQgPSByZXF1aXJlKCcuL3BheW1lbnQtY2FyZC1mbGlwcGVyLmNvbXBvbmVudCcpO1xudmFyIFBheUJ1dHRvbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vcGF5LWJ1dHRvbi5jb21wb25lbnQnKTtcblxudmFyIHBheW1lbnRDb21wb25lbnRzID0gYW5ndWxhci5tb2R1bGUoJ3R3LnBheW1lbnRDb21wb25lbnRzJywgW1xuICAnbmdBbmltYXRlJywgJ2FuZ3VsYXJQYXltZW50cycsICd0dy5zdHlsZWd1aWRlLWNvbXBvbmVudHMnXG5dKTtcbnBheW1lbnRDb21wb25lbnRzLmRpcmVjdGl2ZSgndHdOZXdDYXJkRm9ybScsIE5ld0NhcmRGb3JtQ29tcG9uZW50KTtcbnBheW1lbnRDb21wb25lbnRzLmRpcmVjdGl2ZSgndHdTYXZlZENhcmQnLCBTYXZlZENhcmRDb21wb25lbnQpO1xucGF5bWVudENvbXBvbmVudHMuZGlyZWN0aXZlKCd0d1NhdmVkQ2FyZHMnLCBTYXZlZENhcmRzQ29tcG9uZW50KTtcbnBheW1lbnRDb21wb25lbnRzLmRpcmVjdGl2ZSgndHdTZWN1cml0eUNvZGVJbnB1dCcsIFNlY3VyaXR5Q29kZUlucHV0Q29tcG9uZW50KTtcbnBheW1lbnRDb21wb25lbnRzLmRpcmVjdGl2ZSgndHdQYXltZW50Q2FyZEZsaXBwZXInLCBQYXltZW50Q2FyZEZsaXBwZXJDb21wb25lbnQpO1xucGF5bWVudENvbXBvbmVudHMuZGlyZWN0aXZlKCd0d1BheUJ1dHRvbicsIFBheUJ1dHRvbkNvbXBvbmVudCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuLi90ZW1wbGF0ZXMvc2F2ZWQtY2FyZC5odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gU2F2ZWRDYXJkQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogU2F2ZWRDYXJkQ29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBicmFuZDogJz0nLFxuICAgICAgdHlwZTogJz0nLFxuICAgICAgbnVtYmVyOiAnPScsXG4gICAgICByZWZlcmVuY2U6ICc9JyxcbiAgICAgIHNlbGVjdGVkOiAnPScsXG4gICAgICBjdXJyZW5jeVN5bWJvbDogJz0nLFxuICAgICAgYW1vdW50OiAnPScsXG4gICAgICBvblN1Ym1pdDogJyYnLFxuICAgICAgaXNQcm9jZXNzaW5nOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59O1xuXG5mdW5jdGlvbiBTYXZlZENhcmRDb250cm9sbGVyKCkge1xuICB2YXIgdm0gPSB0aGlzO1xuXG4gIHZtLmlzU2VsZWN0ZWQgPSBpc1NlbGVjdGVkO1xuICB2bS5zZWxlY3RDYXJkID0gc2VsZWN0Q2FyZDtcblxuICBmdW5jdGlvbiBzZWxlY3RDYXJkKCkge1xuICAgIGlmICghaXNTZWxlY3RlZCgpKSB7XG4gICAgICB2bS5zZWxlY3RlZCA9IHtyZWZlcmVuY2U6IHZtLnJlZmVyZW5jZX07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTZWxlY3RlZCgpIHtcbiAgICBpZiAoIXZtLnNlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB2bS5zZWxlY3RlZC5yZWZlcmVuY2UgPT09IHZtLnJlZmVyZW5jZTtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi4vdGVtcGxhdGVzL3NhdmVkLWNhcmRzLmh0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTYXZlZENhcmRzQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogU2F2ZWRDYXJkc0NvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGNhcmRzOiAnPScsXG4gICAgICBzZWxlY3RlZDogJz0nLFxuICAgICAgY3VycmVuY3lTeW1ib2w6ICc9JyxcbiAgICAgIGFtb3VudDogJz0nLFxuICAgICAgb25TdWJtaXQ6ICcmJyxcbiAgICAgIGlzUHJvY2Vzc2luZzogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTtcblxuZnVuY3Rpb24gU2F2ZWRDYXJkc0NvbnRyb2xsZXIoKSB7XG4gIHZhciB2bSA9IHRoaXM7XG5cbiAgdm0uZ2V0QnJhbmRGcm9tVmFyaWFudCA9IGdldEJyYW5kRnJvbVZhcmlhbnQ7XG5cbiAgZnVuY3Rpb24gZ2V0QnJhbmRGcm9tVmFyaWFudCh2YXJpYW50KSB7XG4gICAgdmFyaWFudCA9IHZhcmlhbnQudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmICh2YXJpYW50LmluZGV4T2YoJ3Zpc2EnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gJ3Zpc2EnO1xuICAgIH0gZWxzZSBpZiAodmFyaWFudC5pbmRleE9mKCdtYycpID4gLTEpIHtcbiAgICAgIHJldHVybiAnbWFzdGVyY2FyZCc7XG4gICAgfSBlbHNlIGlmICh2YXJpYW50LmluZGV4T2YoJ2JpaicpID4gLTEgfHzCoHZhcmlhbnQuaW5kZXhPZignbWFlc3RybycpID4gLTEpIHtcbiAgICAgIHJldHVybiAnbWFlc3Rybyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YXJpYW50O1xuICAgIH1cbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi4vdGVtcGxhdGVzL3NlY3VyaXR5LWNvZGUtaW5wdXQuaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFNlY3VyaXR5Q29kZUlucHV0Q29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7fSxcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBmb2N1c2VkOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gJzxmb3JtIG5hbWU9XCJuZXdDYXJkRm9ybVwiIG5vdmFsaWRhdGVcXG4nICtcbiAgICAnICBuZy1zdWJtaXQ9XCJuZXdDYXJkRm9ybS4kdmFsaWQgJiYgdm0ub25TdWJtaXQoKVwiPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbicgK1xuICAgICcgICAgPGxhYmVsIGZvcj1cIm5hbWVcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj5DYXJkaG9sZGVyIG5hbWU8L2xhYmVsPlxcbicgK1xuICAgICcgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIiByZXF1aXJlZCBjbGFzcz1cImZvcm0tY29udHJvbFwiXFxuJyArXG4gICAgJyAgICAgIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lIGFzIGl0IGFwcGVhcnMgb24gdGhlIGNhcmRcIiBhdXRvY29tcGxldGU9XCJvZmZcIlxcbicgK1xuICAgICcgICAgICBuZy1tb2RlbD1cInZtLmNhcmREZXRhaWxzLm5hbWVcIiAvPlxcbicgK1xuICAgICcgIDwvZGl2PlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbicgK1xuICAgICcgICAgPGxhYmVsIGZvcj1cImNhcmRcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj5DYXJkIG51bWJlcjwvbGFiZWw+XFxuJyArXG4gICAgJyAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY2FyZFwiIHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcXG4nICtcbiAgICAnICAgICAgcGxhY2Vob2xkZXI9XCJUaGUgbG9uZyBudW1iZXIgYWNyb3NzIHRoZSBmcm9udFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiXFxuJyArXG4gICAgJyAgICAgIG5nLW1vZGVsPVwidm0uY2FyZERldGFpbHMubnVtYmVyXCJcXG4nICtcbiAgICAnICAgICAgcGF5bWVudHMtdmFsaWRhdGU9XCJjYXJkXCJcXG4nICtcbiAgICAnICAgICAgcGF5bWVudHMtdHlwZS1tb2RlbD1cInZtLmJyYW5kXCJcXG4nICtcbiAgICAnICAgICAgcGF5bWVudHMtZm9ybWF0PVwiY2FyZFwiIC8+XFxuJyArXG4gICAgJyAgICAgIDx0dy1wYXltZW50LWNhcmQtZmxpcHBlclxcbicgK1xuICAgICcgICAgICAgIGNsYXNzPVwidHctbmV3LWNhcmQtZm9ybV9fcGF5bWVudC1jYXJkLWljb25cIlxcbicgK1xuICAgICcgICAgICAgIGJyYW5kPVwidm0uYnJhbmRcIlxcbicgK1xuICAgICcgICAgICAgIGlzLWZsaXBwZWQ9XCJ2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWRcIj5cXG4nICtcbiAgICAnICAgICAgICA8ZGl2IGNsYXNzPVwidHctbmV3LWNhcmQtZm9ybV9fc2VjdXJpdHktY29kZS1saW5lXCJcXG4nICtcbiAgICAnICAgICAgICAgIG5nLWNsYXNzPVwieyBcXCd0dy1uZXctY2FyZC1mb3JtX19zZWN1cml0eS1jb2RlLWxpbmUtLXZpc2libGVcXCcgOlxcbicgK1xuICAgICcgICAgICAgICAgICB2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWQgfVwiPlxcbicgK1xuICAgICcgICAgICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgICA8L3R3LXBheW1lbnQtY2FyZC1mbGlwcGVyPlxcbicgK1xuICAgICcgIDwvZGl2PlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTZcIj5cXG4nICtcbiAgICAnICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgICAgICA8bGFiZWwgZm9yPVwiZXhwaXJ5XCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+Q2FyZCBleHBpcnkgZGF0ZTwvbGFiZWw+XFxuJyArXG4gICAgJyAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImV4cGlyeVwiIHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcXG4nICtcbiAgICAnICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTU0gLyBZWVwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiXFxuJyArXG4gICAgJyAgICAgICAgICBuZy1tb2RlbD1cInZtLmNhcmREZXRhaWxzLmV4cGlyeVwiXFxuJyArXG4gICAgJyAgICAgICAgICBwYXltZW50cy12YWxpZGF0ZT1cImV4cGlyeVwiXFxuJyArXG4gICAgJyAgICAgICAgICBwYXltZW50cy1mb3JtYXQ9XCJleHBpcnlcIj5cXG4nICtcbiAgICAnICAgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtNlwiPlxcbicgK1xuICAgICcgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbicgK1xuICAgICcgICAgICAgIDxsYWJlbCBmb3I9XCJzZWN1cml0eUNvZGVcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj5cXG4nICtcbiAgICAnICAgICAgICAgIFNlY3VyaXR5IGNvZGVcXG4nICtcbiAgICAnICAgICAgICAgIDxzcGFuIG5nLWlmPVwidHlwZVwiPlxcbicgK1xuICAgICcgICAgICAgICAgICB7eyB2bS5icmFuZCA9PT0gXFwndmlzYVxcJyA/IFxcJyhDVlYpXFwnIDogXFwnKENWQylcXCd9fVxcbicgK1xuICAgICcgICAgICAgICAgPC9zcGFuPlxcbicgK1xuICAgICcgICAgICAgIDwvbGFiZWw+XFxuJyArXG4gICAgJyAgICAgICAgPHR3LXNlY3VyaXR5LWNvZGUtaW5wdXRcXG4nICtcbiAgICAnICAgICAgICAgIG5nLW1vZGVsPVwidm0uY2FyZERldGFpbHMuc2VjdXJpdHlDb2RlXCJcXG4nICtcbiAgICAnICAgICAgICAgIGZvY3VzZWQ9XCJ2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWRcIj5cXG4nICtcbiAgICAnICAgICAgICA8L3R3LXNlY3VyaXR5LWNvZGUtaW5wdXQ+XFxuJyArXG4gICAgJyAgICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgPC9kaXY+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgIDx0dy1wYXktYnV0dG9uXFxuJyArXG4gICAgJyAgICBjdXJyZW5jeS1zeW1ib2w9XCJ2bS5jdXJyZW5jeVN5bWJvbFwiXFxuJyArXG4gICAgJyAgICBhbW91bnQ9XCJ2bS5hbW91bnRcIlxcbicgK1xuICAgICcgICAgaXMtZGlzYWJsZWQ9XCJ2bS5pc1Byb2Nlc3NpbmdcIj5cXG4nICtcbiAgICAnICA8L3R3LXBheS1idXR0b24+XFxuJyArXG4gICAgJzwvZm9ybT4nOyIsIm1vZHVsZS5leHBvcnRzID0gJzxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayBtLXQtbWQgbS1iLW1kXCJcXG4nICtcbiAgICAnICBuZy1kaXNhYmxlZD1cInZtLmlzRGlzYWJsZWRcIj5cXG4nICtcbiAgICAnICA8c3BhbiBuZy1pZj1cIiF2bS5pc0Rpc2FibGVkXCI+XFxuJyArXG4gICAgJyAgICBQYXkge3sgOjp2bS5jdXJyZW5jeVN5bWJvbCB9fXt7IDo6dm0uYW1vdW50IHwgbnVtYmVyOjIgfX1cXG4nICtcbiAgICAnICA8L3NwYW4+XFxuJyArXG4gICAgJyAgPHNwYW4gbmctaWY9XCJ2bS5pc0Rpc2FibGVkXCI+XFxuJyArXG4gICAgJyAgICBQcm9jZXNzaW5nIHRoZSBwYXltZW50Li4uXFxuJyArXG4gICAgJyAgPC9zcGFuPlxcbicgK1xuICAgICc8L2J1dHRvbj4nOyIsIm1vZHVsZS5leHBvcnRzID0gJzxkaXYgY2xhc3M9XCJwYXltZW50LWNhcmQtZmxpcHBlclwiXFxuJyArXG4gICAgJyAgbmctY2xhc3M9XCJ7XFwncGF5bWVudC1jYXJkLWZsaXBwZXItLWZsaXBwZWRcXCcgOiB2bS5pc0ZsaXBwZWR9XCI+XFxuJyArXG4gICAgJyAgPGRpdiBjbGFzcz1cInBheW1lbnQtY2FyZC1mbGlwcGVyX193cmFwcGVyXCI+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC1jYXJkLWZsaXBwZXJfX2Zyb250IHBheW1lbnQtY2FyZC1pY29uXCJcXG4nICtcbiAgICAnICAgICAgbmctY2xhc3M9XCJcXCdwYXltZW50LWNhcmQtaWNvbi0tXFwnICsgdm0uYnJhbmRcIj48L2Rpdj5cXG4nICtcbiAgICAnICAgIDxkaXYgY2xhc3M9XCJwYXltZW50LWNhcmQtZmxpcHBlcl9fYmFjayBwYXltZW50LWNhcmQtaWNvbiBwYXltZW50LWNhcmQtaWNvbi0tYmFja1wiPjwvZGl2PlxcbicgK1xuICAgICcgIDwvZGl2PlxcbicgK1xuICAgICcgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4nICtcbiAgICAnPC9kaXY+JzsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwidHctc2F2ZWQtY2FyZFwiXFxuJyArXG4gICAgJyAgbmctY2xhc3M9XCJ7IFxcJ2lzLXNlbGVjdGVkXFwnIDogdm0uaXNTZWxlY3RlZCgpIH1cIlxcbicgK1xuICAgICcgIG5nLWNsaWNrPVwidm0uc2VsZWN0Q2FyZCgpXCI+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgIDxzbWFsbD5cXG4nICtcbiAgICAnICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cImFuaW1hdGUtb3BhY2l0eSBwdWxsLXJpZ2h0IG0tdFwiXFxuJyArXG4gICAgJyAgICAgIG5nLWlmPVwiIXZtLmlzU2VsZWN0ZWQoKVwiPlxcbicgK1xuICAgICcgICAgICBTZWxlY3QgY2FyZFxcbicgK1xuICAgICcgICAgPC9hPlxcbicgK1xuICAgICcgIDwvc21hbGw+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgIDx0dy1wYXltZW50LWNhcmQtZmxpcHBlclxcbicgK1xuICAgICcgICAgY2xhc3M9XCJ0dy1zYXZlZC1jYXJkX19wYXltZW50LWNhcmQtaWNvblwiXFxuJyArXG4gICAgJyAgICBicmFuZD1cInZtLmJyYW5kXCJcXG4nICtcbiAgICAnICAgIGlzLWZsaXBwZWQ9XCJ2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWRcIj5cXG4nICtcbiAgICAnICAgIDxkaXYgY2xhc3M9XCJ0dy1zYXZlZC1jYXJkX19zZWN1cml0eS1jb2RlLWxpbmVcIlxcbicgK1xuICAgICcgICAgICBuZy1jbGFzcz1cInsgXFwndHctc2F2ZWQtY2FyZF9fc2VjdXJpdHktY29kZS1saW5lLS12aXNpYmxlXFwnIDpcXG4nICtcbiAgICAnICAgICAgICB2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWQgfVwiPlxcbicgK1xuICAgICcgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgPC90dy1wYXltZW50LWNhcmQtZmxpcHBlcj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWNhcGl0YWxpemUgdHctc2F2ZWQtY2FyZF9fYnJhbmQtdHlwZVwiPlxcbicgK1xuICAgICcgICAge3sgOjp2bS5icmFuZCB9fSB7eyA6OnZtLnR5cGUgfCBsb3dlcmNhc2UgfX1cXG4nICtcbiAgICAnICA8L3NwYW4+XFxuJyArXG4gICAgJyAgPHNtYWxsIGNsYXNzPVwidHctc2F2ZWQtY2FyZF9fbnVtYmVyXCI+RW5kaW5nIGluIHt7IDo6dm0ubnVtYmVyIH19PC9zbWFsbD5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGZvcm0gbmFtZT1cInNhdmVkQ2FyZFBheW1lbnRGb3JtXCIgbm92YWxpZGF0ZVxcbicgK1xuICAgICcgICAgY2xhc3M9XCJhbmltYXRlLW9wYWNpdHlcIlxcbicgK1xuICAgICcgICAgbmctaWY9XCJ2bS5pc1NlbGVjdGVkKClcIlxcbicgK1xuICAgICcgICAgbmctc3VibWl0PVwic2F2ZWRDYXJkUGF5bWVudEZvcm0uJHZhbGlkICYmIHZtLm9uU3VibWl0KClcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuJyArXG4gICAgJyAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOCBjb2wtbWQtNlwiPlxcbicgK1xuICAgICcgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG0tYiBtLXQtbWRcIj5cXG4nICtcbiAgICAnICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInR3LXNhdmVkLWNhcmRfX3NlY3VyaXR5LWNvZGUtbGFiZWxcXG4nICtcbiAgICAnICAgICAgICAgICAgY29udHJvbC1sYWJlbFwiPlxcbicgK1xuICAgICcgICAgICAgICAgICBQbGVhc2UgcmUtZW50ZXIgeW91clxcbicgK1xuICAgICcgICAgICAgICAgICA8c3BhbiBuZy1pZj1cInZtLmJyYW5kXCI+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAge3sgdm0uYnJhbmQgPT09IFxcJ3Zpc2FcXCcgPyBcXCdDVlZcXCcgOiBcXCdDVkNcXCcgfX1cXG4nICtcbiAgICAnICAgICAgICAgICAgPC9zcGFuPlxcbicgK1xuICAgICcgICAgICAgICAgPC9sYWJlbD5cXG4nICtcbiAgICAnICAgICAgICAgIDx0dy1zZWN1cml0eS1jb2RlLWlucHV0XFxuJyArXG4gICAgJyAgICAgICAgICAgIG5nLW1vZGVsPVwidm0uc2VsZWN0ZWQuc2VjdXJpdHlDb2RlXCJcXG4nICtcbiAgICAnICAgICAgICAgICAgZm9jdXNlZD1cInZtLmlzU2VjdXJpdHlDb2RlRm9jdXNlZFwiPlxcbicgK1xuICAgICcgICAgICAgICAgPC90dy1zZWN1cml0eS1jb2RlLWlucHV0PlxcbicgK1xuICAgICcgICAgICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgIDwvZGl2PlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICAgIDx0dy1wYXktYnV0dG9uXFxuJyArXG4gICAgJyAgICAgIGN1cnJlbmN5LXN5bWJvbD1cInZtLmN1cnJlbmN5U3ltYm9sXCJcXG4nICtcbiAgICAnICAgICAgYW1vdW50PVwidm0uYW1vdW50XCJcXG4nICtcbiAgICAnICAgICAgaXMtZGlzYWJsZWQ9XCJ2bS5pc1Byb2Nlc3NpbmdcIj5cXG4nICtcbiAgICAnICAgIDwvdHctcGF5LWJ1dHRvbj5cXG4nICtcbiAgICAnICA8L2Zvcm0+XFxuJyArXG4gICAgJzwvZGl2Pic7IiwibW9kdWxlLmV4cG9ydHMgPSAnPHR3LXNhdmVkLWNhcmRcXG4nICtcbiAgICAnICBuZy1yZXBlYXQ9XCJjYXJkIGluIHZtLmNhcmRzIHRyYWNrIGJ5IGNhcmQuYWR5ZW5SZWN1cnJpbmdEZXRhaWxSZWZlcmVuY2VcIlxcbicgK1xuICAgICcgIGJyYW5kPVwidm0uZ2V0QnJhbmRGcm9tVmFyaWFudChjYXJkLmFkeWVuVmFyaWFudClcIlxcbicgK1xuICAgICcgIHR5cGU9XCJjYXJkLmNhcmRUeXBlXCJcXG4nICtcbiAgICAnICBudW1iZXI9XCJjYXJkLmNhcmROdW1iZXJcIlxcbicgK1xuICAgICcgIHJlZmVyZW5jZT1cImNhcmQuYWR5ZW5SZWN1cnJpbmdEZXRhaWxSZWZlcmVuY2VcIlxcbicgK1xuICAgICcgIHNlbGVjdGVkPVwidm0uc2VsZWN0ZWRcIlxcbicgK1xuICAgICcgIGN1cnJlbmN5LXN5bWJvbD1cInZtLmN1cnJlbmN5U3ltYm9sXCJcXG4nICtcbiAgICAnICBhbW91bnQ9XCJ2bS5hbW91bnRcIlxcbicgK1xuICAgICcgIG9uLXN1Ym1pdD1cInZtLm9uU3VibWl0KClcIlxcbicgK1xuICAgICcgIGlzLXByb2Nlc3Npbmc9XCJ2bS5pc1Byb2Nlc3NpbmdcIj5cXG4nICtcbiAgICAnPC90dy1zYXZlZC1jYXJkPic7IiwibW9kdWxlLmV4cG9ydHMgPSAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlY3VyaXR5Q29kZVwiIHJlcXVpcmVkXFxuJyArXG4gICAgJyAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBhdXRvY29tcGxldGU9XCJvZmZcIlxcbicgK1xuICAgICcgIHBsYWNlaG9sZGVyPVwiMyBkaWdpdHMgb24gdGhlIGJhY2tcIlxcbicgK1xuICAgICcgIG1heGxlbmd0aD1cIjNcIiBuZy1tYXhsZW5ndGg9XCIzXCJcXG4nICtcbiAgICAnICBuZy1mb2N1cz1cInZtLmZvY3VzZWQgPSB0cnVlXCJcXG4nICtcbiAgICAnICBuZy1ibHVyPVwidm0uZm9jdXNlZCA9IGZhbHNlXCJcXG4nICtcbiAgICAnICBwYXltZW50cy12YWxpZGF0ZT1cImN2Y1wiIHBheW1lbnRzLWZvcm1hdD1cImN2Y1wiIC8+JzsiXX0=
