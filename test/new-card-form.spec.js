'use strict';

require('../assets/scripts/payment-components.module');

describe('NewCardFormComponent', function() {
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

    it('should be called in parent scope when form has been submitted', function() {
      var nameInput = findElements('[name$="name"]');
      var numberInput = findElements('[name$="number"]');
      var expiryInput = findElements('[name$="expiry"]');
      var securityCodeInput = findElements('[name$="securityCode"]');

      nameInput.val('Bob').triggerHandler('input');
      numberInput.val('4242 4242 4242 4242').triggerHandler('input');
      expiryInput.val('08 / 18').triggerHandler('input');
      securityCodeInput.val('737').triggerHandler('input');
      
      directiveElem.triggerHandler('submit');

      expect($scope.onSubmit).toHaveBeenCalled();
    });
  });

  function findElements(query) {
    return angular.element(directiveElem[0].querySelectorAll(query));
  }

  var CURRENCY_SYMBOL = '£';
  var AMOUNT = 3.14;
  var IS_PROCESSING = false;

  var DEFAULT_SCOPE = {
    cardDetails: {},
    currencySymbol: CURRENCY_SYMBOL,
    amount: AMOUNT,
    onSubmit: jasmine.createSpy('onSubmit'),
    isProcessing: IS_PROCESSING
  };

  var TEMPLATE = '<tw-new-card-form ' +
    'card-details="cardDetails" ' +
    'currency-symbol="currencySymbol" ' +
    'amount="amount" ' +
    'on-submit="onSubmit()" ' +
    'is-processing="isProcessing">' +
  '</tw-new-card-form>';

  function initiateDirective(scope, template) {
    angular.extend($scope, scope);
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    directiveElem = compiledElement;
    isolatedScope = directiveElem.isolateScope();
  }
});