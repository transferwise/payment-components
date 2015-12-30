'use strict';

require('./payment-components.common.module');

var NewCardFormComponent = require('./new-card-form.component');

var newCardForm = angular.module('tw.paymentComponents.newCardForm', [
  'tw.paymentComponents.common'
]);

newCardForm.directive('twNewCardForm', NewCardFormComponent);