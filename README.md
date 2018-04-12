# sandbox

[![Build Status](https://travis-ci.org/searchfe/sandbox.svg?branch=master)](https://travis-ci.org/searchfe/sandbox)
[![Coverage Status](https://coveralls.io/repos/github/searchfe/sandbox/badge.svg?branch=master)](https://coveralls.io/github/searchfe/sandbox?branch=master)

一个简易的 Sandbox，用来隔离不同的页面组件，使它们的执行互不干扰。使用 [APM][apmjs] 安装：

```bash
apmjs install @searchfe/sandbox
```

## Modules

<dl>
<dt><a href="#module_Element">Element</a></dt>
<dd><p>沙盒 Scope 中的 HTMLElement 表示，提供给沙盒内的业务逻辑使用，相当于浏览器的 HTMLElement。</p>
</dd>
<dt><a href="#module_Sandbox">Sandbox</a></dt>
<dd><p>沙盒实例，创建后默认处于睡眠状态。需要调用 <code>sandbox.run()</code> 让它开始工作。</p>
</dd>
<dt><a href="#module_Scope">Scope</a></dt>
<dd><p>沙盒环境，提供给沙盒内的业务逻辑使用，相当于浏览器的 window。</p>
</dd>
</dl>

<a name="module_Element"></a>

## Element
沙盒 Scope 中的 HTMLElement 表示，提供给沙盒内的业务逻辑使用，相当于浏览器的 HTMLElement。


* [Element](#module_Element)
    * [.addEventListener(event, cb, useCapture)](#module_Element+addEventListener)
    * [.removeEventListener(event, cb, useCapture)](#module_Element+removeEventListener)

<a name="module_Element+addEventListener"></a>

### element.addEventListener(event, cb, useCapture)
Add an event listener to the hosted object (this

**Kind**: instance method of [<code>Element</code>](#module_Element)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The event type |
| cb | <code>function</code> | The event listener |
| useCapture | <code>Boolean</code> | Whether or not use capture |

<a name="module_Element+removeEventListener"></a>

### element.removeEventListener(event, cb, useCapture)
Remove an event listener to the hosted object (this

**Kind**: instance method of [<code>Element</code>](#module_Element)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The event type |
| cb | <code>function</code> | The event listener |
| useCapture | <code>Boolean</code> | Whether or not use capture |

<a name="module_Sandbox"></a>

## Sandbox
沙盒实例，创建后默认处于睡眠状态。需要调用 `sandbox.run()` 让它开始工作。


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

* [Sandbox](#module_Sandbox)
    * [.run()](#module_Sandbox+run)
    * [.stop()](#module_Sandbox+stop)
    * [.die()](#module_Sandbox+die)
    * [.on(type, cb)](#module_Sandbox+on)
    * [.off(type, cb)](#module_Sandbox+off)

<a name="module_Sandbox+run"></a>

### sandbox.run()
让沙盒开始工作，开始接管事件、定时器、以及网络回调。

**Kind**: instance method of [<code>Sandbox</code>](#module_Sandbox)  
<a name="module_Sandbox+stop"></a>

### sandbox.stop()
停止沙盒，冻结定时器和网络回调、忽略事件。

**Kind**: instance method of [<code>Sandbox</code>](#module_Sandbox)  
<a name="module_Sandbox+die"></a>

### sandbox.die()
杀死沙盒，销毁内部的定时器、网络、事件回调。一旦杀死不可重新开始工作。

**Kind**: instance method of [<code>Sandbox</code>](#module_Sandbox)  
<a name="module_Sandbox+on"></a>

### sandbox.on(type, cb)
Add a listener to the sandbox, available event types: run, stop, die

**Kind**: instance method of [<code>Sandbox</code>](#module_Sandbox)  
**Throws**:

- <code>Error</code> event type not defined


| Param | Type | Description |
| --- | --- | --- |
| type | <code>function</code> | the event type |
| cb | <code>function</code> | the reslver |

<a name="module_Sandbox+off"></a>

### sandbox.off(type, cb)
Remove a listener to the sandbox, available event types: run, stop, die

**Kind**: instance method of [<code>Sandbox</code>](#module_Sandbox)  
**Throws**:

- <code>Error</code> event type not defined


| Param | Type | Description |
| --- | --- | --- |
| type | <code>function</code> | the event type |
| cb | <code>function</code> | the reslver |

<a name="module_Scope"></a>

## Scope
沙盒环境，提供给沙盒内的业务逻辑使用，相当于浏览器的 window。


* [Scope](#module_Scope)
    * [.setInterval(fn, timeout)](#module_Scope+setInterval)
    * [.clearInterval(id)](#module_Scope+clearInterval)
    * [.setTimeout(fn, timeout)](#module_Scope+setTimeout)
    * [.clearTimeout(id)](#module_Scope+clearTimeout)

<a name="module_Scope+setInterval"></a>

### scope.setInterval(fn, timeout)
The setInterval() method repeatedly calls a function or executes a code snippet,
with a fixed time delay between each call.
It returns an interval ID which uniquely identifies the interval,
so you can remove it later by calling clearInterval()

**Kind**: instance method of [<code>Scope</code>](#module_Scope)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The scheduled callback |
| timeout | <code>Number</code> | Time inteval in millisecond |

<a name="module_Scope+clearInterval"></a>

### scope.clearInterval(id)
移除定时器

**Kind**: instance method of [<code>Scope</code>](#module_Scope)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | 定时器 ID，即 setInteval 的返回值 |

<a name="module_Scope+setTimeout"></a>

### scope.setTimeout(fn, timeout)
The setTimeout() method sets a timer which executes a function or
specified piece of code once after the timer expires.

**Kind**: instance method of [<code>Scope</code>](#module_Scope)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The scheduled callback |
| timeout | <code>Number</code> | Time in millisecond |

<a name="module_Scope+clearTimeout"></a>

### scope.clearTimeout(id)
移除定时器

**Kind**: instance method of [<code>Scope</code>](#module_Scope)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | 定时器 ID，即 setTimeout 的返回值 |


[apmjs]: https://github.com/apmjs/apmjs
