# sort-object-value

[![npm](https://img.shields.io/npm/v/sort-object-value)](https://www.npmjs.com/package/sort-object-value)  [![GitHub](https://img.shields.io/github/license/tylim88/sort-object-value)](https://github.com/tylim88/sort-object-value/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/tylim88/sort-object-value/pulls) [![tylim88](https://circleci.com/gh/tylim88/sort-object-value.svg?style=svg)](<[LINK](https://github.com/tylim88/sort-object-value#sort-object-value)>)

🎀 0 dependency values based object keys sorting.

* immutable
* small footprint
* 0 learning curve
* 0 dependency
* tested

## Installation

```bash
npm i sort-object-value
```

## Usage

```js
import objSort from 'sort-object-value'

 const obj = {
  md: 768,
  dm: -768.965,
  sm: 576.28367,
  ms: -576,
  xs: 0,
  xl: 1200.23872,
  lx: -1200,
  lg: 992,
  gl: -992.34632,
 }
```

ascending sort

```js
const ascending = objSort(obj)

console.log(ascending)
// output
// {
//  lx: -1200,
//  gl: -992.34632,
//  dm: -768.965,
//  ms: -576,
//  xs: 0,
//  sm: 576.28367,
//  md: 768,
//  lg: 992,
//  xl: 1200.23872,
// }
```

descending sort

```js
const descending = objSort(obj,true)

console.log(descending)
// output
// {
//  xl: 1200.23872,
//  lg: 992,
//  md: 768,
//  sm: 576.28367,
//  xs: 0,
//  ms: -576,
//  dm: -768.965,
//  gl: -992.34632,
//  lx: -1200,
// }
```
