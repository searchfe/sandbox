define(function (require) {
    /**
     * 创建一个沙盒上下文
     *
     * @class 沙盒上下文 提供给沙盒内的业务逻辑使用，相当于浏览器的 window。
     * @alias Scope
     * @param {HTMLElement} element 沙盒的根 DOM 元素
     * @param {Sandbox} sandbox 绑定到的沙盒对象
     * @implements EventTarget
     */
    function Scope (element, sandbox) {
        var timeout = require('./apis/timeout')(sandbox);
        var events = require('./apis/events')(sandbox);
        var Document = require('./apis/document');

        Object.defineProperties(this, {
            setTimeout: { value: timeout.setTimeout, writable: false },
            clearTimeout: { value: timeout.clearTimeout, writable: false },
            setInterval: { value: timeout.setInterval, writable: false },
            clearInterval: { value: timeout.clearInterval, writable: false },
            addEventListener: { value: events.addEventListener, writable: false },
            removeEventListener: { value: events.removeEventListener, writable: false },
            document: { value: new Document(element, sandbox) }
        });
    }
    return Scope;
});
