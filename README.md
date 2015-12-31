# Payment components
Angular 1 components (directive-controller-view-styles bundles as of now) for payment step in TransferWise products.

See the demo [here](https://rawgit.com/transferwise/payment-components/master/demo/index.html).

## Getting the code

    bower install --save https://github.com/transferwise/payment-components.git
or

    npm install --save https://github.com/transferwise/payment-components.git

## Dependencies

1. `angular`
2. `angular-animate` (optional but recommended)
3. `angular-payments`
4. `bootstrap`
5. `jquery`
6. `styleguide-components`

## Usage

Add the script dependency
```html
<script src="path/to/payment-components.js"></script>
```

Add the stylesheet dependency
```html
<link href="path/to/payment-components.js" rel="stylesheet">
```

Inject the module into the required module
```js
angular.module('myApp',['tw.paymentComponents']);
```

Add the directive code to HTML (specified under components)

## Components

### `tw-new-card-form`

<a href="http://i.imgur.com/6wJldbl.png"><img src="http://i.imgur.com/6wJldbl.png" width="480px"></a>

Directive:  
```html
<tw-new-card-form
  card-details="vm.cardDetails"
  currency-symbol="vm.currencySymbol"
  amount="vm.amount"
  on-submit="vm.onSubmit()"
  is-processing="vm.isProcessing">
</tw-new-card-form>
```
where  
`vm.cardDetails` – two-way bound object with `name`, `number`, `expiry` and `securityCode`  
`vm.currencySymbol` – currency symbol (e.g. `'£'`) to be displayed on the pay button  
`vm.amount` – amount (e.g. `3.14`) to be displayed on the pay button  
`vm.onSubmit` – method to be called from parent scope after submitting the form  
`vm.isProcessing` – boolean to be passed from parent scope to disable the pay button

### `tw-saved-cards`

<a href="http://i.imgur.com/5gz1vPq.png"><img src="http://i.imgur.com/5gz1vPq.png" width="480px"></a>

Directive:  
```html
<tw-saved-cards
  cards="vm.cards"
  selected="vm.selected"
  currency-symbol="vm.currencySymbol"
  amount="vm.amount"
  on-submit="vm.onSubmit()"
  is-processing="vm.isProcessing">
</tw-saved-cards>
```
where  
`vm.cards` – array of cards specific to the TransferWise API  
`vm.selected` – two-way-bound object with `reference` and `securityCode`  
`vm.currencySymbol` – currency symbol (e.g. `'£'`) to be displayed on the pay button  
`vm.amount` – amount (e.g. `3.14`) to be displayed on the pay button  
`vm.onSubmit` – method to be called from parent scope after submitting the form  
`vm.isProcessing` – boolean to be passed from parent scope to disable the pay button  

## Development

Everything is done with npm (dev dependencies, frontend dependencies, building):

`npm install` – install necessary dependencies  
`npm run build` – build styles and scripts to `/dist`  
`npm run watch` – watch browserify tree, tests and styles  
`npm run demo` – build and run demo page and serve it on `localhost:9090/demo`  
`npm test` – run tests once
