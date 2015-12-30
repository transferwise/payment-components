var app = angular.module('DemoApp', ['tw.paymentComponents']);

app.controller('DemoController', DemoController);

function DemoController($timeout) {
  var vm = this;

  vm.cardDetails = {};
  vm.selected = {};
  vm.pay = pay;
  vm.payWithSavedCard = payWithSavedCard;
  vm.isProcessing = false;
  vm.isProcessingSavedCard = false;
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

  function pay() {
    vm.isProcessing = true;
    $timeout(showPayAlert, 2000);
  }

  function showPayAlert() {
    alert('pay called with card details:\n'
      + vm.cardDetails.name + '\n'
      + vm.cardDetails.number + '\n'
      + vm.cardDetails.expiry + '\n'
      + vm.cardDetails.securityCode + '\n');
    vm.isProcessing = false;
  }

  function payWithSavedCard() {
    vm.isProcessingSavedCard = true;
    $timeout(showPayWithSavedCardAlert, 2000);
  }

  function showPayWithSavedCardAlert() {
    alert('payWithSavedCard called with reference ' + vm.selected.reference
      + ' and security code ' + vm.selected.securityCode + '.');
    vm.isProcessingSavedCard = false;
  }
}