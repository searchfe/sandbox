# @searchfe/sandbox

[![Build Status](https://travis-ci.org/searchfe/sandbox.svg?branch=master)](https://travis-ci.org/searchfe/sandbox)
[![Coverage Status](https://coveralls.io/repos/github/searchfe/sandbox/badge.svg?branch=master)](https://coveralls.io/github/searchfe/sandbox?branch=master)

一个简易的 Sandbox，用来隔离不同的页面组件，使它们的执行互不干扰。使用 [APM][apmjs] 安装：

```bash
apmjs install @searchfe/sandbox
```

## Classes

<dl>
<dt><a href="#Sandbox">Sandbox</a></dt>
<dd><p>沙盒实例 创建后默认处于睡眠状态。需要调用 <code>sandbox.run()</code> 让它开始工作。</p>
</dd>
<dt><a href="#Scope">Scope</a></dt>
<dd><p>沙盒上下文 提供给沙盒内的业务逻辑使用，相当于浏览器的 window。</p>
</dd>
<dt><a href="#Document">Document</a></dt>
<dd><p>沙盒文档 只实现 window.document 的一个子集，托管了所有事件，页面属性等。</p>
</dd>
</dl>

## Interfaces

<dl>
<dt><a href="#EventTarget">EventTarget</a></dt>
<dd><p>事件接口，用于托管全局事件。Scope 和 Document 对象实现了该接口。
根元素以下的事件监听不予监听，见：<a href="https://github.com/searchfe/sandbox/issues/2">https://github.com/searchfe/sandbox/issues/2</a></p>
</dd>
</dl>

<a name="EventTarget"></a>

## EventTarget
事件接口，用于托管全局事件。Scope 和 Document 对象实现了该接口。
根元素以下的事件监听不予监听，见：https://github.com/searchfe/sandbox/issues/2

**Kind**: global interface  

* [EventTarget](#EventTarget)
    * [.addEventListener(event, cb, useCapture)](#EventTarget.addEventListener)
    * [.removeEventListener(event, cb, useCapture)](#EventTarget.removeEventListener)

<a name="EventTarget.addEventListener"></a>

### EventTarget.addEventListener(event, cb, useCapture)
Add an event listener to the hosted object

**Kind**: static method of [<code>EventTarget</code>](#EventTarget)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The event type |
| cb | <code>function</code> | The event listener |
| useCapture | <code>Boolean</code> | Whether or not use capture |

<a name="EventTarget.removeEventListener"></a>

### EventTarget.removeEventListener(event, cb, useCapture)
Remove an event listener to the hosted object

**Kind**: static method of [<code>EventTarget</code>](#EventTarget)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The event type |
| cb | <code>function</code> | The event listener |
| useCapture | <code>Boolean</code> | Whether or not use capture |

<a name="Sandbox"></a>

## Sandbox
沙盒实例 创建后默认处于睡眠状态。需要调用 `sandbox.run()` 让它开始工作。

**Kind**: global class  

* [Sandbox](#Sandbox)
    * [new Sandbox(element)](#new_Sandbox_new)
    * [.run()](#Sandbox+run)
    * [.stop()](#Sandbox+stop)
    * [.die()](#Sandbox+die)
    * [.on(type, cb)](#Sandbox+on)
    * [.off(type, cb)](#Sandbox+off)

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

<a name="Scope"></a>

## Scope
沙盒上下文 提供给沙盒内的业务逻辑使用，相当于浏览器的 window。

**Kind**: global class  
**Implements**: [<code>EventTarget</code>](#EventTarget)  

* [Scope](#Scope)
    * [new Scope(element, sandbox)](#new_Scope_new)
    * [.setInterval(fn, timeout)](#Scope+setInterval)
    * [.clearInterval(id)](#Scope+clearInterval)
    * [.setTimeout(fn, timeout)](#Scope+setTimeout)
    * [.clearTimeout(id)](#Scope+clearTimeout)

<a name="new_Scope_new"></a>

### new Scope(element, sandbox)
创建一个沙盒上下文


| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | 沙盒的根 DOM 元素 |
| sandbox | [<code>Sandbox</code>](#Sandbox) | 绑定到的沙盒对象 |

<a name="Scope+setInterval"></a>

### scope.setInterval(fn, timeout)
The setInterval() method repeatedly calls a function or executes a code snippet,
with a fixed time delay between each call.
It returns an interval ID which uniquely identifies the interval,
so you can remove it later by calling clearInterval()

**Kind**: instance method of [<code>Scope</code>](#Scope)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The scheduled callback |
| timeout | <code>Number</code> | Time inteval in millisecond |

<a name="Scope+clearInterval"></a>

### scope.clearInterval(id)
移除定时器

**Kind**: instance method of [<code>Scope</code>](#Scope)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | 定时器 ID，即 setInteval 的返回值 |

<a name="Scope+setTimeout"></a>

### scope.setTimeout(fn, timeout)
The setTimeout() method sets a timer which executes a function or
specified piece of code once after the timer expires.

**Kind**: instance method of [<code>Scope</code>](#Scope)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The scheduled callback |
| timeout | <code>Number</code> | Time in millisecond |

<a name="Scope+clearTimeout"></a>

### scope.clearTimeout(id)
移除定时器

**Kind**: instance method of [<code>Scope</code>](#Scope)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | 定时器 ID，即 setTimeout 的返回值 |

<a name="Document"></a>

## Document
沙盒文档 只实现 window.document 的一个子集，托管了所有事件，页面属性等。

**Kind**: global class  
**Implements**: [<code>EventTarget</code>](#EventTarget)  
<a name="new_Document_new"></a>

### new Document(scope, sandbox)
创建一个文档对象


| Param | Type | Description |
| --- | --- | --- |
| scope | [<code>Scope</code>](#Scope) | 沙盒上下文 |
| sandbox | [<code>Sandbox</code>](#Sandbox) | 对应的沙盒对象 |


[apmjs]: https://github.com/apmjs/apmjs
