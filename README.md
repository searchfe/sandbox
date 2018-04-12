# sandbox

[![Build Status](https://travis-ci.org/searchfe/sandbox.svg?branch=master)](https://travis-ci.org/searchfe/sandbox)
[![Coverage Status](https://coveralls.io/repos/github/searchfe/sandbox/badge.svg?branch=master)](https://coveralls.io/github/searchfe/sandbox?branch=master)

一个简易的 Sandbox，用来隔离不同的页面组件，使它们的执行互不干扰。使用 [APM][apmjs] 安装：

```bash
apmjs install @searchfe/sandbox
```

## Modules
Module | Description
------ | -----------
[Element](#markdown-header-element) | 沙盒 Scope 中的 HTMLElement 表示，提供给沙盒内的业务逻辑使用，相当于浏览器的 HTMLElement。
[Sandbox](#markdown-header-sandbox) | 沙盒实例，创建后默认处于睡眠状态。需要调用 `sandbox.run()` 让它开始工作。
[Scope](#markdown-header-scope) | 沙盒环境，提供给沙盒内的业务逻辑使用，相当于浏览器的 window。

## Element
沙盒 Scope 中的 HTMLElement 表示，提供给沙盒内的业务逻辑使用，相当于浏览器的 HTMLElement。


* [Element](#markdown-header-element)
    * [.addEventListener(event, cb, useCapture)](#markdown-header-elementaddeventlistenerevent-cb-usecapture)
    * [.removeEventListener(event, cb, useCapture)](#markdown-header-elementremoveeventlistenerevent-cb-usecapture)

### element.addEventListener(event, cb, useCapture)
Add an event listener to the hosted object (this

**Kind**: instance method of [Element](#markdown-header-element)  

| Param | Type | Description |
| --- | --- | --- |
| event | String | The event type |
| cb | function | The event listener |
| useCapture | Boolean | Whether or not use capture |

### element.removeEventListener(event, cb, useCapture)
Remove an event listener to the hosted object (this

**Kind**: instance method of [Element](#markdown-header-element)  

| Param | Type | Description |
| --- | --- | --- |
| event | String | The event type |
| cb | function | The event listener |
| useCapture | Boolean | Whether or not use capture |

## Sandbox
沙盒实例，创建后默认处于睡眠状态。需要调用 `sandbox.run()` 让它开始工作。


| Param | Type | Description |
| --- | --- | --- |
| element | function | 沙盒对应的 DOM 根元素 |

**Example**  
```js
require(['@searchfe/sandbox'], function(Sandbox){
  var sandbox = new Sandbox(document.querySelector('#app'))
  sandbox.run();
  sandbox.setInterval(() => console.log('timeout!'), 100)
  setTimeout(function(){
    sandbox.stop();
    // sandbox.die();
  }, 5000);
})
```

* [Sandbox](#markdown-header-sandbox)
    * [.run()](#markdown-header-sandboxrun)
    * [.stop()](#markdown-header-sandboxstop)
    * [.die()](#markdown-header-sandboxdie)
    * [.on(type, cb)](#markdown-header-sandboxontype-cb)
    * [.off(type, cb)](#markdown-header-sandboxofftype-cb)

### sandbox.run()
让沙盒开始工作，开始接管事件、定时器、以及网络回调。

**Kind**: instance method of [Sandbox](#markdown-header-sandbox)  
### sandbox.stop()
停止沙盒，冻结定时器和网络回调、忽略事件。

**Kind**: instance method of [Sandbox](#markdown-header-sandbox)  
### sandbox.die()
杀死沙盒，销毁内部的定时器、网络、事件回调。一旦杀死不可重新开始工作。

**Kind**: instance method of [Sandbox](#markdown-header-sandbox)  
### sandbox.on(type, cb)
Add a listener to the sandbox, available event types: run, stop, die

**Kind**: instance method of [Sandbox](#markdown-header-sandbox)  
**Throws**:

- Error event type not defined


| Param | Type | Description |
| --- | --- | --- |
| type | function | the event type |
| cb | function | the reslver |

### sandbox.off(type, cb)
Remove a listener to the sandbox, available event types: run, stop, die

**Kind**: instance method of [Sandbox](#markdown-header-sandbox)  
**Throws**:

- Error event type not defined


| Param | Type | Description |
| --- | --- | --- |
| type | function | the event type |
| cb | function | the reslver |

## Scope
沙盒环境，提供给沙盒内的业务逻辑使用，相当于浏览器的 window。


* [Scope](#markdown-header-scope)
    * [.setInterval(fn, timeout)](#markdown-header-scopesetintervalfn-timeout)
    * [.clearInterval(id)](#markdown-header-scopeclearintervalid)
    * [.setTimeout(fn, timeout)](#markdown-header-scopesettimeoutfn-timeout)
    * [.clearTimeout(id)](#markdown-header-scopecleartimeoutid)

### scope.setInterval(fn, timeout)
The setInterval() method repeatedly calls a function or executes a code snippet,
with a fixed time delay between each call.
It returns an interval ID which uniquely identifies the interval,
so you can remove it later by calling clearInterval()

**Kind**: instance method of [Scope](#markdown-header-scope)  

| Param | Type | Description |
| --- | --- | --- |
| fn | function | The scheduled callback |
| timeout | Number | Time inteval in millisecond |

### scope.clearInterval(id)
移除定时器

**Kind**: instance method of [Scope](#markdown-header-scope)  

| Param | Type | Description |
| --- | --- | --- |
| id | Number | 定时器 ID，即 setInteval 的返回值 |

### scope.setTimeout(fn, timeout)
The setTimeout() method sets a timer which executes a function or
specified piece of code once after the timer expires.

**Kind**: instance method of [Scope](#markdown-header-scope)  

| Param | Type | Description |
| --- | --- | --- |
| fn | function | The scheduled callback |
| timeout | Number | Time in millisecond |

### scope.clearTimeout(id)
移除定时器

**Kind**: instance method of [Scope](#markdown-header-scope)  

| Param | Type | Description |
| --- | --- | --- |
| id | Number | 定时器 ID，即 setTimeout 的返回值 |


[apmjs]: https://github.com/apmjs/apmjs
