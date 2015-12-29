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
    initiateDirective();
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

  describe('security code icon', function() {
    var container;
    var input;

    describe('container', function() {
      beforeEach(function() {
        selectCard();

        container = findElement('.tw-saved-card__card-flip-container');
        input = findElement('[name$="savedCardSecurityCode"]');
      });

      it('should not have "show-back" class if input is not focused', function() {
        expect(container.hasClass('show-back')).toBe(false);
      });

      it('should have "show-back" class if input is focused', function() {
        input.triggerHandler('focus');

        expect(container.hasClass('show-back')).toBe(true);
      });
    });

    describe('front', function() {

      it('should have brand class', function() {
        var front = findElement('.tw-saved-card__card-front');

        expect(front.hasClass('payment-card-icon-visa')).toBe(true);
      });
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

  describe('security code input', function() {

    describe('label', function() {

      it('should have "CVV" if brand is visa' , function() {
        selectCard();
        var label = findElement('.tw-saved-card__security-code-label');

        expect(label.text().trim().indexOf('CVV') > -1).toBe(true);
      });

      it('should have "CVC" if brand is not visa', function() {
        initiateDirective(CARD_MASTERCARD);
        selectCard();
        var label = findElement('.tw-saved-card__security-code-label');

        expect(label.text().trim().indexOf('CVC') > -1).toBe(true);
      });
    });

    describe('vm.isSecurityCodeInputFocused', function() {
      var input;
      beforeEach(function() {
        selectCard();
        input = findElement('[name$="savedCardSecurityCode"]');
      });

      it('should set vm.isSecurityCodeInputFocused to true if focused', function() {
        input.triggerHandler('focus');

        expect(isolatedScope.vm.isSecurityCodeFocused).toBe(true);
      });

      it('should set vm.isSecurityCodeInputFocused to false if blurred', function() {
        input.triggerHandler('focus');
        input.triggerHandler('blur');

        expect(isolatedScope.vm.isSecurityCodeFocused).toBe(false);
      });
    });
  });

  describe('pay button', function() {

    it('should have symbol and amount', function() {
      selectCard();

      var button = findElement('[name$="savedCardPaymentForm"] button');

      expect(button.text()
        .indexOf(CURRENCY_SYMBOL + AMOUNT) > -1).toBe(true);
    });
  });

  describe('onSubmit method', function() {

    // TODO Fix this test
    xit('should be called from parent scope when form is submitted', function() {
      selectCard();

      var input = findElement('[name$="savedCardSecurityCode"]');
      angular.element(input).val(737).triggerHandler(input);
      $scope.$digest();

      var button = findElement('[name$="savedCardPaymentForm"] button');
      button.triggerHandler('click');

      expect($scope.onSubmit).toHaveBeenCalled();
    });
  });

  function getCompiledElement() {
    var elementAsString = '<tw-saved-card ' +
      'brand="card.brand" ' +
      'type="card.type" ' +
      'number="card.number" ' +
      'reference="card.reference" ' +
      'selected="selected" ' +
      'currency-symbol="currencySymbol" ' +
      'amount="amount" ' +
      'on-submit="onSubmit()">' +
    '</tw-saved-card>';
    var element = angular.element(elementAsString);
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    return compiledElement;
  }

  function findElement(query) {
    return angular.element(directiveElem[0].querySelector(query));
  }

  function selectCard() {
    directiveElem.triggerHandler('click');
  }

  function initiateDirective(card) {
    card = card || DEFAULT_CARD;
    $scope.card = card;
    $scope.currencySymbol = CURRENCY_SYMBOL;
    $scope.amount = AMOUNT;
    $scope.selected = DEFAULT_SELECTED;
    $scope.onSubmit = jasmine.createSpy('onSubmit');
    directiveElem = getCompiledElement();
    isolatedScope = directiveElem.isolateScope();
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
});