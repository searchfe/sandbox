define(function (require) {
    var objUtil = require('../utils/object');
    var eventsMixin = require('./events');

    /**
     * 创建一个元素对象
     *
     * @class 元素对象 这是 HTMLElement 的一个沙盒代理对象，封装并托管了 DOM 操作。
     * @alias Element
     * @implements EventTarget
     * @param {HTMLElement} element HTML 元素对象
     */
    function Element (element, sandbox) {
        eventsMixin(sandbox, this);

        Object.defineProperties(this, {
            /**
             * @type {Document}
             * @name Element#scrollTo
             */
            scrollTo: objUtil.readOnly(function () {
                return element.scrollTo.apply(element, arguments);
            }),
            /**
             * @type {Number}
             * @name Element#offsetTop
             * @readonly
             */
            offsetTop: objUtil.readOnlyProperty(element, 'offsetTop'),
            /**
             * @type {Number}
             * @name Element#offsetLeft
             * @readonly
             */
            offsetLeft: objUtil.readOnlyProperty(element, 'offsetLeft'),
            /**
             * @type {Number}
             * @name Element#offsetHeight
             * @readonly
             */
            offsetHeight: objUtil.readOnlyProperty(element, 'offsetHeight'),
            /**
             * @type {Number}
             * @name Element#offsetWidth
             * @readonly
             */
            offsetWidth: objUtil.readOnlyProperty(element, 'offsetWidth'),
            /**
             * @type {Number}
             * @name Element#scrollHeight
             * @readonly
             */
            scrollHeight: objUtil.readOnlyProperty(element, 'scrollHeight'),
            /**
             * @type {Number}
             * @name Element#scrollWidth
             * @readonly
             */
            scrollWidth: objUtil.readOnlyProperty(element, 'scrollWidth'),
            /**
             * @type {Number}
             * @name Element#clientHeight
             * @readonly
             */
            clientHeight: objUtil.readOnlyProperty(element, 'clientHeight'),
            /**
             * @type {Number}
             * @name Element#clientWidth
             * @readonly
             */
            clientWidth: objUtil.readOnlyProperty(element, 'clientWidth'),
            /**
             * @type {Number}
             * @name Element#scrollTop
             * @readonly
             */
            scrollTop: {
                get: function () {
                    return element.scrollTop;
                },
                set: function (val) {
                    return (element.scrollTop = val);
                }
            },
            /**
             * @type {Number}
             * @name Element#scrollLeft
             * @readonly
             */
            scrollLeft: {
                get: function () {
                    return element.scrollLeft;
                },
                set: function (val) {
                    return (element.scrollLeft = val);
                }
            }
        });
    }
    return Element;
});
