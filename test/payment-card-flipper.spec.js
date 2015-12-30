'use strict';

require('../src/payment-components.module');

describe('PaymentCardFlipperComponent', function() {
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
    var scope = { brand: BRAND, isFlipped: false };
    initiateDirective(scope, TEMPLATE);
  });

  describe('root element', function() {
    var flipper;

    beforeEach(function() {
      flipper = directiveElem;
    });

    it('should not have "flipped" class if vm.isFlipped is false', function() {
      expect(flipper.hasClass('payment-card-flipper--flipped')).toBe(false);
    });

    it('should have "flipped" class if vm.isFlipped is set to true', function() {
      $scope.isFlipped = true;
      $scope.$digest();

      expect(flipper.hasClass('payment-card-flipper--flipped')).toBe(true);
    });
  });

  describe('front', function() {

    it('should have brand class', function() {
      var front = findElement('.payment-card-flipper__front');
      expect(front.hasClass('payment-card-icon--' + BRAND)).toBe(true);
    });
  });

  describe('transclude element', function() {

    it('should exist', function() {
      var transcludeElem = directiveElem.find('ng-transclude');

      expect(transcludeElem.length).toBe(1);
    });

    it('should have content', function() {
      var scope = {};
      var template = TEMPLATE_WITH_TRANSCLUDE;
      initiateDirective(scope, template);

      expect(directiveElem.find('p').length).toBe(1);
      expect(directiveElem.find('p').text()).toBe(TRANSCLUDE_PARAGRAPH_TEXT);
    });
  });

  function findElement(query) {
    return angular.element(directiveElem[0].querySelector(query));
  }

  function initiateDirective(scope, template) {
    angular.extend($scope, scope);
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    directiveElem = compiledElement;
    isolatedScope = directiveElem.isolateScope();
  }

  var BRAND = 'visa';
  var TEMPLATE = '<tw-payment-card-flipper ' +
    'brand="brand" ' +
    'is-flipped="isFlipped">' +
  '</tw-payment-card-flipper>';
  var TRANSCLUDE_PARAGRAPH_TEXT = 'Transclude used for security code line etc.';
  var TEMPLATE_WITH_TRANSCLUDE = '<tw-payment-card-flipper>' +
    '<p>' + TRANSCLUDE_PARAGRAPH_TEXT + '</p>'
  '</tw-payment-card-flipper>';
});