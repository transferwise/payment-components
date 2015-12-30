'use strict';

var angular = require('angular');
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