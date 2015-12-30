'use strict';

require('../assets/scripts/payment-components.module');

describe('SavedCardsComponent', function() {
  var $compile,
    $rootScope,
    $scope,
    directiveElem,
    isolatedScope;

  beforeEach(function() {
    angular.mock.module('tw.paymentComponents');
  });

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $compile = $injector.get('$compile');
  }));

  beforeEach(function() {
    var scope = DEFAULT_SCOPE;
    initiateDirective(scope, TEMPLATE);
  });

  it('should show all cards in cards', function() {
    expect(directiveElem.children().length).toEqual(SAVED_CARDS.length);
  });

  describe('savedCards', function() {

    it('should be passed to isolated scope', function() {
      expect(isolatedScope.vm.cards).toBe(SAVED_CARDS);
    });
  });

  describe('selected', function() {

    it('should be passed to isolated scope', function() {
      expect(isolatedScope.vm.selected).toBe(SELECTED_SAVED_CARD);
    });

    it('should be passed from isolated scope to scope', function() {
      var expectedSelected = SELECTED_SAVED_CARD + 1;

      isolatedScope.vm.selected = expectedSelected;
      $scope.$digest();

      expect($scope.selectedSavedCard).toBe(expectedSelected);
    });
  });

  describe('currencySymbol', function() {

    it('should be passed to isolated scope', function() {
      expect(isolatedScope.vm.currencySymbol).toEqual(CURRENCY_SYMBOL);
    });
  });

  describe('amount', function() {

    it('should be passed to isolated scope', function() {
      expect(isolatedScope.vm.amount).toEqual(AMOUNT);
    });
  });

  describe('isProcessing', function() {

    it('should be passed to isolated scope', function() {
      expect(isolatedScope.vm.isProcessing).toEqual(IS_PROCESSING);
    });
  });

  describe('onSubmit', function() {

    it('should be called in scope when invoked from isolated scope', function() {
      isolatedScope.vm.onSubmit();

      expect($scope.onSubmit).toHaveBeenCalled();
    });
  });

  describe('getBrandFromVariant', function() {

    it('should detect visa card correctly', function() {
      expect(isolatedScope.vm.getBrandFromVariant('visagold'))
        .toEqual(VISA_BRAND);
    });

    it('should detect mastercard card correctly', function() {
      expect(isolatedScope.vm.getBrandFromVariant('mcdebit'))
        .toEqual(MASTERCARD_BRAND);
    });

    it('should detect maestro card correctly', function() {
      expect(isolatedScope.vm.getBrandFromVariant('maestrouk'))
        .toEqual(MAESTRO_BRAND);
      expect(isolatedScope.vm.getBrandFromVariant('bij'))
        .toEqual(MAESTRO_BRAND);
    });

    it('should fall back to the original variant if not visa, mastercard or maestro', function() {
      expect(isolatedScope.vm.getBrandFromVariant('americanexpress'))
        .toEqual('americanexpress');
    });
  });

  function findElements(query) {
    return angular.element(directiveElem[0].querySelectorAll(query));
  }

  var CARD_VISA = {
    cardType: 'DEBIT',
    cardNumber: 1234,
    adyenRecurringDetailReference: 2,
    adyenVariant: 'visa'
  };
  var CARD_MASTERCARD = {
    cardType: 'CREDIT',
    cardNumber: 5678,
    adyenRecurringDetailReference: 3,
    adyenVariant: 'mc'
  };
  var SAVED_CARDS = [CARD_VISA, CARD_MASTERCARD];
  var SELECTED_SAVED_CARD = 4;
  var CURRENCY_SYMBOL = '€';
  var AMOUNT = 100;
  var IS_PROCESSING = false;

  var VISA_BRAND = 'visa';
  var MASTERCARD_BRAND = 'mastercard';
  var MAESTRO_BRAND = 'maestro';

  var DEFAULT_SCOPE = {
    savedCards: SAVED_CARDS,
    selectedSavedCard: SELECTED_SAVED_CARD,
    currencySymbol: CURRENCY_SYMBOL,
    amount: AMOUNT,
    onSubmit: jasmine.createSpy('onSubmit'),
    isProcessing: IS_PROCESSING
  };

  var TEMPLATE = '<tw-saved-cards ' +
    'cards="savedCards" ' +
    'selected="selectedSavedCard" ' +
    'currency-symbol="currencySymbol" ' +
    'amount="amount" ' +
    'on-submit="onSubmit()" ' +
    'is-processing="isProcessing">' +
  '</tw-saved-cards>';

  function initiateDirective(scope, template) {
    angular.extend($scope, scope);
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    directiveElem = compiledElement;
    isolatedScope = directiveElem.isolateScope();
  }
});