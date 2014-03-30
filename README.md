
EventListener.js
=========

EventListener Class

# Document

https://github.com/uupaa/EventListener.js/wiki/EventListener

# How to use

```js
<script src="lib/EventListener.js">
<script>
// for Browser
console.log( new EventListener() );
</script>
```

```js
// for WebWorkers
importScripts("lib/EventListener.js");

console.log( new EventListener() );
```

```js
// for Node.js
var EventListener = require("lib/EventListener.js");

console.log( new EventListener() );
```

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/EventListener.js.git
    $ cd EventListener.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`


