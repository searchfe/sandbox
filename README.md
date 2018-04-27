# @searchfe/sandbox

[![Build Status](https://travis-ci.org/searchfe/sandbox.svg?branch=master)](https://travis-ci.org/searchfe/sandbox)
[![Coverage Status](https://coveralls.io/repos/github/searchfe/sandbox/badge.svg?branch=master)](https://coveralls.io/github/searchfe/sandbox?branch=master)

一个简易的 Sandbox，用来隔离不同的页面组件，使它们的执行互不干扰。使用 [APM][apmjs] 安装：

```bash
apmjs install @searchfe/sandbox
```

其中 Fetch API 可能需要适当的 Polyfill：

* https://www.npmjs.com/package/whatwg-fetch
* https://github.com/taylorhakes/promise-polyfill

## Classes

<dl>
<dt><a href="#Sandbox">Sandbox</a></dt>
<dd><p>沙盒实例 创建后默认处于睡眠状态。需要调用 <code>sandbox.run()</code> 让它开始工作。</p>
</dd>
<dt><a href="#Window">Window</a></dt>
<dd><p>沙盒上下文 提供给沙盒内的业务逻辑使用，相当于浏览器的 window。</p>
</dd>
<dt><a href="#Document">Document</a></dt>
<dd><p>沙盒文档 局部的 DOM 文档对象，托管了所有事件，页面属性等。</p>
</dd>
<dt><a href="#Element">Element</a></dt>
<dd><p>元素对象 这是 HTMLElement 的一个沙盒代理对象，封装并托管了 DOM 操作。</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#scrollTo">scrollTo</a></dt>
<dd><p>滚动窗口，见 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo">https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo</a></p>
</dd>
</dl>

## Interfaces

<dl>
<dt><a href="#IEventTarget">IEventTarget</a></dt>
<dd><p>事件接口，用于托管全局事件。Window 和 Document 对象实现了该接口。
根元素以下的事件监听不予监听，见：<a href="https://github.com/searchfe/sandbox/issues/2">https://github.com/searchfe/sandbox/issues/2</a></p>
</dd>
<dt><a href="#IFetchAPI">IFetchAPI</a></dt>
<dd><p>Fetch API 的封装，见 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API</a>
具体实现取决于当前浏览器版本，以及当前环境的 Fetch Polyfill</p>
</dd>
<dt><a href="#ITimeout">ITimeout</a></dt>
<dd><p>事件接口，用于托管全局事件。Window 和 Document 对象实现了该接口。
根元素以下的事件监听不予监听，见：<a href="https://github.com/searchfe/sandbox/issues/2">https://github.com/searchfe/sandbox/issues/2</a></p>
</dd>
</dl>

<a name="IEventTarget"></a>

## IEventTarget
事件接口，用于托管全局事件。Window 和 Document 对象实现了该接口。
根元素以下的事件监听不予监听，见：https://github.com/searchfe/sandbox/issues/2

**Kind**: global interface  

* [IEventTarget](#IEventTarget)
    * [.addEventListener(event, cb, useCapture)](#IEventTarget.addEventListener)
    * [.removeEventListener(event, cb, useCapture)](#IEventTarget.removeEventListener)

<a name="IEventTarget.addEventListener"></a>

### IEventTarget.addEventListener(event, cb, useCapture)
Add an event listener to the hosted object

**Kind**: static method of [<code>IEventTarget</code>](#IEventTarget)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The event type |
| cb | <code>function</code> | The event listener |
| useCapture | <code>Boolean</code> | Whether or not use capture |

<a name="IEventTarget.removeEventListener"></a>

### IEventTarget.removeEventListener(event, cb, useCapture)
Remove an event listener to the hosted object

**Kind**: static method of [<code>IEventTarget</code>](#IEventTarget)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The event type |
| cb | <code>function</code> | The event listener |
| useCapture | <code>Boolean</code> | Whether or not use capture |

<a name="IFetchAPI"></a>

## IFetchAPI
Fetch API 的封装，见 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
具体实现取决于当前浏览器版本，以及当前环境的 Fetch Polyfill

**Kind**: global interface  
<a name="IFetchAPI.fetch"></a>

### IFetchAPI.fetch(input, init)
发起一个被沙盒托管的网络请求，API 请参考：
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

**Kind**: static method of [<code>IFetchAPI</code>](#IFetchAPI)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> | 目标 url |
| init | <code>function</code> | 请求参数 |

<a name="ITimeout"></a>

## ITimeout
事件接口，用于托管全局事件。Window 和 Document 对象实现了该接口。
根元素以下的事件监听不予监听，见：https://github.com/searchfe/sandbox/issues/2

**Kind**: global interface  

* [ITimeout](#ITimeout)
    * [.setInterval(fn, timeout)](#ITimeout.setInterval)
    * [.clearInterval(id)](#ITimeout.clearInterval)
    * [.setTimeout(fn, timeout)](#ITimeout.setTimeout)
    * [.clearTimeout(id)](#ITimeout.clearTimeout)

<a name="ITimeout.setInterval"></a>

### ITimeout.setInterval(fn, timeout)
The setInterval() method repeatedly calls a function or executes a code snippet,
with a fixed time delay between each call.
It returns an interval ID which uniquely identifies the interval,
so you can remove it later by calling clearInterval()

**Kind**: static method of [<code>ITimeout</code>](#ITimeout)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The scheduled callback |
| timeout | <code>Number</code> | Time inteval in millisecond |

<a name="ITimeout.clearInterval"></a>

### ITimeout.clearInterval(id)
移除定时器

**Kind**: static method of [<code>ITimeout</code>](#ITimeout)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | 定时器 ID，即 setInteval 的返回值 |

<a name="ITimeout.setTimeout"></a>

### ITimeout.setTimeout(fn, timeout)
The setTimeout() method sets a timer which executes a function or
specified piece of code once after the timer expires.

**Kind**: static method of [<code>ITimeout</code>](#ITimeout)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The scheduled callback |
| timeout | <code>Number</code> | Time in millisecond |

<a name="ITimeout.clearTimeout"></a>

### ITimeout.clearTimeout(id)
移除定时器

**Kind**: static method of [<code>ITimeout</code>](#ITimeout)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | 定时器 ID，即 setTimeout 的返回值 |

<a name="Sandbox"></a>

## Sandbox
沙盒实例 创建后默认处于睡眠状态。需要调用 `sandbox.run()` 让它开始工作。

**Kind**: global class  

* [Sandbox](#Sandbox)
    * [new Sandbox(element)](#new_Sandbox_new)
    * [.run()](#Sandbox+run)
    * [.stop()](#Sandbox+stop)
    * [.toggle()](#Sandbox+toggle)
    * [.die()](#Sandbox+die)
    * [.on(type, cb)](#Sandbox+on)
    * [.off(type, cb)](#Sandbox+off)
    * [.spawn(child)](#Sandbox+spawn) ⇒ [<code>Sandbox</code>](#Sandbox)

<a name="new_Sandbox_new"></a>

### new Sandbox(element)
创建后默认处于睡眠状态。需要调用 `sandbox.run()` 让它开始工作。


| Param | Type | Description |
| --- | --- | --- |
| element | <code>function</code> | 沙盒对应的 DOM 根元素 |

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
<a name="Sandbox+run"></a>

### sandbox.run()
让沙盒开始工作，开始接管事件、定时器、以及网络回调。

**Kind**: instance method of [<code>Sandbox</code>](#Sandbox)  
<a name="Sandbox+stop"></a>

### sandbox.stop()
停止沙盒，冻结定时器和网络回调、忽略事件。

**Kind**: instance method of [<code>Sandbox</code>](#Sandbox)  
<a name="Sandbox+toggle"></a>

### sandbox.toggle()
如果在跑，就让它停；如果已停，就让它跑

**Kind**: instance method of [<code>Sandbox</code>](#Sandbox)  
<a name="Sandbox+die"></a>

### sandbox.die()
杀死沙盒，销毁内部的定时器、网络、事件回调。一旦杀死不可重新开始工作。

**Kind**: instance method of [<code>Sandbox</code>](#Sandbox)  
<a name="Sandbox+on"></a>

### sandbox.on(type, cb)
Add a listener to the sandbox, available event types: run, stop, die

**Kind**: instance method of [<code>Sandbox</code>](#Sandbox)  
**Throws**:

- <code>Error</code> event type not defined


| Param | Type | Description |
| --- | --- | --- |
| type | <code>function</code> | the event type |
| cb | <code>function</code> | the callback |

<a name="Sandbox+off"></a>

### sandbox.off(type, cb)
Remove a listener to the sandbox, available event types: run, stop, die

**Kind**: instance method of [<code>Sandbox</code>](#Sandbox)  
**Throws**:

- <code>Error</code> event type not defined


| Param | Type | Description |
| --- | --- | --- |
| type | <code>function</code> | the event type |
| cb | <code>function</code> | the callback |

<a name="Sandbox+spawn"></a>

### sandbox.spawn(child) ⇒ [<code>Sandbox</code>](#Sandbox)
生成一个子沙盒对象，子沙盒会跟随父沙盒的生命周期。子沙盒会继承当前沙盒的状态，即：
如果当前沙盒处于 RUNNING 状态，子沙盒会立即执行。

**Kind**: instance method of [<code>Sandbox</code>](#Sandbox)  
**Returns**: [<code>Sandbox</code>](#Sandbox) - 子沙盒对象  
**Throws**:

- <code>Error</code> 沙盒已死
- <code>Error</code> 指定的节点是当前沙盒的祖先


| Param | Type | Description |
| --- | --- | --- |
| child | <code>HTMLElement</code> \| <code>string</code> | 子 HTMLElement 或子元素选择符 |

<a name="Window"></a>

## Window
沙盒上下文 提供给沙盒内的业务逻辑使用，相当于浏览器的 window。

**Kind**: global class  
**Implements**: [<code>IEventTarget</code>](#IEventTarget), [<code>ITimeout</code>](#ITimeout), [<code>IFetchAPI</code>](#IFetchAPI)  

* [Window](#Window)
    * [new Window(element, sandbox)](#new_Window_new)
    * [.document](#Window+document) : [<code>Document</code>](#Document)
    * [.location](#Window+location)
    * [.pageXOffset](#Window+pageXOffset) : <code>Number</code>
    * [.pageYOffset](#Window+pageYOffset) : <code>Number</code>
    * [.innerHeight](#Window+innerHeight) : <code>Number</code>
    * [.outerHeight](#Window+outerHeight) : <code>Number</code>
    * [.innerWidth](#Window+innerWidth) : <code>Number</code>
    * [.outerWidth](#Window+outerWidth) : <code>Number</code>

<a name="new_Window_new"></a>

### new Window(element, sandbox)
创建一个沙盒上下文


| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | 沙盒的根 DOM 元素 |
| sandbox | [<code>Sandbox</code>](#Sandbox) | 绑定到的沙盒对象 |

<a name="Window+document"></a>

### window.document : [<code>Document</code>](#Document)
沙盒的文档对象

**Kind**: instance property of [<code>Window</code>](#Window)  
<a name="Window+location"></a>

### window.location
Location 对象的封装

**Kind**: instance property of [<code>Window</code>](#Window)  
<a name="Window+pageXOffset"></a>

### window.pageXOffset : <code>Number</code>
**Kind**: instance property of [<code>Window</code>](#Window)  
**Read only**: true  
<a name="Window+pageYOffset"></a>

### window.pageYOffset : <code>Number</code>
**Kind**: instance property of [<code>Window</code>](#Window)  
**Read only**: true  
<a name="Window+innerHeight"></a>

### window.innerHeight : <code>Number</code>
**Kind**: instance property of [<code>Window</code>](#Window)  
**Read only**: true  
<a name="Window+outerHeight"></a>

### window.outerHeight : <code>Number</code>
**Kind**: instance property of [<code>Window</code>](#Window)  
**Read only**: true  
<a name="Window+innerWidth"></a>

### window.innerWidth : <code>Number</code>
**Kind**: instance property of [<code>Window</code>](#Window)  
**Read only**: true  
<a name="Window+outerWidth"></a>

### window.outerWidth : <code>Number</code>
**Kind**: instance property of [<code>Window</code>](#Window)  
**Read only**: true  
<a name="Document"></a>

## Document
沙盒文档 局部的 DOM 文档对象，托管了所有事件，页面属性等。

**Kind**: global class  

* [Document](#Document)
    * [new Document(element, sandbox)](#new_Document_new)
    * [.querySelector](#Document+querySelector) : <code>function</code>
    * [.querySelectorAll](#Document+querySelectorAll) : <code>function</code>
    * [.sandbox](#Document+sandbox) : [<code>Sandbox</code>](#Sandbox)
    * [.documentElement](#Document+documentElement) : <code>HTMLElement</code>
    * [.scrollingElement](#Document+scrollingElement) : [<code>Element</code>](#Element)
    * [.title](#Document+title) : <code>String</code>

<a name="new_Document_new"></a>

### new Document(element, sandbox)
创建一个文档对象


| Param | Type | Description |
| --- | --- | --- |
| element | [<code>Element</code>](#Element) | 沙盒上下文 |
| sandbox | [<code>Sandbox</code>](#Sandbox) | 对应的沙盒对象 |

<a name="Document+querySelector"></a>

### document.querySelector : <code>function</code>
封装 querySelector

**Kind**: instance property of [<code>Document</code>](#Document)  
**Read only**: true  
<a name="Document+querySelectorAll"></a>

### document.querySelectorAll : <code>function</code>
封装 querySelectorAll，限制：返回值类型为 Array 而非 NodeList，这意味着返回列表不是 Live 的。

**Kind**: instance property of [<code>Document</code>](#Document)  
**Read only**: true  
<a name="Document+sandbox"></a>

### document.sandbox : [<code>Sandbox</code>](#Sandbox)
与当前文档绑定的沙盒对象

**Kind**: instance property of [<code>Document</code>](#Document)  
<a name="Document+documentElement"></a>

### document.documentElement : <code>HTMLElement</code>
**Kind**: instance property of [<code>Document</code>](#Document)  
**Read only**: true  
<a name="Document+scrollingElement"></a>

### document.scrollingElement : [<code>Element</code>](#Element)
**Kind**: instance property of [<code>Document</code>](#Document)  
**Read only**: true  
<a name="Document+title"></a>

### document.title : <code>String</code>
沙盒文档标题

**Kind**: instance property of [<code>Document</code>](#Document)  
**Todo**

- [ ] Implement 做一个栈，保证退场后上一个页面（不论是否在沙盒中）的 title 也能恢复

<a name="Element"></a>

## Element
元素对象 这是 HTMLElement 的一个沙盒代理对象，封装并托管了 DOM 操作。

**Kind**: global class  
**Implements**: [<code>IEventTarget</code>](#IEventTarget)  

* [Element](#Element)
    * [new Element(element)](#new_Element_new)
    * [.scrollTo](#Element+scrollTo) : [<code>Document</code>](#Document)
    * [.offsetTop](#Element+offsetTop) : <code>Number</code>
    * [.offsetLeft](#Element+offsetLeft) : <code>Number</code>
    * [.offsetHeight](#Element+offsetHeight) : <code>Number</code>
    * [.offsetWidth](#Element+offsetWidth) : <code>Number</code>
    * [.scrollHeight](#Element+scrollHeight) : <code>Number</code>
    * [.scrollWidth](#Element+scrollWidth) : <code>Number</code>
    * [.clientHeight](#Element+clientHeight) : <code>Number</code>
    * [.clientWidth](#Element+clientWidth) : <code>Number</code>
    * [.scrollTop](#Element+scrollTop) : <code>Number</code>
    * [.scrollLeft](#Element+scrollLeft) : <code>Number</code>

<a name="new_Element_new"></a>

### new Element(element)
创建一个元素对象


| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | HTML 元素对象 |

<a name="Element+scrollTo"></a>

### element.scrollTo : [<code>Document</code>](#Document)
**Kind**: instance property of [<code>Element</code>](#Element)  
<a name="Element+offsetTop"></a>

### element.offsetTop : <code>Number</code>
**Kind**: instance property of [<code>Element</code>](#Element)  
**Read only**: true  
<a name="Element+offsetLeft"></a>

### element.offsetLeft : <code>Number</code>
**Kind**: instance property of [<code>Element</code>](#Element)  
**Read only**: true  
<a name="Element+offsetHeight"></a>

### element.offsetHeight : <code>Number</code>
**Kind**: instance property of [<code>Element</code>](#Element)  
**Read only**: true  
<a name="Element+offsetWidth"></a>

### element.offsetWidth : <code>Number</code>
**Kind**: instance property of [<code>Element</code>](#Element)  
**Read only**: true  
<a name="Element+scrollHeight"></a>

### element.scrollHeight : <code>Number</code>
**Kind**: instance property of [<code>Element</code>](#Element)  
**Read only**: true  
<a name="Element+scrollWidth"></a>

### element.scrollWidth : <code>Number</code>
**Kind**: instance property of [<code>Element</code>](#Element)  
**Read only**: true  
<a name="Element+clientHeight"></a>

### element.clientHeight : <code>Number</code>
**Kind**: instance property of [<code>Element</code>](#Element)  
**Read only**: true  
<a name="Element+clientWidth"></a>

### element.clientWidth : <code>Number</code>
**Kind**: instance property of [<code>Element</code>](#Element)  
**Read only**: true  
<a name="Element+scrollTop"></a>

### element.scrollTop : <code>Number</code>
**Kind**: instance property of [<code>Element</code>](#Element)  
<a name="Element+scrollLeft"></a>

### element.scrollLeft : <code>Number</code>
**Kind**: instance property of [<code>Element</code>](#Element)  
<a name="scrollTo"></a>

## scrollTo
滚动窗口，见 https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo

**Kind**: global variable  

[apmjs]: https://github.com/apmjs/apmjs
