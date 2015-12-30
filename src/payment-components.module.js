'use strict';

var angular = require('angular');

require('./new-card-form/payment-components.new-card-form.module');
require('./saved-cards/payment-components.saved-cards.module');

angular.module('tw.paymentComponents', [
  'tw.paymentComponents.newCardForm',
  'tw.paymentComponents.savedCards'
]);