# vue-units

A plugin for adding handy conversion filters to your [Vue.js](https://github.com/vuejs/vue) project. Based on the [convert-units](https://github.com/ben-ng/convert-units) package made by [@ben-ng](https://github.com/ben-ng).

## Installation

Install **vue-units** with NPM from the [vue-units](https://www.npmjs.com/package/vue-units) NPM repository by running the following command:

```
npm install vue-units --save
```

If you prefer to use [Yarn](https://github.com/yarnpkg/yarn), you can install it with the following command instead:

```
yarn install vue-units --save
```

Add it to your vue instance:

```javascript
import Vue from 'vue';
import VueUnits from 'vue-units';

Vue.use(VueUnits)
```

If you don't use ES6, you can also include it as a script

```javascript
<script src="node_modules/vue-units/vue-units.js"></script>
```

## Usage

### Filters

#### unit()

The filter `unit(from, to, includeUnit)` is added to your [Vue](https://github.com/vuejs/vue) instance, which makes it easy to convert between a set of units in your templates:

```vue
<template>
  <div id="app">
    <p>{{1500 | unit('m', 'km', true)}}</p>
  </div>
</template>
```

The above code will result in the following output:

```
1.5 km
```

If `includeUnit` is false, only the converted value will be returned:

```
1.5
```

To see a list of available conversion units, please refer to the official repository for [convert-units](https://github.com/ben-ng/convert-units).

### Prototype

You can access the instance of [convert-units](https://github.com/ben-ng/convert-units) anywhere in your Vue templates, which gives you access to the additional functions that the [convert-units](https://github.com/ben-ng/convert-units) package provides:

```javascript
this.$units(12000).from('mm').to('m');
// 12 Metres

this.$units(12000).from('mm').toBest();
// 12 Meters (the smallest unit with a value above 1)

this.$units(12000).from('mm').toBest({ exclude: ['m'] })
// 1200 Centimeters (the smallest unit excluding meters)

this.$units(12000).from('mm').toBest({ cutOffNumber: 10 });
// 900 Centimeters (the smallest unit with a value equal to or above 10)

this.$units(12000)from('mm').toBest({ cutOffNumber: 10 })
// 10 Meters (the smallest unit with a value equal to or above 10)

this.$units(12000).from('m').possibilities();
// ["mm", "cm", "m", "km", "in", "yd", "ft-us", "ft", "mi"]

this.$units().measures();
// [ 'length', 'mass', 'volume' ]
```

For additional methods, please refer to the official repository for [convert-units](https://github.com/ben-ng/convert-units).

#### Example:

```html
<script>
export default {
  props: {
      distance: {
          type: Number,
          default: 123456789
      }
  },
  computed: {
      shortDistance() {
          const obj = this.$units(this.distance).from('cm2').toBest({
              exclude: ['m2']
          });
          return `${obj.val} ${obj.unit}`;
      }
  }
}
</script>
```

## License

Copyright 2018 Emil Rosenius Pedersen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.