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

var NewCardFormComponent = require('./components/new-card-form.component');

var newCardForm = angular.module('tw.paymentComponents.newCardForm', [
  'tw.paymentComponents.common'
]);

newCardForm.directive('twNewCardForm', NewCardFormComponent);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../common/payment-components.common.module":7,"./components/new-card-form.component":8}],11:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tbW9uL2NvbXBvbmVudHMvcGF5LWJ1dHRvbi9wYXktYnV0dG9uLmNvbXBvbmVudC5qcyIsInNyYy9jb21tb24vY29tcG9uZW50cy9wYXktYnV0dG9uL3BheS1idXR0b24uaHRtbCIsInNyYy9jb21tb24vY29tcG9uZW50cy9wYXltZW50LWNhcmQtZmxpcHBlci9wYXltZW50LWNhcmQtZmxpcHBlci5jb21wb25lbnQuanMiLCJzcmMvY29tbW9uL2NvbXBvbmVudHMvcGF5bWVudC1jYXJkLWZsaXBwZXIvcGF5bWVudC1jYXJkLWZsaXBwZXIuaHRtbCIsInNyYy9jb21tb24vY29tcG9uZW50cy9zZWN1cml0eS1jb2RlLWlucHV0L3NlY3VyaXR5LWNvZGUtaW5wdXQuY29tcG9uZW50LmpzIiwic3JjL2NvbW1vbi9jb21wb25lbnRzL3NlY3VyaXR5LWNvZGUtaW5wdXQvc2VjdXJpdHktY29kZS1pbnB1dC5odG1sIiwic3JjL2NvbW1vbi9wYXltZW50LWNvbXBvbmVudHMuY29tbW9uLm1vZHVsZS5qcyIsInNyYy9uZXctY2FyZC1mb3JtL2NvbXBvbmVudHMvbmV3LWNhcmQtZm9ybS5jb21wb25lbnQuanMiLCJzcmMvbmV3LWNhcmQtZm9ybS9jb21wb25lbnRzL25ldy1jYXJkLWZvcm0uaHRtbCIsInNyYy9uZXctY2FyZC1mb3JtL3BheW1lbnQtY29tcG9uZW50cy5uZXctY2FyZC1mb3JtLm1vZHVsZS5qcyIsInNyYy9wYXltZW50LWNvbXBvbmVudHMubW9kdWxlLmpzIiwic3JjL3NhdmVkLWNhcmRzL2NvbXBvbmVudHMvc2F2ZWQtY2FyZC9zYXZlZC1jYXJkLmNvbXBvbmVudC5qcyIsInNyYy9zYXZlZC1jYXJkcy9jb21wb25lbnRzL3NhdmVkLWNhcmQvc2F2ZWQtY2FyZC5odG1sIiwic3JjL3NhdmVkLWNhcmRzL2NvbXBvbmVudHMvc2F2ZWQtY2FyZHMvc2F2ZWQtY2FyZHMuY29tcG9uZW50LmpzIiwic3JjL3NhdmVkLWNhcmRzL2NvbXBvbmVudHMvc2F2ZWQtY2FyZHMvc2F2ZWQtY2FyZHMuaHRtbCIsInNyYy9zYXZlZC1jYXJkcy9wYXltZW50LWNvbXBvbmVudHMuc2F2ZWQtY2FyZHMubW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3BheS1idXR0b24uaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFBheUJ1dHRvbkNvbXBvbmVudCgpIHtcbiAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge30sXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgY3VycmVuY3lTeW1ib2w6ICc9JyxcbiAgICAgIGFtb3VudDogJz0nLFxuICAgICAgaXNEaXNhYmxlZDogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG4tYmxvY2sgbS10LW1kIG0tYi1tZFwiXFxuJyArXG4gICAgJyAgbmctZGlzYWJsZWQ9XCJ2bS5pc0Rpc2FibGVkXCI+XFxuJyArXG4gICAgJyAgPHNwYW4gbmctaWY9XCIhdm0uaXNEaXNhYmxlZFwiPlxcbicgK1xuICAgICcgICAgUGF5IHt7IDo6dm0uY3VycmVuY3lTeW1ib2wgfX17eyA6OnZtLmFtb3VudCB8IG51bWJlcjoyIH19XFxuJyArXG4gICAgJyAgPC9zcGFuPlxcbicgK1xuICAgICcgIDxzcGFuIG5nLWlmPVwidm0uaXNEaXNhYmxlZFwiPlxcbicgK1xuICAgICcgICAgUHJvY2Vzc2luZyB0aGUgcGF5bWVudC4uLlxcbicgK1xuICAgICcgIDwvc3Bhbj5cXG4nICtcbiAgICAnPC9idXR0b24+JzsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vcGF5bWVudC1jYXJkLWZsaXBwZXIuaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFBheW1lbnRDYXJkRmxpcHBlckNvbXBvbmVudCgpIHtcbiAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge30sXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgYnJhbmQ6ICc9JyxcbiAgICAgIGlzRmxpcHBlZDogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgdHJhbnNjbHVkZTogdHJ1ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gJzxkaXYgY2xhc3M9XCJwYXltZW50LWNhcmQtZmxpcHBlclwiXFxuJyArXG4gICAgJyAgbmctY2xhc3M9XCJ7XFwncGF5bWVudC1jYXJkLWZsaXBwZXItLWZsaXBwZWRcXCcgOiB2bS5pc0ZsaXBwZWR9XCI+XFxuJyArXG4gICAgJyAgPGRpdiBjbGFzcz1cInBheW1lbnQtY2FyZC1mbGlwcGVyX193cmFwcGVyXCI+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC1jYXJkLWZsaXBwZXJfX2Zyb250IHBheW1lbnQtY2FyZC1pY29uXCJcXG4nICtcbiAgICAnICAgICAgbmctY2xhc3M9XCJcXCdwYXltZW50LWNhcmQtaWNvbi0tXFwnICsgdm0uYnJhbmRcIj48L2Rpdj5cXG4nICtcbiAgICAnICAgIDxkaXYgY2xhc3M9XCJwYXltZW50LWNhcmQtZmxpcHBlcl9fYmFjayBwYXltZW50LWNhcmQtaWNvbiBwYXltZW50LWNhcmQtaWNvbi0tYmFja1wiPjwvZGl2PlxcbicgK1xuICAgICcgIDwvZGl2PlxcbicgK1xuICAgICcgIDxuZy10cmFuc2NsdWRlPjwvbmctdHJhbnNjbHVkZT5cXG4nICtcbiAgICAnPC9kaXY+JzsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vc2VjdXJpdHktY29kZS1pbnB1dC5odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gU2VjdXJpdHlDb2RlSW5wdXRDb21wb25lbnQoKSB7XG4gIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHt9LFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGZvY3VzZWQ6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlY3VyaXR5Q29kZVwiIHJlcXVpcmVkXFxuJyArXG4gICAgJyAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBhdXRvY29tcGxldGU9XCJvZmZcIlxcbicgK1xuICAgICcgIHBsYWNlaG9sZGVyPVwiMyBkaWdpdHMgb24gdGhlIGJhY2tcIlxcbicgK1xuICAgICcgIG1heGxlbmd0aD1cIjNcIiBuZy1tYXhsZW5ndGg9XCIzXCJcXG4nICtcbiAgICAnICBuZy1mb2N1cz1cInZtLmZvY3VzZWQgPSB0cnVlXCJcXG4nICtcbiAgICAnICBuZy1ibHVyPVwidm0uZm9jdXNlZCA9IGZhbHNlXCJcXG4nICtcbiAgICAnICBwYXltZW50cy12YWxpZGF0ZT1cImN2Y1wiIHBheW1lbnRzLWZvcm1hdD1cImN2Y1wiIC8+JzsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbmd1bGFyID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2FuZ3VsYXInXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2FuZ3VsYXInXSA6IG51bGwpO1xudmFyIFNlY3VyaXR5Q29kZUlucHV0Q29tcG9uZW50ID1cbiAgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NlY3VyaXR5LWNvZGUtaW5wdXQvc2VjdXJpdHktY29kZS1pbnB1dC5jb21wb25lbnQnKTtcbnZhciBQYXltZW50Q2FyZEZsaXBwZXJDb21wb25lbnQgPVxuICByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGF5bWVudC1jYXJkLWZsaXBwZXIvcGF5bWVudC1jYXJkLWZsaXBwZXIuY29tcG9uZW50Jyk7XG52YXIgUGF5QnV0dG9uQ29tcG9uZW50ID1cbiAgcmVxdWlyZSgnLi9jb21wb25lbnRzL3BheS1idXR0b24vcGF5LWJ1dHRvbi5jb21wb25lbnQnKTtcblxudmFyIGNvbW1vbiA9IGFuZ3VsYXIubW9kdWxlKCd0dy5wYXltZW50Q29tcG9uZW50cy5jb21tb24nLCBbXG4gICdhbmd1bGFyUGF5bWVudHMnLFxuICAndHcuc3R5bGVndWlkZS1jb21wb25lbnRzJ1xuXSk7XG5cbmNvbW1vbi5kaXJlY3RpdmUoJ3R3U2VjdXJpdHlDb2RlSW5wdXQnLCBTZWN1cml0eUNvZGVJbnB1dENvbXBvbmVudCk7XG5jb21tb24uZGlyZWN0aXZlKCd0d1BheW1lbnRDYXJkRmxpcHBlcicsIFBheW1lbnRDYXJkRmxpcHBlckNvbXBvbmVudCk7XG5jb21tb24uZGlyZWN0aXZlKCd0d1BheUJ1dHRvbicsIFBheUJ1dHRvbkNvbXBvbmVudCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL25ldy1jYXJkLWZvcm0uaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE5ld0NhcmRGb3JtQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7fSxcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBjYXJkRGV0YWlsczogJz0nLFxuICAgICAgY3VycmVuY3lTeW1ib2w6ICc9JyxcbiAgICAgIGFtb3VudDogJz0nLFxuICAgICAgb25TdWJtaXQ6ICcmJyxcbiAgICAgIGlzUHJvY2Vzc2luZzogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8Zm9ybSBuYW1lPVwibmV3Q2FyZEZvcm1cIiBub3ZhbGlkYXRlXFxuJyArXG4gICAgJyAgbmctc3VibWl0PVwibmV3Q2FyZEZvcm0uJHZhbGlkICYmIHZtLm9uU3VibWl0KClcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgIDxsYWJlbCBmb3I9XCJuYW1lXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+Q2FyZGhvbGRlciBuYW1lPC9sYWJlbD5cXG4nICtcbiAgICAnICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxcbicgK1xuICAgICcgICAgICBwbGFjZWhvbGRlcj1cIllvdXIgbmFtZSBhcyBpdCBhcHBlYXJzIG9uIHRoZSBjYXJkXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCJcXG4nICtcbiAgICAnICAgICAgbmctbW9kZWw9XCJ2bS5jYXJkRGV0YWlscy5uYW1lXCIgLz5cXG4nICtcbiAgICAnICA8L2Rpdj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgIDxsYWJlbCBmb3I9XCJjYXJkXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+Q2FyZCBudW1iZXI8L2xhYmVsPlxcbicgK1xuICAgICcgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm51bWJlclwiIHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcXG4nICtcbiAgICAnICAgICAgcGxhY2Vob2xkZXI9XCJUaGUgbG9uZyBudW1iZXIgYWNyb3NzIHRoZSBmcm9udFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiXFxuJyArXG4gICAgJyAgICAgIG5nLW1vZGVsPVwidm0uY2FyZERldGFpbHMubnVtYmVyXCJcXG4nICtcbiAgICAnICAgICAgcGF5bWVudHMtdmFsaWRhdGU9XCJjYXJkXCJcXG4nICtcbiAgICAnICAgICAgcGF5bWVudHMtdHlwZS1tb2RlbD1cInZtLmJyYW5kXCJcXG4nICtcbiAgICAnICAgICAgcGF5bWVudHMtZm9ybWF0PVwiY2FyZFwiIC8+XFxuJyArXG4gICAgJyAgICAgIDx0dy1wYXltZW50LWNhcmQtZmxpcHBlclxcbicgK1xuICAgICcgICAgICAgIGNsYXNzPVwidHctbmV3LWNhcmQtZm9ybV9fcGF5bWVudC1jYXJkLWljb25cIlxcbicgK1xuICAgICcgICAgICAgIGJyYW5kPVwidm0uYnJhbmRcIlxcbicgK1xuICAgICcgICAgICAgIGlzLWZsaXBwZWQ9XCJ2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWRcIj5cXG4nICtcbiAgICAnICAgICAgICA8ZGl2IGNsYXNzPVwidHctbmV3LWNhcmQtZm9ybV9fc2VjdXJpdHktY29kZS1saW5lXCJcXG4nICtcbiAgICAnICAgICAgICAgIG5nLWNsYXNzPVwieyBcXCd0dy1uZXctY2FyZC1mb3JtX19zZWN1cml0eS1jb2RlLWxpbmUtLXZpc2libGVcXCcgOlxcbicgK1xuICAgICcgICAgICAgICAgICB2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWQgfVwiPlxcbicgK1xuICAgICcgICAgICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgICA8L3R3LXBheW1lbnQtY2FyZC1mbGlwcGVyPlxcbicgK1xuICAgICcgIDwvZGl2PlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTZcIj5cXG4nICtcbiAgICAnICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4nICtcbiAgICAnICAgICAgICA8bGFiZWwgZm9yPVwiZXhwaXJ5XCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+Q2FyZCBleHBpcnkgZGF0ZTwvbGFiZWw+XFxuJyArXG4gICAgJyAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImV4cGlyeVwiIHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcXG4nICtcbiAgICAnICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTU0gLyBZWVwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiXFxuJyArXG4gICAgJyAgICAgICAgICBuZy1tb2RlbD1cInZtLmNhcmREZXRhaWxzLmV4cGlyeVwiXFxuJyArXG4gICAgJyAgICAgICAgICBwYXltZW50cy12YWxpZGF0ZT1cImV4cGlyeVwiXFxuJyArXG4gICAgJyAgICAgICAgICBwYXltZW50cy1mb3JtYXQ9XCJleHBpcnlcIj5cXG4nICtcbiAgICAnICAgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtNlwiPlxcbicgK1xuICAgICcgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbicgK1xuICAgICcgICAgICAgIDxsYWJlbCBmb3I9XCJzZWN1cml0eUNvZGVcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj5cXG4nICtcbiAgICAnICAgICAgICAgIFNlY3VyaXR5IGNvZGVcXG4nICtcbiAgICAnICAgICAgICAgIDxzcGFuIG5nLWlmPVwidHlwZVwiPlxcbicgK1xuICAgICcgICAgICAgICAgICB7eyB2bS5icmFuZCA9PT0gXFwndmlzYVxcJyA/IFxcJyhDVlYpXFwnIDogXFwnKENWQylcXCd9fVxcbicgK1xuICAgICcgICAgICAgICAgPC9zcGFuPlxcbicgK1xuICAgICcgICAgICAgIDwvbGFiZWw+XFxuJyArXG4gICAgJyAgICAgICAgPHR3LXNlY3VyaXR5LWNvZGUtaW5wdXRcXG4nICtcbiAgICAnICAgICAgICAgIG5nLW1vZGVsPVwidm0uY2FyZERldGFpbHMuc2VjdXJpdHlDb2RlXCJcXG4nICtcbiAgICAnICAgICAgICAgIGZvY3VzZWQ9XCJ2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWRcIj5cXG4nICtcbiAgICAnICAgICAgICA8L3R3LXNlY3VyaXR5LWNvZGUtaW5wdXQ+XFxuJyArXG4gICAgJyAgICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgPC9kaXY+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgIDx0dy1wYXktYnV0dG9uXFxuJyArXG4gICAgJyAgICBjdXJyZW5jeS1zeW1ib2w9XCJ2bS5jdXJyZW5jeVN5bWJvbFwiXFxuJyArXG4gICAgJyAgICBhbW91bnQ9XCJ2bS5hbW91bnRcIlxcbicgK1xuICAgICcgICAgaXMtZGlzYWJsZWQ9XCJ2bS5pc1Byb2Nlc3NpbmdcIj5cXG4nICtcbiAgICAnICA8L3R3LXBheS1idXR0b24+XFxuJyArXG4gICAgJzwvZm9ybT4nOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snYW5ndWxhciddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnYW5ndWxhciddIDogbnVsbCk7XG5yZXF1aXJlKCcuLi9jb21tb24vcGF5bWVudC1jb21wb25lbnRzLmNvbW1vbi5tb2R1bGUnKTtcblxudmFyIE5ld0NhcmRGb3JtQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL25ldy1jYXJkLWZvcm0uY29tcG9uZW50Jyk7XG5cbnZhciBuZXdDYXJkRm9ybSA9IGFuZ3VsYXIubW9kdWxlKCd0dy5wYXltZW50Q29tcG9uZW50cy5uZXdDYXJkRm9ybScsIFtcbiAgJ3R3LnBheW1lbnRDb21wb25lbnRzLmNvbW1vbidcbl0pO1xuXG5uZXdDYXJkRm9ybS5kaXJlY3RpdmUoJ3R3TmV3Q2FyZEZvcm0nLCBOZXdDYXJkRm9ybUNvbXBvbmVudCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYW5ndWxhciA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Wydhbmd1bGFyJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydhbmd1bGFyJ10gOiBudWxsKTtcblxucmVxdWlyZSgnLi9uZXctY2FyZC1mb3JtL3BheW1lbnQtY29tcG9uZW50cy5uZXctY2FyZC1mb3JtLm1vZHVsZScpO1xucmVxdWlyZSgnLi9zYXZlZC1jYXJkcy9wYXltZW50LWNvbXBvbmVudHMuc2F2ZWQtY2FyZHMubW9kdWxlJyk7XG5cbmFuZ3VsYXIubW9kdWxlKCd0dy5wYXltZW50Q29tcG9uZW50cycsIFtcbiAgJ3R3LnBheW1lbnRDb21wb25lbnRzLm5ld0NhcmRGb3JtJyxcbiAgJ3R3LnBheW1lbnRDb21wb25lbnRzLnNhdmVkQ2FyZHMnXG5dKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vc2F2ZWQtY2FyZC5odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gU2F2ZWRDYXJkQ29tcG9uZW50KCkge1xuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogU2F2ZWRDYXJkQ29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBicmFuZDogJz0nLFxuICAgICAgdHlwZTogJz0nLFxuICAgICAgbnVtYmVyOiAnPScsXG4gICAgICByZWZlcmVuY2U6ICc9JyxcbiAgICAgIHNlbGVjdGVkOiAnPScsXG4gICAgICBjdXJyZW5jeVN5bWJvbDogJz0nLFxuICAgICAgYW1vdW50OiAnPScsXG4gICAgICBvblN1Ym1pdDogJyYnLFxuICAgICAgaXNQcm9jZXNzaW5nOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59O1xuXG5mdW5jdGlvbiBTYXZlZENhcmRDb250cm9sbGVyKCkge1xuICB2YXIgdm0gPSB0aGlzO1xuXG4gIHZtLmlzU2VsZWN0ZWQgPSBpc1NlbGVjdGVkO1xuICB2bS5zZWxlY3RDYXJkID0gc2VsZWN0Q2FyZDtcblxuICBmdW5jdGlvbiBzZWxlY3RDYXJkKCkge1xuICAgIGlmICghaXNTZWxlY3RlZCgpKSB7XG4gICAgICB2bS5zZWxlY3RlZCA9IHtyZWZlcmVuY2U6IHZtLnJlZmVyZW5jZX07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTZWxlY3RlZCgpIHtcbiAgICBpZiAoIXZtLnNlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB2bS5zZWxlY3RlZC5yZWZlcmVuY2UgPT09IHZtLnJlZmVyZW5jZTtcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gJzxkaXYgY2xhc3M9XCJ0dy1zYXZlZC1jYXJkXCJcXG4nICtcbiAgICAnICBuZy1jbGFzcz1cInsgXFwnaXMtc2VsZWN0ZWRcXCcgOiB2bS5pc1NlbGVjdGVkKCkgfVwiXFxuJyArXG4gICAgJyAgbmctY2xpY2s9XCJ2bS5zZWxlY3RDYXJkKClcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPHNtYWxsPlxcbicgK1xuICAgICcgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwiYW5pbWF0ZS1vcGFjaXR5IHB1bGwtcmlnaHQgbS10XCJcXG4nICtcbiAgICAnICAgICAgbmctaWY9XCIhdm0uaXNTZWxlY3RlZCgpXCI+XFxuJyArXG4gICAgJyAgICAgIFNlbGVjdCBjYXJkXFxuJyArXG4gICAgJyAgICA8L2E+XFxuJyArXG4gICAgJyAgPC9zbWFsbD5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPHR3LXBheW1lbnQtY2FyZC1mbGlwcGVyXFxuJyArXG4gICAgJyAgICBjbGFzcz1cInR3LXNhdmVkLWNhcmRfX3BheW1lbnQtY2FyZC1pY29uXCJcXG4nICtcbiAgICAnICAgIGJyYW5kPVwidm0uYnJhbmRcIlxcbicgK1xuICAgICcgICAgaXMtZmxpcHBlZD1cInZtLmlzU2VjdXJpdHlDb2RlRm9jdXNlZFwiPlxcbicgK1xuICAgICcgICAgPGRpdiBjbGFzcz1cInR3LXNhdmVkLWNhcmRfX3NlY3VyaXR5LWNvZGUtbGluZVwiXFxuJyArXG4gICAgJyAgICAgIG5nLWNsYXNzPVwieyBcXCd0dy1zYXZlZC1jYXJkX19zZWN1cml0eS1jb2RlLWxpbmUtLXZpc2libGVcXCcgOlxcbicgK1xuICAgICcgICAgICAgIHZtLmlzU2VjdXJpdHlDb2RlRm9jdXNlZCB9XCI+XFxuJyArXG4gICAgJyAgICA8L2Rpdj5cXG4nICtcbiAgICAnICA8L3R3LXBheW1lbnQtY2FyZC1mbGlwcGVyPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8c3BhbiBjbGFzcz1cInRleHQtY2FwaXRhbGl6ZSB0dy1zYXZlZC1jYXJkX19icmFuZC10eXBlXCI+XFxuJyArXG4gICAgJyAgICB7eyA6OnZtLmJyYW5kIH19IHt7IDo6dm0udHlwZSB8IGxvd2VyY2FzZSB9fVxcbicgK1xuICAgICcgIDwvc3Bhbj5cXG4nICtcbiAgICAnICA8c21hbGwgY2xhc3M9XCJ0dy1zYXZlZC1jYXJkX19udW1iZXJcIj5FbmRpbmcgaW4ge3sgOjp2bS5udW1iZXIgfX08L3NtYWxsPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8Zm9ybSBuYW1lPVwic2F2ZWRDYXJkUGF5bWVudEZvcm1cIiBub3ZhbGlkYXRlXFxuJyArXG4gICAgJyAgICBjbGFzcz1cImFuaW1hdGUtb3BhY2l0eVwiXFxuJyArXG4gICAgJyAgICBuZy1pZj1cInZtLmlzU2VsZWN0ZWQoKVwiXFxuJyArXG4gICAgJyAgICBuZy1zdWJtaXQ9XCJzYXZlZENhcmRQYXltZW50Rm9ybS4kdmFsaWQgJiYgdm0ub25TdWJtaXQoKVwiPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4nICtcbiAgICAnICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS04IGNvbC1tZC02XCI+XFxuJyArXG4gICAgJyAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbS1iIG0tdC1tZFwiPlxcbicgK1xuICAgICcgICAgICAgICAgPGxhYmVsIGNsYXNzPVwidHctc2F2ZWQtY2FyZF9fc2VjdXJpdHktY29kZS1sYWJlbFxcbicgK1xuICAgICcgICAgICAgICAgICBjb250cm9sLWxhYmVsXCI+XFxuJyArXG4gICAgJyAgICAgICAgICAgIFBsZWFzZSByZS1lbnRlciB5b3VyXFxuJyArXG4gICAgJyAgICAgICAgICAgIDxzcGFuIG5nLWlmPVwidm0uYnJhbmRcIj5cXG4nICtcbiAgICAnICAgICAgICAgICAgICB7eyB2bS5icmFuZCA9PT0gXFwndmlzYVxcJyA/IFxcJ0NWVlxcJyA6IFxcJ0NWQ1xcJyB9fVxcbicgK1xuICAgICcgICAgICAgICAgICA8L3NwYW4+XFxuJyArXG4gICAgJyAgICAgICAgICA8L2xhYmVsPlxcbicgK1xuICAgICcgICAgICAgICAgPHR3LXNlY3VyaXR5LWNvZGUtaW5wdXRcXG4nICtcbiAgICAnICAgICAgICAgICAgbmctbW9kZWw9XCJ2bS5zZWxlY3RlZC5zZWN1cml0eUNvZGVcIlxcbicgK1xuICAgICcgICAgICAgICAgICBmb2N1c2VkPVwidm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkXCI+XFxuJyArXG4gICAgJyAgICAgICAgICA8L3R3LXNlY3VyaXR5LWNvZGUtaW5wdXQ+XFxuJyArXG4gICAgJyAgICAgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgPC9kaXY+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgICAgPHR3LXBheS1idXR0b25cXG4nICtcbiAgICAnICAgICAgY3VycmVuY3ktc3ltYm9sPVwidm0uY3VycmVuY3lTeW1ib2xcIlxcbicgK1xuICAgICcgICAgICBhbW91bnQ9XCJ2bS5hbW91bnRcIlxcbicgK1xuICAgICcgICAgICBpcy1kaXNhYmxlZD1cInZtLmlzUHJvY2Vzc2luZ1wiPlxcbicgK1xuICAgICcgICAgPC90dy1wYXktYnV0dG9uPlxcbicgK1xuICAgICcgIDwvZm9ybT5cXG4nICtcbiAgICAnPC9kaXY+JzsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vc2F2ZWQtY2FyZHMuaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFNhdmVkQ2FyZHNDb21wb25lbnQoKSB7XG4gIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiBTYXZlZENhcmRzQ29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgY2FyZHM6ICc9JyxcbiAgICAgIHNlbGVjdGVkOiAnPScsXG4gICAgICBjdXJyZW5jeVN5bWJvbDogJz0nLFxuICAgICAgYW1vdW50OiAnPScsXG4gICAgICBvblN1Ym1pdDogJyYnLFxuICAgICAgaXNQcm9jZXNzaW5nOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59O1xuXG5mdW5jdGlvbiBTYXZlZENhcmRzQ29udHJvbGxlcigpIHtcbiAgdmFyIHZtID0gdGhpcztcblxuICB2bS5nZXRCcmFuZEZyb21WYXJpYW50ID0gZ2V0QnJhbmRGcm9tVmFyaWFudDtcblxuICBmdW5jdGlvbiBnZXRCcmFuZEZyb21WYXJpYW50KHZhcmlhbnQpIHtcbiAgICB2YXJpYW50ID0gdmFyaWFudC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKHZhcmlhbnQuaW5kZXhPZigndmlzYScpID4gLTEpIHtcbiAgICAgIHJldHVybiAndmlzYSc7XG4gICAgfSBlbHNlIGlmICh2YXJpYW50LmluZGV4T2YoJ21jJykgPiAtMSkge1xuICAgICAgcmV0dXJuICdtYXN0ZXJjYXJkJztcbiAgICB9IGVsc2UgaWYgKHZhcmlhbnQuaW5kZXhPZignYmlqJykgPiAtMSB8fMKgdmFyaWFudC5pbmRleE9mKCdtYWVzdHJvJykgPiAtMSkge1xuICAgICAgcmV0dXJuICdtYWVzdHJvJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhcmlhbnQ7XG4gICAgfVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHMgPSAnPHR3LXNhdmVkLWNhcmRcXG4nICtcbiAgICAnICBuZy1yZXBlYXQ9XCJjYXJkIGluIHZtLmNhcmRzIHRyYWNrIGJ5IGNhcmQuYWR5ZW5SZWN1cnJpbmdEZXRhaWxSZWZlcmVuY2VcIlxcbicgK1xuICAgICcgIGJyYW5kPVwidm0uZ2V0QnJhbmRGcm9tVmFyaWFudChjYXJkLmFkeWVuVmFyaWFudClcIlxcbicgK1xuICAgICcgIHR5cGU9XCJjYXJkLmNhcmRUeXBlXCJcXG4nICtcbiAgICAnICBudW1iZXI9XCJjYXJkLmNhcmROdW1iZXJcIlxcbicgK1xuICAgICcgIHJlZmVyZW5jZT1cImNhcmQuYWR5ZW5SZWN1cnJpbmdEZXRhaWxSZWZlcmVuY2VcIlxcbicgK1xuICAgICcgIHNlbGVjdGVkPVwidm0uc2VsZWN0ZWRcIlxcbicgK1xuICAgICcgIGN1cnJlbmN5LXN5bWJvbD1cInZtLmN1cnJlbmN5U3ltYm9sXCJcXG4nICtcbiAgICAnICBhbW91bnQ9XCJ2bS5hbW91bnRcIlxcbicgK1xuICAgICcgIG9uLXN1Ym1pdD1cInZtLm9uU3VibWl0KClcIlxcbicgK1xuICAgICcgIGlzLXByb2Nlc3Npbmc9XCJ2bS5pc1Byb2Nlc3NpbmdcIj5cXG4nICtcbiAgICAnPC90dy1zYXZlZC1jYXJkPic7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYW5ndWxhciA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Wydhbmd1bGFyJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydhbmd1bGFyJ10gOiBudWxsKTtcbnJlcXVpcmUoJy4uL2NvbW1vbi9wYXltZW50LWNvbXBvbmVudHMuY29tbW9uLm1vZHVsZScpO1xuXG52YXIgU2F2ZWRDYXJkQ29tcG9uZW50ID1cbiAgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NhdmVkLWNhcmQvc2F2ZWQtY2FyZC5jb21wb25lbnQnKTtcbnZhciBTYXZlZENhcmRzQ29tcG9uZW50ID1cbiAgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NhdmVkLWNhcmRzL3NhdmVkLWNhcmRzLmNvbXBvbmVudCcpO1xuXG52YXIgc2F2ZWRDYXJkcyA9IGFuZ3VsYXIubW9kdWxlKCd0dy5wYXltZW50Q29tcG9uZW50cy5zYXZlZENhcmRzJywgW1xuICAndHcucGF5bWVudENvbXBvbmVudHMuY29tbW9uJ1xuXSk7XG5cbnNhdmVkQ2FyZHMuZGlyZWN0aXZlKCd0d1NhdmVkQ2FyZCcsIFNhdmVkQ2FyZENvbXBvbmVudCk7XG5zYXZlZENhcmRzLmRpcmVjdGl2ZSgndHdTYXZlZENhcmRzJywgU2F2ZWRDYXJkc0NvbXBvbmVudCk7Il19
