var app = angular.module('DemoApp', ['tw.paymentComponents']);

app.controller('DemoController', DemoController);

function DemoController($timeout) {
  var vm = this;

  vm.selected = {};
  vm.isProcessing = false;
  vm.onSubmit = onSubmit;
  vm.currencySymbol = '£';
  vm.amount = 3.1415;

  vm.cards = [
    {
      cardType: 'DEBIT',
      cardNumber: '0123',
      adyenRecurringDetailReference: 1,
      adyenVariant: 'visa'
    },
    {
      cardType: 'CREDIT',
      cardNumber: '4567',
      adyenRecurringDetailReference: 2,
      adyenVariant: 'mc'
    },
    {
      cardType: 'DEBIT',
      cardNumber: '8910',
      adyenRecurringDetailReference: 3,
      adyenVariant: 'maestrouk'
    }
  ];

  function onSubmit() {
    vm.isProcessing = true;
    $timeout(showSubmitAlert, 2000);
  }

  function showSubmitAlert() {
    alert('onSubmit called with reference ' + vm.selected.reference
      + ' and security code ' + vm.selected.securityCode + '.');
    vm.isProcessing = false;
  }
}