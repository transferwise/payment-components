(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);
var SavedCardComponent = require('./saved-card.component');
var SavedCardsComponent = require('./saved-cards.component');

var module = angular.module('tw.paymentComponents', [
  'ngAnimate', 'angularPayments'
]);
module.directive('twSavedCard', SavedCardComponent);
module.directive('twSavedCards', SavedCardsComponent);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./saved-card.component":2,"./saved-cards.component":3}],2:[function(require,module,exports){
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
},{"../templates/saved-card.html":4}],3:[function(require,module,exports){
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
},{"../templates/saved-cards.html":5}],4:[function(require,module,exports){
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
    '  <div class="tw-saved-card__card-flip-container"\n' +
    '    ng-class="{\'show-back\' : vm.isSecurityCodeFocused}">\n' +
    '    <div class="tw-saved-card__card-flipper">\n' +
    '      <div class="tw-saved-card__card-front payment-card-icon"\n' +
    '        ng-class="\'payment-card-icon-\' + vm.brand"></div>\n' +
    '      <div class="tw-saved-card__card-back"></div>\n' +
    '    </div>\n' +
    '    <div class="tw-saved-card__card-cvc-line"></div>\n' +
    '  </div>\n' +
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
    '          <input type="text" name="savedCardSecurityCode" required\n' +
    '            class="form-control" autocomplete="off"\n' +
    '            placeholder="3 digits on the back"\n' +
    '            maxlength="3" ng-maxlength="3" \n' +
    '            ng-model="vm.selected.securityCode"\n' +
    '            ng-focus="vm.isSecurityCodeFocused = true"\n' +
    '            ng-blur="vm.isSecurityCodeFocused = false"\n' +
    '            payments-validate="cvc"\n' +
    '            payments-type-model="vm.brand"\n' +
    '            payments-format="cvc" />\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <button type="submit" class="btn btn-success btn-block m-t-lg m-b"\n' +
    '      ng-disabled="vm.isProcessing">\n' +
    '      <span ng-if="!vm.isProcessing">\n' +
    '        Pay\n' +
    '        {{ ::vm.currencySymbol }}{{ ::vm.amount | number:2 }}\n' +
    '      </span>\n' +
    '      <span ng-if="vm.isProcessing">\n' +
    '        Processing the payment...\n' +
    '      </span>\n' +
    '    </button>\n' +
    '  </form>\n' +
    '</div>';
},{}],5:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc2NyaXB0cy9wYXltZW50LWNvbXBvbmVudHMubW9kdWxlLmpzIiwiYXNzZXRzL3NjcmlwdHMvc2F2ZWQtY2FyZC5jb21wb25lbnQuanMiLCJhc3NldHMvc2NyaXB0cy9zYXZlZC1jYXJkcy5jb21wb25lbnQuanMiLCJhc3NldHMvdGVtcGxhdGVzL3NhdmVkLWNhcmQuaHRtbCIsImFzc2V0cy90ZW1wbGF0ZXMvc2F2ZWQtY2FyZHMuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbmd1bGFyID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2FuZ3VsYXInXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2FuZ3VsYXInXSA6IG51bGwpO1xudmFyIFNhdmVkQ2FyZENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc2F2ZWQtY2FyZC5jb21wb25lbnQnKTtcbnZhciBTYXZlZENhcmRzQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9zYXZlZC1jYXJkcy5jb21wb25lbnQnKTtcblxudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCd0dy5wYXltZW50Q29tcG9uZW50cycsIFtcbiAgJ25nQW5pbWF0ZScsICdhbmd1bGFyUGF5bWVudHMnXG5dKTtcbm1vZHVsZS5kaXJlY3RpdmUoJ3R3U2F2ZWRDYXJkJywgU2F2ZWRDYXJkQ29tcG9uZW50KTtcbm1vZHVsZS5kaXJlY3RpdmUoJ3R3U2F2ZWRDYXJkcycsIFNhdmVkQ2FyZHNDb21wb25lbnQpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi4vdGVtcGxhdGVzL3NhdmVkLWNhcmQuaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFNhdmVkQ2FyZENvbXBvbmVudCgpIHtcbiAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IFNhdmVkQ2FyZENvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgYnJhbmQ6ICc9JyxcbiAgICAgIHR5cGU6ICc9JyxcbiAgICAgIG51bWJlcjogJz0nLFxuICAgICAgcmVmZXJlbmNlOiAnPScsXG4gICAgICBzZWxlY3RlZDogJz0nLFxuICAgICAgY3VycmVuY3lTeW1ib2w6ICc9JyxcbiAgICAgIGFtb3VudDogJz0nLFxuICAgICAgb25TdWJtaXQ6ICcmJyxcbiAgICAgIGlzUHJvY2Vzc2luZzogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufTtcblxuZnVuY3Rpb24gU2F2ZWRDYXJkQ29udHJvbGxlcigpIHtcbiAgdmFyIHZtID0gdGhpcztcblxuICB2bS5pc1NlbGVjdGVkID0gaXNTZWxlY3RlZDtcbiAgdm0uc2VsZWN0Q2FyZCA9IHNlbGVjdENhcmQ7XG5cbiAgZnVuY3Rpb24gc2VsZWN0Q2FyZCgpIHtcbiAgICBpZiAoIWlzU2VsZWN0ZWQoKSkge1xuICAgICAgdm0uc2VsZWN0ZWQgPSB7cmVmZXJlbmNlOiB2bS5yZWZlcmVuY2V9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU2VsZWN0ZWQoKSB7XG4gICAgaWYgKCF2bS5zZWxlY3RlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdm0uc2VsZWN0ZWQucmVmZXJlbmNlID09PSB2bS5yZWZlcmVuY2U7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuLi90ZW1wbGF0ZXMvc2F2ZWQtY2FyZHMuaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFNhdmVkQ2FyZHNDb21wb25lbnQoKSB7XG4gIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiBTYXZlZENhcmRzQ29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgY2FyZHM6ICc9JyxcbiAgICAgIHNlbGVjdGVkOiAnPScsXG4gICAgICBjdXJyZW5jeVN5bWJvbDogJz0nLFxuICAgICAgYW1vdW50OiAnPScsXG4gICAgICBvblN1Ym1pdDogJyYnLFxuICAgICAgaXNQcm9jZXNzaW5nOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICB9O1xuXG4gIHJldHVybiBkaXJlY3RpdmU7XG59XG5cbmZ1bmN0aW9uIFNhdmVkQ2FyZHNDb250cm9sbGVyKCkge1xuICB2YXIgdm0gPSB0aGlzO1xuXG4gIHZtLmdldEJyYW5kRnJvbVZhcmlhbnQgPSBnZXRCcmFuZEZyb21WYXJpYW50O1xuXG4gIGZ1bmN0aW9uIGdldEJyYW5kRnJvbVZhcmlhbnQodmFyaWFudCkge1xuICAgIHZhcmlhbnQgPSB2YXJpYW50LnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAodmFyaWFudC5pbmRleE9mKCd2aXNhJykgPiAtMSkge1xuICAgICAgcmV0dXJuICd2aXNhJztcbiAgICB9IGVsc2UgaWYgKHZhcmlhbnQuaW5kZXhPZignbWMnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gJ21hc3RlcmNhcmQnO1xuICAgIH0gZWxzZSBpZiAodmFyaWFudC5pbmRleE9mKCdiaWonKSA+IC0xXG4gICAgICB8fMKgdmFyaWFudC5pbmRleE9mKCdtYWVzdHJvJykgPiAtMSkge1xuICAgICAgcmV0dXJuICdtYWVzdHJvJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhcmlhbnQ7XG4gICAgfVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHMgPSAnPGRpdiBjbGFzcz1cInR3LXNhdmVkLWNhcmRcIlxcbicgK1xuICAgICcgIG5nLWNsYXNzPVwieyBcXCdpcy1zZWxlY3RlZFxcJyA6IHZtLmlzU2VsZWN0ZWQoKSB9XCJcXG4nICtcbiAgICAnICBuZy1jbGljaz1cInZtLnNlbGVjdENhcmQoKVwiPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8c21hbGw+XFxuJyArXG4gICAgJyAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJhbmltYXRlLW9wYWNpdHkgcHVsbC1yaWdodCBtLXRcIlxcbicgK1xuICAgICcgICAgICBuZy1pZj1cIiF2bS5pc1NlbGVjdGVkKClcIj5cXG4nICtcbiAgICAnICAgICAgU2VsZWN0IGNhcmRcXG4nICtcbiAgICAnICAgIDwvYT5cXG4nICtcbiAgICAnICA8L3NtYWxsPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnICA8ZGl2IGNsYXNzPVwidHctc2F2ZWQtY2FyZF9fY2FyZC1mbGlwLWNvbnRhaW5lclwiXFxuJyArXG4gICAgJyAgICBuZy1jbGFzcz1cIntcXCdzaG93LWJhY2tcXCcgOiB2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWR9XCI+XFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwidHctc2F2ZWQtY2FyZF9fY2FyZC1mbGlwcGVyXCI+XFxuJyArXG4gICAgJyAgICAgIDxkaXYgY2xhc3M9XCJ0dy1zYXZlZC1jYXJkX19jYXJkLWZyb250IHBheW1lbnQtY2FyZC1pY29uXCJcXG4nICtcbiAgICAnICAgICAgICBuZy1jbGFzcz1cIlxcJ3BheW1lbnQtY2FyZC1pY29uLVxcJyArIHZtLmJyYW5kXCI+PC9kaXY+XFxuJyArXG4gICAgJyAgICAgIDxkaXYgY2xhc3M9XCJ0dy1zYXZlZC1jYXJkX19jYXJkLWJhY2tcIj48L2Rpdj5cXG4nICtcbiAgICAnICAgIDwvZGl2PlxcbicgK1xuICAgICcgICAgPGRpdiBjbGFzcz1cInR3LXNhdmVkLWNhcmRfX2NhcmQtY3ZjLWxpbmVcIj48L2Rpdj5cXG4nICtcbiAgICAnICA8L2Rpdj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWNhcGl0YWxpemUgdHctc2F2ZWQtY2FyZF9fYnJhbmQtdHlwZVwiPlxcbicgK1xuICAgICcgICAge3sgOjp2bS5icmFuZCB9fSB7eyA6OnZtLnR5cGUgfCBsb3dlcmNhc2UgfX1cXG4nICtcbiAgICAnICA8L3NwYW4+XFxuJyArXG4gICAgJyAgPHNtYWxsIGNsYXNzPVwidHctc2F2ZWQtY2FyZF9fbnVtYmVyXCI+RW5kaW5nIGluIHt7IDo6dm0ubnVtYmVyIH19PC9zbWFsbD5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgPGZvcm0gbmFtZT1cInNhdmVkQ2FyZFBheW1lbnRGb3JtXCIgbm92YWxpZGF0ZVxcbicgK1xuICAgICcgICAgY2xhc3M9XCJhbmltYXRlLW9wYWNpdHlcIlxcbicgK1xuICAgICcgICAgbmctaWY9XCJ2bS5pc1NlbGVjdGVkKClcIlxcbicgK1xuICAgICcgICAgbmctc3VibWl0PVwic2F2ZWRDYXJkUGF5bWVudEZvcm0uJHZhbGlkICYmIHZtLm9uU3VibWl0KClcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuJyArXG4gICAgJyAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOCBjb2wtbWQtNlwiPlxcbicgK1xuICAgICcgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG0tYiBtLXQtbWRcIj5cXG4nICtcbiAgICAnICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInR3LXNhdmVkLWNhcmRfX3NlY3VyaXR5LWNvZGUtbGFiZWxcXG4nICtcbiAgICAnICAgICAgICAgICAgY29udHJvbC1sYWJlbFwiPlxcbicgK1xuICAgICcgICAgICAgICAgICBQbGVhc2UgcmUtZW50ZXIgeW91clxcbicgK1xuICAgICcgICAgICAgICAgICA8c3BhbiBuZy1pZj1cInZtLmJyYW5kXCI+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAge3sgdm0uYnJhbmQgPT09IFxcJ3Zpc2FcXCcgPyBcXCdDVlZcXCcgOiBcXCdDVkNcXCcgfX1cXG4nICtcbiAgICAnICAgICAgICAgICAgPC9zcGFuPlxcbicgK1xuICAgICcgICAgICAgICAgPC9sYWJlbD5cXG4nICtcbiAgICAnICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzYXZlZENhcmRTZWN1cml0eUNvZGVcIiByZXF1aXJlZFxcbicgK1xuICAgICcgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiXFxuJyArXG4gICAgJyAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMyBkaWdpdHMgb24gdGhlIGJhY2tcIlxcbicgK1xuICAgICcgICAgICAgICAgICBtYXhsZW5ndGg9XCIzXCIgbmctbWF4bGVuZ3RoPVwiM1wiIFxcbicgK1xuICAgICcgICAgICAgICAgICBuZy1tb2RlbD1cInZtLnNlbGVjdGVkLnNlY3VyaXR5Q29kZVwiXFxuJyArXG4gICAgJyAgICAgICAgICAgIG5nLWZvY3VzPVwidm0uaXNTZWN1cml0eUNvZGVGb2N1c2VkID0gdHJ1ZVwiXFxuJyArXG4gICAgJyAgICAgICAgICAgIG5nLWJsdXI9XCJ2bS5pc1NlY3VyaXR5Q29kZUZvY3VzZWQgPSBmYWxzZVwiXFxuJyArXG4gICAgJyAgICAgICAgICAgIHBheW1lbnRzLXZhbGlkYXRlPVwiY3ZjXCJcXG4nICtcbiAgICAnICAgICAgICAgICAgcGF5bWVudHMtdHlwZS1tb2RlbD1cInZtLmJyYW5kXCJcXG4nICtcbiAgICAnICAgICAgICAgICAgcGF5bWVudHMtZm9ybWF0PVwiY3ZjXCIgLz5cXG4nICtcbiAgICAnICAgICAgICA8L2Rpdj5cXG4nICtcbiAgICAnICAgICAgPC9kaXY+XFxuJyArXG4gICAgJyAgICA8L2Rpdj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJyAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG4tYmxvY2sgbS10LWxnIG0tYlwiXFxuJyArXG4gICAgJyAgICAgIG5nLWRpc2FibGVkPVwidm0uaXNQcm9jZXNzaW5nXCI+XFxuJyArXG4gICAgJyAgICAgIDxzcGFuIG5nLWlmPVwiIXZtLmlzUHJvY2Vzc2luZ1wiPlxcbicgK1xuICAgICcgICAgICAgIFBheVxcbicgK1xuICAgICcgICAgICAgIHt7IDo6dm0uY3VycmVuY3lTeW1ib2wgfX17eyA6OnZtLmFtb3VudCB8IG51bWJlcjoyIH19XFxuJyArXG4gICAgJyAgICAgIDwvc3Bhbj5cXG4nICtcbiAgICAnICAgICAgPHNwYW4gbmctaWY9XCJ2bS5pc1Byb2Nlc3NpbmdcIj5cXG4nICtcbiAgICAnICAgICAgICBQcm9jZXNzaW5nIHRoZSBwYXltZW50Li4uXFxuJyArXG4gICAgJyAgICAgIDwvc3Bhbj5cXG4nICtcbiAgICAnICAgIDwvYnV0dG9uPlxcbicgK1xuICAgICcgIDwvZm9ybT5cXG4nICtcbiAgICAnPC9kaXY+JzsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8dHctc2F2ZWQtY2FyZFxcbicgK1xuICAgICcgIG5nLXJlcGVhdD1cImNhcmQgaW4gdm0uY2FyZHMgdHJhY2sgYnkgY2FyZC5hZHllblJlY3VycmluZ0RldGFpbFJlZmVyZW5jZVwiXFxuJyArXG4gICAgJyAgYnJhbmQ9XCJ2bS5nZXRCcmFuZEZyb21WYXJpYW50KGNhcmQuYWR5ZW5WYXJpYW50KVwiXFxuJyArXG4gICAgJyAgdHlwZT1cImNhcmQuY2FyZFR5cGVcIlxcbicgK1xuICAgICcgIG51bWJlcj1cImNhcmQuY2FyZE51bWJlclwiXFxuJyArXG4gICAgJyAgcmVmZXJlbmNlPVwiY2FyZC5hZHllblJlY3VycmluZ0RldGFpbFJlZmVyZW5jZVwiXFxuJyArXG4gICAgJyAgc2VsZWN0ZWQ9XCJ2bS5zZWxlY3RlZFwiXFxuJyArXG4gICAgJyAgY3VycmVuY3ktc3ltYm9sPVwidm0uY3VycmVuY3lTeW1ib2xcIlxcbicgK1xuICAgICcgIGFtb3VudD1cInZtLmFtb3VudFwiXFxuJyArXG4gICAgJyAgb24tc3VibWl0PVwidm0ub25TdWJtaXQoKVwiXFxuJyArXG4gICAgJyAgaXMtcHJvY2Vzc2luZz1cInZtLmlzUHJvY2Vzc2luZ1wiPlxcbicgK1xuICAgICc8L3R3LXNhdmVkLWNhcmQ+JzsiXX0=
