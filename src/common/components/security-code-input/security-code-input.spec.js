'use strict';

require('../../../payment-components.module');

describe('SecurityCodeInputComponent', function() {
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
    var scope = { focused: true };
    initiateDirective(scope, TEMPLATE);
  });

  describe('input', function() {

    it('should change focused in parent scope to true when focused', function() {
      directiveElem.triggerHandler('focus');

      expect($scope.focused).toBe(true);
    });

    it('should change focused in parent scope to false when blurred', function() {
      directiveElem.triggerHandler('focus');
      directiveElem.triggerHandler('blur');

      expect($scope.focused).toBe(false);
    });

    it('should pass input value to parent scope', function() {
      directiveElem.val(SECURITY_CODE).triggerHandler('input');

      expect($scope.securityCode).toBe(SECURITY_CODE);
    });
  });

  var TEMPLATE = '<tw-security-code-input ' +
    'ng-model="securityCode"' +
    'focused="focused">' +
    '</tw-security-code-input>';
  var SECURITY_CODE = '737';

  function initiateDirective(scope, template) {
    angular.extend($scope, scope);
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    directiveElem = compiledElement;
    isolatedScope = directiveElem.isolateScope();
  }
});