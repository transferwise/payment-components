'use strict';

require('../assets/scripts/payment-components.module');

describe('SavedCardComponent', function() {
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

  describe('scope vm.selected.reference', function() {

    it('should be default if card is not selected', function() {
      expect($scope.selected.reference).toBe(DEFAULT_SELECTED.reference);
    });

    it('should change when card is selected', function() {
      selectCard();

      expect($scope.selected.reference).toBe(DEFAULT_CARD.reference);
    });
  });

  describe('root element', function() {

    it('should not have "is-selected" class if card is not selected', function() {
      expect(directiveElem.hasClass('is-selected')).toBe(false);
    });

    it('should have "is-selected" class if card is selected', function() {
      selectCard();

      expect(directiveElem.hasClass('is-selected')).toBe(true);
    });
  });

  describe('select text', function() {

    it('should exist if card is not selected', function() {
      expect(findElement('a').length).toBe(1);
    });

    it('should not exist if card is selected', function() {
      selectCard();

      expect(findElement('a').length).toBe(0);
    });
  });

  describe('card brand and type', function() {

    it('should exist in lowercase in HTML', function() {
      var brandAndType = findElement('.tw-saved-card__brand-type');
      var expectedText
        = (DEFAULT_CARD.brand + ' ' + DEFAULT_CARD.type).toLowerCase();

      expect(brandAndType.text().trim()).toEqual(expectedText);
    });
  });

  describe('card number', function() {

    it('should exist', function() {
      var cardNumber = findElement('.tw-saved-card__number');
      var expectedNumber = DEFAULT_CARD.number;

      expect(cardNumber.text().indexOf(expectedNumber) > -1).toBe(true);
    });
  });

  describe('form', function() {
    it('should not exist if card is not selected', function() {
      var form = findElement('[name$="savedCardPaymentForm"]');

      expect(form.length).toBe(0);
    });

    it('should exist if card is selected', function() {
      selectCard();
      var form = findElement('[name$="savedCardPaymentForm"]');

      expect(form.length).toBe(1);
    });
  });

  describe('security code', function() {

    describe('label', function() {

      it('should have "CVV" if brand is visa' , function() {
        selectCard();
        var label = findElement('.tw-saved-card__security-code-label');

        expect(label.text().trim().indexOf('CVV') > -1).toBe(true);
      });

      it('should have "CVC" if brand is not visa', function() {
        var scope = DEFAULT_SCOPE;
        scope.card = CARD_MASTERCARD;
        initiateDirective(scope, TEMPLATE);
        selectCard();
        var label = findElement('.tw-saved-card__security-code-label');

        expect(label.text().trim().indexOf('CVC') > -1).toBe(true);
      });
    });
  });

  describe('onSubmit method', function() {

    it('should be called from parent scope when form is submitted', function() {
      selectCard();

      var input = findElement('[name$="securityCode"]');
      input.val(737).triggerHandler('input');

      var form = findElement('[name$="savedCardPaymentForm"]');
      form.triggerHandler('submit');

      expect($scope.onSubmit).toHaveBeenCalled();
    });
  });

  function findElement(query) {
    return angular.element(directiveElem[0].querySelector(query));
  }

  function selectCard() {
    directiveElem.triggerHandler('click');
  }

  var DEFAULT_SELECTED = {
    reference: 1
  };
  var CARD_VISA = {
    brand: 'visa',
    type: 'DEBIT',
    number: 1234,
    reference: 2
  };
  var CARD_MASTERCARD = {
    brand: 'mastercard',
    type: 'CREDIT',
    number: 5678,
    reference: 3
  };
  var DEFAULT_CARD = CARD_VISA;
  var AMOUNT = 100;
  var CURRENCY_SYMBOL = '€';

  var DEFAULT_SCOPE = {
    card: DEFAULT_CARD,
    currencySymbol: CURRENCY_SYMBOL,
    amount: AMOUNT,
    selected: DEFAULT_SELECTED,
    onSubmit: jasmine.createSpy('onSubmit')
  };
  
  var TEMPLATE = '<tw-saved-card ' +
    'brand="card.brand" ' +
    'type="card.type" ' +
    'number="card.number" ' +
    'reference="card.reference" ' +
    'selected="selected" ' +
    'currency-symbol="currencySymbol" ' +
    'amount="amount" ' +
    'on-submit="onSubmit()">' +
  '</tw-saved-card>';

  function initiateDirective(scope, template) {
    angular.extend($scope, scope);
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    directiveElem = compiledElement;
    isolatedScope = directiveElem.isolateScope();
  }
});