define(function (require) {
    var objUtil = require('../utils/object');
    var dom = require('../utils/dom');
    var titleMixin = require('./title');
    var Element = require('./element');

    /**
     * 创建一个文档对象
     *
     * @class 沙盒文档 局部的 DOM 文档对象，托管了所有事件，页面属性等。
     * @alias Document
     * @param {Element} element 沙盒上下文
     * @param {Sandbox} sandbox 对应的沙盒对象
     */
    function Document (element, sandbox) {
        var scrollingElement = document.scrollingElement || document.body;

        /**
         * 封装 querySelector
         *
         * @type {Function}
         * @name Document#querySelector
         * @readonly
         */
        function querySelector (selector) {
            if (dom.match(element, selector)) {
                return element;
            }
            return element.querySelector(selector);
        }

        /**
         * 封装 querySelectorAll，限制：返回值类型为 Array 而非 NodeList，这意味着返回列表不是 Live 的。
         *
         * @type {Function}
         * @name Document#querySelectorAll
         * @readonly
         */
        function querySelectorAll (selector) {
            var list = Array.prototype.slice.call(element.querySelectorAll(selector));
            if (dom.match(element, selector)) {
                list.unshift(element);
            }
            return list;
        }

        /**
         * 与当前文档绑定的沙盒对象
         *
         * @type {Sandbox}
         */
        this.sandbox = sandbox;

        titleMixin(sandbox, this);

        Object.defineProperties(this, {
            /**
             * @type {HTMLElement}
             * @name Document#documentElement
             * @readonly
             */
            documentElement: objUtil.readOnlyValue(element),

            /**
             * @type {Element}
             * @name Document#scrollingElement
             * @readonly
             */
            scrollingElement: objUtil.readOnlyValue(new Element(scrollingElement, sandbox)),
            /**
             * @type {Element}
             * @name Document#cookie
             * @readonly
             */
            cookie: objUtil.readWriteProperty(document, 'cookie'),
            /**
             * @type {Element}
             * @name Document#createElement
             * @readonly
             */
            createElement: objUtil.readOnlyMethod(document, 'createElement'),
            querySelector: objUtil.readOnlyValue(querySelector),
            querySelectorAll: objUtil.readOnlyValue(querySelectorAll)
        });
    }

    return Document;
});
