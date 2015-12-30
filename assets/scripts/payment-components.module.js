'use strict';

var angular = require('angular');
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