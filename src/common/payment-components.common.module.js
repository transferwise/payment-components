'use strict';

var angular = require('angular');
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