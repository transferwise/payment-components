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

var module = angular.module('tw.paymentComponents', [
  'ngAnimate', 'angularPayments', 'tw.styleguide-components'
]);
module.directive('twNewCardForm', NewCardFormComponent);
module.directive('twSavedCard', SavedCardComponent);
module.directive('twSavedCards', SavedCardsComponent);
module.directive('twSecurityCodeInput', SecurityCodeInputComponent);
module.directive('twPaymentCardFlipper', PaymentCardFlipperComponent);
module.directive('twPayButton', PayButtonComponent);
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
};
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
}

function SavedCardsController() {
  var vm = this;

  vm.getBrandFromVariant = getBrandFromVariant;

  function getBrandFromVariant(variant) {
    variant = variant.toLowerCase();

    if (variant.indexOf('visa') > -1) {
      return 'visa';
    } else if (variant.indexOf('mc') > -1) {
      return 'mastercard';
    } else if (variant.indexOf('bij') > -1
      || variant.indexOf('maestro') > -1) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc2NyaXB0cy9uZXctY2FyZC1mb3JtLmNvbXBvbmVudC5qcyIsImFzc2V0cy9zY3JpcHRzL3BheS1idXR0b24uY29tcG9uZW50LmpzIiwiYXNzZXRzL3NjcmlwdHMvcGF5bWVudC1jYXJkLWZsaXBwZXIuY29tcG9uZW50LmpzIiwiYXNzZXRzL3NjcmlwdHMvcGF5bWVudC1jb21wb25lbnRzLm1vZHVsZS5qcyIsImFzc2V0cy9zY3JpcHRzL3NhdmVkLWNhcmQuY29tcG9uZW50LmpzIiwiYXNzZXRzL3NjcmlwdHMvc2F2ZWQtY2FyZHMuY29tcG9uZW50LmpzIiwiYXNzZXRzL3NjcmlwdHMvc2VjdXJpdHktY29kZS1pbnB1dC5jb21wb25lbnQuanMiLCJhc3NldHMvdGVtcGxhdGVzL25ldy1jYXJkLWZvcm0uaHRtbCIsImFzc2V0cy90ZW1wbGF0ZXMvcGF5LWJ1dHRvbi5odG1sIiwiYXNzZXRzL3RlbXBsYXRlcy9wYXltZW50LWNhcmQtZmxpcHBlci5odG1sIiwiYXNzZXRzL3RlbXBsYXRlcy9zYXZlZC1jYXJkLmh0bWwiLCJhc3NldHMvdGVtcGxhdGVzL3NhdmVkLWNhcmRzLmh0bWwiLCJhc3NldHMvdGVtcGxhdGVzL3NlY3VyaXR5LWNvZGUtaW5wdXQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi4vdGVtcGxhdGVzL25ldy1jYXJkLWZvcm0uaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE5ld0NhcmRGb3JtQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7fSxcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBjYXJkRGV0YWlsczogJz0nLFxuICAgICAgY3VycmVuY3lTeW1ib2w6ICc9JyxcbiAgICAgIGFtb3VudDogJz0nLFxuICAgICAgb25TdWJtaXQ6ICcmJyxcbiAgICAgIGlzUHJvY2Vzc2luZzogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL3RlbXBsYXRlcy9wYXktYnV0dG9uLmh0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBQYXlCdXR0b25Db21wb25lbnQoKSB7XG4gIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHt9LFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGN1cnJlbmN5U3ltYm9sOiAnPScsXG4gICAgICBhbW91bnQ6ICc9JyxcbiAgICAgIGlzRGlzYWJsZWQ6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuLi90ZW1wbGF0ZXMvcGF5bWVudC1jYXJkLWZsaXBwZXIuaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFBheW1lbnRDYXJkRmxpcHBlckNvbXBvbmVudCgpIHtcbiAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge30sXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgYnJhbmQ6ICc9JyxcbiAgICAgIGlzRmxpcHBlZDogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgdHJhbnNjbHVkZTogdHJ1ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snYW5ndWxhciddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnYW5ndWxhciddIDogbnVsbCk7XG52YXIgTmV3Q2FyZEZvcm1Db21wb25lbnQgPSByZXF1aXJlKCcuL25ldy1jYXJkLWZvcm0uY29tcG9uZW50Jyk7XG52YXIgU2F2ZWRDYXJkQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9zYXZlZC1jYXJkLmNvbXBvbmVudCcpO1xudmFyIFNhdmVkQ2FyZHNDb21wb25lbnQgPSByZXF1aXJlKCcuL3NhdmVkLWNhcmRzLmNvbXBvbmVudCcpO1xudmFyIFNlY3VyaXR5Q29kZUlucHV0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9zZWN1cml0eS1jb2RlLWlucHV0LmNvbXBvbmVudCcpO1xudmFyIFBheW1lbnRDYXJkRmxpcHBlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4vcGF5bWVudC1jYXJkLWZsaXBwZXIuY29tcG9uZW50Jyk7XG52YXIgUGF5QnV0dG9uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9wYXktYnV0dG9uLmNvbXBvbmVudCcpO1xuXG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3R3LnBheW1lbnRDb21wb25lbnRzJywgW1xuICAnbmdBbmltYXRlJywgJ2FuZ3VsYXJQYXltZW50cycsICd0dy5zdHlsZWd1aWRlLWNvbXBvbmVudHMnXG5dKTtcbm1vZHVsZS5kaXJlY3RpdmUoJ3R3TmV3Q2FyZEZvcm0nLCBOZXdDYXJkRm9ybUNvbXBvbmVudCk7XG5tb2R1bGUuZGlyZWN0aXZlKCd0d1NhdmVkQ2FyZCcsIFNhdmVkQ2FyZENvbXBvbmVudCk7XG5tb2R1bGUuZGlyZWN0aXZlKCd0d1NhdmVkQ2FyZHMnLCBTYXZlZENhcmRzQ29tcG9uZW50KTtcbm1vZHVsZS5kaXJlY3RpdmUoJ3R3U2VjdXJpdHlDb2RlSW5wdXQnLCBTZWN1cml0eUNvZGVJbnB1dENvbXBvbmVudCk7XG5tb2R1bGUuZGlyZWN0aXZlKCd0d1BheW1lbnRDYXJkRmxpcHBlcicsIFBheW1lbnRDYXJkRmxpcHBlckNvbXBvbmVudCk7XG5tb2R1bGUuZGlyZWN0aXZlKCd0d1BheUJ1dHRvbicsIFBheUJ1dHRvbkNvbXBvbmVudCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuLi90ZW1wbGF0ZXMvc2F2ZWQtY2FyZC5odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gU2F2ZWRDYXJkQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogU2F2ZWRDYXJkQ29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBicmFuZDogJz0nLFxuICAgICAgdHlwZTogJz0nLFxuICAgICAgbnVtYmVyOiAnPScsXG4gICAgICByZWZlcmVuY2U6ICc9JyxcbiAgICAgIHNlbGVjdGVkOiAnPScsXG4gICAgICBjdXJyZW5jeVN5bWJvbDogJz0nLFxuICAgICAgYW1vdW50OiAnPScsXG4gICAgICBvblN1Ym1pdDogJyYnLFxuICAgICAgaXNQcm9jZXNzaW5nOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59O1xuXG5mdW5jdGlvbiBTYXZlZENhcmRDb250cm9sbGVyKCkge1xuICB2YXIgdm0gPSB0aGlzO1xuXG4gIHZtLmlzU2VsZWN0ZWQgPSBpc1NlbGVjdGVkO1xuICB2bS5zZWxlY3RDYXJkID0gc2VsZWN0Q2FyZDtcblxuICBmdW5jdGlvbiBzZWxlY3RDYXJkKCkge1xuICAgIGlmICghaXNTZWxlY3RlZCgpKSB7XG4gICAgICB2bS5zZWxlY3RlZCA9IHtyZWZlcmVuY2U6IHZtLnJlZmVyZW5jZX07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTZWxlY3RlZCgpIHtcbiAgICBpZiAoIXZtLnNlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB2bS5zZWxlY3RlZC5yZWZlcmVuY2UgPT09IHZtLnJlZmVyZW5jZTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL3RlbXBsYXRlcy9zYXZlZC1jYXJkcy5odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gU2F2ZWRDYXJkc0NvbXBvbmVudCgpIHtcbiAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IFNhdmVkQ2FyZHNDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBjYXJkczogJz0nLFxuICAgICAgc2VsZWN0ZWQ6ICc9JyxcbiAgICAgIGN1cnJlbmN5U3ltYm9sOiAnPScsXG4gICAgICBhbW91bnQ6ICc9JyxcbiAgICAgIG9uU3VibWl0OiAnJicsXG4gICAgICBpc1Byb2Nlc3Npbmc6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn1cblxuZnVuY3Rpb24gU2F2ZWRDYXJkc0NvbnRyb2xsZXIoKSB7XG4gIHZhciB2bSA9IHRoaXM7XG5cbiAgdm0uZ2V0QnJhbmRGcm9tVmFyaWFudCA9IGdldEJyYW5kRnJvbVZhcmlhbnQ7XG5cbiAgZnVuY3Rpb24gZ2V0QnJhbmRGcm9tVmFyaWFudCh2YXJpYW50KSB7XG4gICAgdmFyaWFudCA9IHZhcmlhbnQudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmICh2YXJpYW50LmluZGV4T2YoJ3Zpc2EnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gJ3Zpc2EnO1xuICAgIH0gZWxzZSBpZiAodmFyaWFudC5pbmRleE9mKCdtYycpID4gLTEpIHtcbiAgICAgIHJldHVybiAnbWFzdGVyY2FyZCc7XG4gICAgfSBlbHNlIGlmICh2YXJpYW50LmluZGV4T2YoJ2JpaicpID4gLTFcbiAgICAgIHx8wqB2YXJpYW50LmluZGV4T2YoJ21hZXN0cm8nKSA+IC0xKSB7XG4gICAgICByZXR1cm4gJ21hZXN0cm8nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFyaWFudDtcbiAgICB9XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL3RlbXBsYXRlcy9zZWN1cml0eS1jb2RlLWlucHV0Lmh0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTZWN1cml0eUNvZGVJbnB1dENvbXBvbmVudCgpIHtcbiAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge30sXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgZm9jdXNlZDogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8Zm9ybSBuYW1lPVwibmV3Q2FyZEZvcm1cIiBub3ZhbGlkYXRlXFxuJyArXG4gICAgJyAgbmctc3VibWl0PVwibmV3Q2FyZEZvcm0uJHZhbGlkICYmIHZtLm9uU3VibWl0KClcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgIDxsYWJlbCBmb3I9XCJuYW1lXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+Q2FyZGhvbGRlciBuYW1lPC9sYWJlbD5cXG4nICtcbiAgICAnICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxcbicgK1xuICAgICcgICAgICBwbGFjZWhvbGRlcj1cIllvdXIgbmFtZSBhcyBpdCBhcHBlYXJzIG9uIHRoZSBjYXJkXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCJcXG4nICtcbiAgICAnICAgICAgbmctbW9kZWw9XCJ2bS5jYXJkRGV0YWlscy5uYW1lXCIgLz5cXG4nICtcbiAgICAnICA8L2Rpdj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgIDxsYWJlbCBmb3I9XCJjYXJkXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+Q2FyZCBudW1iZXI8L2xhYmVsPlxcbicgK1xuICAgICcgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNhcmRcIiByZXF1aXJlZCBjbGFzcz1cImZvcm0tY29udHJvbFwiXFxuJyArXG4gICAgJyAgICAgIHBsYWNlaG9sZGVyPVwiVGhlIGxvbmcgbnVtYmVyIGFjcm9zcyB0aGUgZnJvbnRcIiBhdXRvY29tcGxldGU9XCJvZmZcIlxcbicgK1xuICAgICcgICAgICBuZy1tb2RlbD1cInZtLmNhcmREZXRhaWxzLm51bWJlclwiXFxuJyArXG4gICAgJyAgICAgIHBheW1lbnRzLXZhbGlkYXRlPVwiY2FyZFwiXFxuJyArXG4gICAgJyAgICAgIHBheW1lbnRzLXR5cGUtbW9kZWw9XCJ2bS5icmFuZFwiXFxuJyArXG4gICAgJyAgICAgIHBheW1lbnRzLWZvcm1hdD1cImNhcmRcIiAvPlxcbicgK1xuICAgICcgICAgICA8dHctcGF5bWVudC1jYXJkLWZsaXBwZXJcXG4nICtcbiAgICAnICAgICAgICBjbGFzcz1cInR3LW5ldy1jYXJkLWZvcm1fX3BheW1lbnQtY2FyZC1pY29uXCJcXG4nICtcbiAgICAnICAgICAgICBicmFuZD1cInZtLmJyYW5kXCJcXG4nICtcbiAgICAnICAgICAgICBpcy1mbGlwcGVkPVwidm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkXCI+XFxuJyArXG4gICAgJyAgICAgICAgPGRpdiBjbGFzcz1cInR3LW5ldy1jYXJkLWZvcm1fX3NlY3VyaXR5LWNvZGUtbGluZVwiXFxuJyArXG4gICAgJyAgICAgICAgICBuZy1jbGFzcz1cInsgXFwndHctbmV3LWNhcmQtZm9ybV9fc2VjdXJpdHktY29kZS1saW5lLS12aXNpYmxlXFwnIDpcXG4nICtcbiAgICAnICAgICAgICAgICAgdm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkIH1cIj5cXG4nICtcbiAgICAnICAgICAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgICAgPC90dy1wYXltZW50LWNhcmQtZmxpcHBlcj5cXG4nICtcbiAgICAnICA8L2Rpdj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbicgK1xuICAgICcgICAgPGRpdiBjbGFzcz1cImNvbC14cy02XCI+XFxuJyArXG4gICAgJyAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XFxuJyArXG4gICAgJyAgICAgICAgPGxhYmVsIGZvcj1cImV4cGlyeVwiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPkNhcmQgZXhwaXJ5IGRhdGU8L2xhYmVsPlxcbicgK1xuICAgICcgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJleHBpcnlcIiByZXF1aXJlZCBjbGFzcz1cImZvcm0tY29udHJvbFwiXFxuJyArXG4gICAgJyAgICAgICAgICBwbGFjZWhvbGRlcj1cIk1NIC8gWVlcIiBhdXRvY29tcGxldGU9XCJvZmZcIlxcbicgK1xuICAgICcgICAgICAgICAgbmctbW9kZWw9XCJ2bS5jYXJkRGV0YWlscy5leHBpcnlcIlxcbicgK1xuICAgICcgICAgICAgICAgcGF5bWVudHMtdmFsaWRhdGU9XCJleHBpcnlcIlxcbicgK1xuICAgICcgICAgICAgICAgcGF5bWVudHMtZm9ybWF0PVwiZXhwaXJ5XCI+XFxuJyArXG4gICAgJyAgICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTZcIj5cXG4nICtcbiAgICAnICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgICAgICA8bGFiZWwgZm9yPVwic2VjdXJpdHlDb2RlXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+XFxuJyArXG4gICAgJyAgICAgICAgICBTZWN1cml0eSBjb2RlXFxuJyArXG4gICAgJyAgICAgICAgICA8c3BhbiBuZy1pZj1cInR5cGVcIj5cXG4nICtcbiAgICAnICAgICAgICAgICAge3sgdm0uYnJhbmQgPT09IFxcJ3Zpc2FcXCcgPyBcXCcoQ1ZWKVxcJyA6IFxcJyhDVkMpXFwnfX1cXG4nICtcbiAgICAnICAgICAgICAgIDwvc3Bhbj5cXG4nICtcbiAgICAnICAgICAgICA8L2xhYmVsPlxcbicgK1xuICAgICcgICAgICAgIDx0dy1zZWN1cml0eS1jb2RlLWlucHV0XFxuJyArXG4gICAgJyAgICAgICAgICBuZy1tb2RlbD1cInZtLmNhcmREZXRhaWxzLnNlY3VyaXR5Q29kZVwiXFxuJyArXG4gICAgJyAgICAgICAgICBmb2N1c2VkPVwidm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkXCI+XFxuJyArXG4gICAgJyAgICAgICAgPC90dy1zZWN1cml0eS1jb2RlLWlucHV0PlxcbicgK1xuICAgICcgICAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgIDwvZGl2PlxcbicgK1xuICAgICcgIDwvZGl2PlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8dHctcGF5LWJ1dHRvblxcbicgK1xuICAgICcgICAgY3VycmVuY3ktc3ltYm9sPVwidm0uY3VycmVuY3lTeW1ib2xcIlxcbicgK1xuICAgICcgICAgYW1vdW50PVwidm0uYW1vdW50XCJcXG4nICtcbiAgICAnICAgIGlzLWRpc2FibGVkPVwidm0uaXNQcm9jZXNzaW5nXCI+XFxuJyArXG4gICAgJyAgPC90dy1wYXktYnV0dG9uPlxcbicgK1xuICAgICc8L2Zvcm0+JzsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG4tYmxvY2sgbS10LW1kIG0tYi1tZFwiXFxuJyArXG4gICAgJyAgbmctZGlzYWJsZWQ9XCJ2bS5pc0Rpc2FibGVkXCI+XFxuJyArXG4gICAgJyAgPHNwYW4gbmctaWY9XCIhdm0uaXNEaXNhYmxlZFwiPlxcbicgK1xuICAgICcgICAgUGF5IHt7IDo6dm0uY3VycmVuY3lTeW1ib2wgfX17eyA6OnZtLmFtb3VudCB8IG51bWJlcjoyIH19XFxuJyArXG4gICAgJyAgPC9zcGFuPlxcbicgK1xuICAgICcgIDxzcGFuIG5nLWlmPVwidm0uaXNEaXNhYmxlZFwiPlxcbicgK1xuICAgICcgICAgUHJvY2Vzc2luZyB0aGUgcGF5bWVudC4uLlxcbicgK1xuICAgICcgIDwvc3Bhbj5cXG4nICtcbiAgICAnPC9idXR0b24+JzsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwicGF5bWVudC1jYXJkLWZsaXBwZXJcIlxcbicgK1xuICAgICcgIG5nLWNsYXNzPVwie1xcJ3BheW1lbnQtY2FyZC1mbGlwcGVyLS1mbGlwcGVkXFwnIDogdm0uaXNGbGlwcGVkfVwiPlxcbicgK1xuICAgICcgIDxkaXYgY2xhc3M9XCJwYXltZW50LWNhcmQtZmxpcHBlcl9fd3JhcHBlclwiPlxcbicgK1xuICAgICcgICAgPGRpdiBjbGFzcz1cInBheW1lbnQtY2FyZC1mbGlwcGVyX19mcm9udCBwYXltZW50LWNhcmQtaWNvblwiXFxuJyArXG4gICAgJyAgICAgIG5nLWNsYXNzPVwiXFwncGF5bWVudC1jYXJkLWljb24tLVxcJyArIHZtLmJyYW5kXCI+PC9kaXY+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC1jYXJkLWZsaXBwZXJfX2JhY2sgcGF5bWVudC1jYXJkLWljb24gcGF5bWVudC1jYXJkLWljb24tLWJhY2tcIj48L2Rpdj5cXG4nICtcbiAgICAnICA8L2Rpdj5cXG4nICtcbiAgICAnICA8bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+XFxuJyArXG4gICAgJzwvZGl2Pic7IiwibW9kdWxlLmV4cG9ydHMgPSAnPGRpdiBjbGFzcz1cInR3LXNhdmVkLWNhcmRcIlxcbicgK1xuICAgICcgIG5nLWNsYXNzPVwieyBcXCdpcy1zZWxlY3RlZFxcJyA6IHZtLmlzU2VsZWN0ZWQoKSB9XCJcXG4nICtcbiAgICAnICBuZy1jbGljaz1cInZtLnNlbGVjdENhcmQoKVwiPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8c21hbGw+XFxuJyArXG4gICAgJyAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJhbmltYXRlLW9wYWNpdHkgcHVsbC1yaWdodCBtLXRcIlxcbicgK1xuICAgICcgICAgICBuZy1pZj1cIiF2bS5pc1NlbGVjdGVkKClcIj5cXG4nICtcbiAgICAnICAgICAgU2VsZWN0IGNhcmRcXG4nICtcbiAgICAnICAgIDwvYT5cXG4nICtcbiAgICAnICA8L3NtYWxsPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8dHctcGF5bWVudC1jYXJkLWZsaXBwZXJcXG4nICtcbiAgICAnICAgIGNsYXNzPVwidHctc2F2ZWQtY2FyZF9fcGF5bWVudC1jYXJkLWljb25cIlxcbicgK1xuICAgICcgICAgYnJhbmQ9XCJ2bS5icmFuZFwiXFxuJyArXG4gICAgJyAgICBpcy1mbGlwcGVkPVwidm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkXCI+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwidHctc2F2ZWQtY2FyZF9fc2VjdXJpdHktY29kZS1saW5lXCJcXG4nICtcbiAgICAnICAgICAgbmctY2xhc3M9XCJ7IFxcJ3R3LXNhdmVkLWNhcmRfX3NlY3VyaXR5LWNvZGUtbGluZS0tdmlzaWJsZVxcJyA6XFxuJyArXG4gICAgJyAgICAgICAgdm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkIH1cIj5cXG4nICtcbiAgICAnICAgIDwvZGl2PlxcbicgK1xuICAgICcgIDwvdHctcGF5bWVudC1jYXJkLWZsaXBwZXI+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgIDxzcGFuIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplIHR3LXNhdmVkLWNhcmRfX2JyYW5kLXR5cGVcIj5cXG4nICtcbiAgICAnICAgIHt7IDo6dm0uYnJhbmQgfX0ge3sgOjp2bS50eXBlIHwgbG93ZXJjYXNlIH19XFxuJyArXG4gICAgJyAgPC9zcGFuPlxcbicgK1xuICAgICcgIDxzbWFsbCBjbGFzcz1cInR3LXNhdmVkLWNhcmRfX251bWJlclwiPkVuZGluZyBpbiB7eyA6OnZtLm51bWJlciB9fTwvc21hbGw+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgIDxmb3JtIG5hbWU9XCJzYXZlZENhcmRQYXltZW50Rm9ybVwiIG5vdmFsaWRhdGVcXG4nICtcbiAgICAnICAgIGNsYXNzPVwiYW5pbWF0ZS1vcGFjaXR5XCJcXG4nICtcbiAgICAnICAgIG5nLWlmPVwidm0uaXNTZWxlY3RlZCgpXCJcXG4nICtcbiAgICAnICAgIG5nLXN1Ym1pdD1cInNhdmVkQ2FyZFBheW1lbnRGb3JtLiR2YWxpZCAmJiB2bS5vblN1Ym1pdCgpXCI+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbicgK1xuICAgICcgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTggY29sLW1kLTZcIj5cXG4nICtcbiAgICAnICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtLWIgbS10LW1kXCI+XFxuJyArXG4gICAgJyAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ0dy1zYXZlZC1jYXJkX19zZWN1cml0eS1jb2RlLWxhYmVsXFxuJyArXG4gICAgJyAgICAgICAgICAgIGNvbnRyb2wtbGFiZWxcIj5cXG4nICtcbiAgICAnICAgICAgICAgICAgUGxlYXNlIHJlLWVudGVyIHlvdXJcXG4nICtcbiAgICAnICAgICAgICAgICAgPHNwYW4gbmctaWY9XCJ2bS5icmFuZFwiPlxcbicgK1xuICAgICcgICAgICAgICAgICAgIHt7IHZtLmJyYW5kID09PSBcXCd2aXNhXFwnID8gXFwnQ1ZWXFwnIDogXFwnQ1ZDXFwnIH19XFxuJyArXG4gICAgJyAgICAgICAgICAgIDwvc3Bhbj5cXG4nICtcbiAgICAnICAgICAgICAgIDwvbGFiZWw+XFxuJyArXG4gICAgJyAgICAgICAgICA8dHctc2VjdXJpdHktY29kZS1pbnB1dFxcbicgK1xuICAgICcgICAgICAgICAgICBuZy1tb2RlbD1cInZtLnNlbGVjdGVkLnNlY3VyaXR5Q29kZVwiXFxuJyArXG4gICAgJyAgICAgICAgICAgIGZvY3VzZWQ9XCJ2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWRcIj5cXG4nICtcbiAgICAnICAgICAgICAgIDwvdHctc2VjdXJpdHktY29kZS1pbnB1dD5cXG4nICtcbiAgICAnICAgICAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgICA8L2Rpdj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgICA8dHctcGF5LWJ1dHRvblxcbicgK1xuICAgICcgICAgICBjdXJyZW5jeS1zeW1ib2w9XCJ2bS5jdXJyZW5jeVN5bWJvbFwiXFxuJyArXG4gICAgJyAgICAgIGFtb3VudD1cInZtLmFtb3VudFwiXFxuJyArXG4gICAgJyAgICAgIGlzLWRpc2FibGVkPVwidm0uaXNQcm9jZXNzaW5nXCI+XFxuJyArXG4gICAgJyAgICA8L3R3LXBheS1idXR0b24+XFxuJyArXG4gICAgJyAgPC9mb3JtPlxcbicgK1xuICAgICc8L2Rpdj4nOyIsIm1vZHVsZS5leHBvcnRzID0gJzx0dy1zYXZlZC1jYXJkXFxuJyArXG4gICAgJyAgbmctcmVwZWF0PVwiY2FyZCBpbiB2bS5jYXJkcyB0cmFjayBieSBjYXJkLmFkeWVuUmVjdXJyaW5nRGV0YWlsUmVmZXJlbmNlXCJcXG4nICtcbiAgICAnICBicmFuZD1cInZtLmdldEJyYW5kRnJvbVZhcmlhbnQoY2FyZC5hZHllblZhcmlhbnQpXCJcXG4nICtcbiAgICAnICB0eXBlPVwiY2FyZC5jYXJkVHlwZVwiXFxuJyArXG4gICAgJyAgbnVtYmVyPVwiY2FyZC5jYXJkTnVtYmVyXCJcXG4nICtcbiAgICAnICByZWZlcmVuY2U9XCJjYXJkLmFkeWVuUmVjdXJyaW5nRGV0YWlsUmVmZXJlbmNlXCJcXG4nICtcbiAgICAnICBzZWxlY3RlZD1cInZtLnNlbGVjdGVkXCJcXG4nICtcbiAgICAnICBjdXJyZW5jeS1zeW1ib2w9XCJ2bS5jdXJyZW5jeVN5bWJvbFwiXFxuJyArXG4gICAgJyAgYW1vdW50PVwidm0uYW1vdW50XCJcXG4nICtcbiAgICAnICBvbi1zdWJtaXQ9XCJ2bS5vblN1Ym1pdCgpXCJcXG4nICtcbiAgICAnICBpcy1wcm9jZXNzaW5nPVwidm0uaXNQcm9jZXNzaW5nXCI+XFxuJyArXG4gICAgJzwvdHctc2F2ZWQtY2FyZD4nOyIsIm1vZHVsZS5leHBvcnRzID0gJzxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWN1cml0eUNvZGVcIiByZXF1aXJlZFxcbicgK1xuICAgICcgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCJcXG4nICtcbiAgICAnICBwbGFjZWhvbGRlcj1cIjMgZGlnaXRzIG9uIHRoZSBiYWNrXCJcXG4nICtcbiAgICAnICBtYXhsZW5ndGg9XCIzXCIgbmctbWF4bGVuZ3RoPVwiM1wiXFxuJyArXG4gICAgJyAgbmctZm9jdXM9XCJ2bS5mb2N1c2VkID0gdHJ1ZVwiXFxuJyArXG4gICAgJyAgbmctYmx1cj1cInZtLmZvY3VzZWQgPSBmYWxzZVwiXFxuJyArXG4gICAgJyAgcGF5bWVudHMtdmFsaWRhdGU9XCJjdmNcIiBwYXltZW50cy1mb3JtYXQ9XCJjdmNcIiAvPic7Il19
