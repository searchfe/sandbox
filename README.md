# sandbox

[![Build Status](https://travis-ci.org/searchfe/sandbox.svg?branch=master)](https://travis-ci.org/searchfe/sandbox)
[![Coverage Status](https://coveralls.io/repos/github/searchfe/sandbox/badge.svg?branch=master)](https://coveralls.io/github/searchfe/sandbox?branch=master)

一个简易的 Sandbox，用来隔离不同的页面组件，使它们的执行互不干扰。

## 使用方式

使用 [APM][apmjs] 安装：

```bash
apmjs install @searchfe/sandbox
```

RequireJS 示例使用：

```javascript
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

[apmjs]: https://github.com/apmjs/apmjs
