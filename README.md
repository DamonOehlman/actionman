# actionman

The `actionman` module is works in conjuction with
[eve](https://github.com/adobe-webplatform/eve) to automatically wire
dom events into eve.


[![NPM](https://nodei.co/npm/actionman.png)](https://nodei.co/npm/actionman/)

[![unstable](http://hughsk.github.io/stability-badges/dist/unstable.svg)](http://github.com/hughsk/stability-badges)

## Usage

The first thing that is required is to ensure `actionman` is initialized
once the `document` (the default scope) is available.

This is a simple call and it's recommended that you provide a namespace
(first argument) when initializing actionman so you can discern your
application events from other components which might also be using
actionman:

```js
var eve = require('eve');
var actionman = require('actionman');

// listen for events 
eve.on('myapp.missile.fire', function(evt) {
  console.log('firing the missile captain');
});

// tell actionman to map events intercepted at a document level 
actionman('myapp');
```

The accompanying HTML for this example might look something like:

```html
<html>
<head>
<title>Simple Actionman Demo</title>
</head>
<body>
<button data-action="missile.fire">Fire</button>
<script src="bundle.js"></script>
</body>
</html>
```

By default only `click` events are automatically wired in, but this
can be confired by passing some additional opts to actionman.

## Reference

### actionman(namespace?, opts?)

Automatically wire the event types specified in `opts.types`
(default: `['click']`) to the specified `opts.scope`
(default: `document`) into eve.

Using a namespace is encouraged, but not required.  If no namespace
is specified then eve will trigger events with the names outlined as
defined on the `data-action` attribute.

## License(s)

### MIT

Copyright (c) 2013 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
