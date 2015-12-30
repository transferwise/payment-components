'use strict';

var angular = require('angular');
require('../common/payment-components.common.module');

var NewCardFormComponent = require('./components/new-card-form.component');

var newCardForm = angular.module('tw.paymentComponents.newCardForm', [
  'tw.paymentComponents.common'
]);

newCardForm.directive('twNewCardForm', NewCardFormComponent);