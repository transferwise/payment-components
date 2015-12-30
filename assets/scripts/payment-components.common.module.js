'use strict';

var SecurityCodeInputComponent = require('./security-code-input.component');
var PaymentCardFlipperComponent = require('./payment-card-flipper.component');
var PayButtonComponent = require('./pay-button.component');

var common = angular.module('tw.paymentComponents.common', [
  'angularPayments',
  'tw.styleguide-components'
]);

common.directive('twSecurityCodeInput', SecurityCodeInputComponent);
common.directive('twPaymentCardFlipper', PaymentCardFlipperComponent);
common.directive('twPayButton', PayButtonComponent);