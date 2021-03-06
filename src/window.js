define(function (require) {
    var objUtil = require('./utils/object');
    var eventsMixin = require('./mixins/events');
    var timeoutMixin = require('./mixins/timeout');
    var fetchMixin = require('./mixins/fetch');

    /**
     * 创建一个沙盒上下文
     *
     * @class 沙盒上下文 提供给沙盒内的业务逻辑使用，相当于浏览器的 window。
     * @alias Window
     * @param {HTMLElement} element 沙盒的根 DOM 元素
     * @param {Sandbox} sandbox 绑定到的沙盒对象
     * @implements IEventTarget
     * @implements ITimeout
     * @implements IFetchAPI
     */
    function Window (element, sandbox) {
        var Document = require('./apis/document');

        eventsMixin(sandbox, this);
        timeoutMixin(sandbox, this);
        fetchMixin(sandbox, this);

        /**
         * 沙盒的文档对象
         *
         * @type {Document}
         */
        this.document = new Document(element, sandbox);

        /**
         * Location 对象的封装
         */
        this.location = window.location;

        Object.defineProperties(this, {
            /**
             * 滚动窗口，见 https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
             */
            scrollTo: objUtil.readOnlyMethod(window, 'scrollTo'),
            /**
             * @type {Number}
             * @name Window#pageXOffset
             * @readonly
             */
            pageXOffset: objUtil.readOnlyProperty(window, 'pageXOffset'),

            /**
             * @type {Number}
             * @name Window#pageYOffset
             * @readonly
             */
            pageYOffset: objUtil.readOnlyProperty(window, 'pageYOffset'),

            /**
             * @type {Number}
             * @name Window#innerHeight
             * @readonly
             */
            innerHeight: objUtil.readOnlyProperty(window, 'innerHeight'),

            /**
             * @type {Number}
             * @name Window#outerHeight
             * @readonly
             */
            outerHeight: objUtil.readOnlyProperty(window, 'outerHeight'),

            /**
             * @type {Number}
             * @name Window#innerWidth
             * @readonly
             */
            innerWidth: objUtil.readOnlyProperty(window, 'innerWidth'),

            /**
             * @type {Number}
             * @name Window#outerWidth
             * @readonly
             */
            outerWidth: objUtil.readOnlyProperty(window, 'outerWidth')
        });
    }
    return Window;
});
