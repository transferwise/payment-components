'use strict';

require('./payment-components.common.module');

var SavedCardComponent = require('./saved-card.component');
var SavedCardsComponent = require('./saved-cards.component');

var savedCards = angular.module('tw.paymentComponents.savedCards', [
  'tw.paymentComponents.common'
]);

savedCards.directive('twSavedCard', SavedCardComponent);
savedCards.directive('twSavedCards', SavedCardsComponent);