'use strict';

var angular = require('angular');

require('./payment-components.new-card-form.module');
require('./payment-components.saved-cards.module');

angular.module('tw.paymentComponents', [
  'tw.paymentComponents.newCardForm',
  'tw.paymentComponents.savedCards'
]);