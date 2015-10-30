# collect-cli-arguments

> Collects command line arguments

![dependencies](https://david-dm.org/jsfi/collect-cli-arguments.svg)

## Install

This module requires node `>=4.0.0`

```
$ npm install --save collect-cli-arguments
```

## Usage

```js
let args = require('collect-cli-arguments')(configuration);
```

## Example

```js
let args = require('collect-cli-arguments')({
    questions: [
        { label: 'When?', flag: 'at' },
        { label: 'What?' }
    ]
});
/*
array built like command line arguments process.argv.slice(2);
args = [ --at, WHEN, WHAT ]
*/
```

## Configuration

```js
let configuration = {
    questions: [],  //Array
    flagSymbol: '--', //String
    aliasSymbol: '-' //String
}
```

### questions

The questions-array is a collection of questions. The label will be printed to the console. If a flag or an alias attribute is set, it will be added to the returned array before the value.

### flagSymbol

This configuration sets the prefix for all flags. The default value is `--`.

### aliasSymbol

This configuration sets the prefix for all aliases. The default value is `-`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add tests for any new or changed functionality. Lint and test your code using `npm test`.
