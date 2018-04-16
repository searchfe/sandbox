define(function (require) {
    /**
     * 创建一个文档对象
     *
     * @class 沙盒文档 只实现 window.document 的一个子集，托管了所有事件，页面属性等。
     * @alias Document
     * @implements EventTarget
     * @param {Scope} scope 沙盒上下文
     * @param {Sandbox} sandbox 对应的沙盒对象
     */
    function Document (scope, sandbox) {
        var events = require('./events')(sandbox);

        Object.defineProperties(this, {
            addEventListener: { value: events.addEventListener, writable: false },
            removeEventListener: { value: events.removeEventListener, writable: false }
        });
    }
    return Document;
});
