'use strict';

require('../src/payment-components.module');

describe('PayButtonComponent', function() {
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
    var scope = {
      currencySymbol: CURRENCY_SYMBOL,
      amount: AMOUNT,
      isDisabled: false
    };
    initiateDirective(scope, TEMPLATE);
  });

  describe('button', function() {

    describe('when disabled is false', function() {

      it('should show correct text', function() {
        expect(directiveElem.text().trim())
          .toBe('Pay ' + CURRENCY_SYMBOL + AMOUNT);
      });

      it('should not be disabled', function() {
        expect(directiveElem.attr('disabled')).toBeUndefined;
      });
    });

    describe('when disabled is true', function() {
      beforeEach(function() {
        $scope.isDisabled = true;
        $scope.$digest();
      });

      it('should show processing text', function() {
        expect(directiveElem.text().trim())
          .toBe('Processing the payment...');
      });

      it('should not be disabled', function() {
        expect(directiveElem.attr('disabled')).toBe('disabled');
      });
    });
  });

  var CURRENCY_SYMBOL = '£';
  var AMOUNT = 3.14;
  var TEMPLATE = '<tw-pay-button ' +
    'currency-symbol="currencySymbol" ' +
    'amount="amount" ' +
    'is-disabled="isDisabled">' +
    '</tw-pay-button>';

  function initiateDirective(scope, template) {
    angular.extend($scope, scope);
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    directiveElem = compiledElement;
    isolatedScope = directiveElem.isolateScope();
  }
});