define(function (require) {
    var objUtil = require('../utils/object');
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

        Object.defineProperties(this, {
            /**
             * @type {HTMLElement}
             * @name Document#documentElement
             * @readonly
             */
            documentElement: objUtil.readOnly(element),
            /**
             * @type {Element}
             * @name Document#scrollingElement
             * @readonly
             */
            scrollingElement: objUtil.readOnly(new Element(scrollingElement, sandbox)),
            /**
             * @type {String}
             * @name Document#title
             * @readonly
             */
            title: titleFactory(sandbox)
        });
    }

    function titleFactory (sandbox) {
        var title = document.title;
        sandbox.on('run', function () {
            document.title = title;
        });
        return {
            get: function () {
                return title;
            },
            set: function (val) {
                document.title = title = val;
            }
        };
    }
    return Document;
});
