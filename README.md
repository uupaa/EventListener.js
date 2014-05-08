=========
EventListener.js
=========

![](https://travis-ci.org/uupaa/EventListener.js.png)

EventListener Class

# Document

- [EventListener.js wiki](https://github.com/uupaa/EventListener.js/wiki/EventListener)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))

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


