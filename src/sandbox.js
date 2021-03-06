define(function (require) {
    var assert = require('@searchfe/assert');
    var dom = require('./utils/dom');
    var delegate = require('./delegate');
    var obj = require('./utils/object');
    var states = require('./states');
    var Window = require('./window');

    /**
     * 创建后默认处于睡眠状态。需要调用 `sandbox.run()` 让它开始工作。
     *
     * @class 沙盒实例 创建后默认处于睡眠状态。需要调用 `sandbox.run()` 让它开始工作。
     * @alias Sandbox
     * @param {Function} element 沙盒对应的 DOM 根元素
     * @param {Object} [context] 初始化作用域，会被合并到 sandbox.window
     * @example
     * require(['@searchfe/sandbox'], function(Sandbox){
     *   var sandbox = new Sandbox(document.querySelector('#app'))
     *   sandbox.run();
     *   sandbox.setInterval(() => console.log('timeout!'), 100)
     *   setTimeout(function(){
     *     sandbox.stop();
     *     // sandbox.die();
     *   }, 5000);
     * })
     */
    function Sandbox (element, context) {
        assert(dom.isElement(element), 'an HTMLElement should be passed to create a sandbox');
        assert(!element.sandbox, 'a sandbox has already craeted for the element');
        element.sandbox = this;
        this.delegate = delegate(this);
        this.listeners = {
            run: [],
            die: [],
            stop: []
        };
        this.window = new Window(element, this);
        this.document = this.window.document;
        this.state = states.IDLE;
        obj.assign(this.window, context);
    }

    Sandbox.prototype = {
        /**
         * 让沙盒开始工作，开始接管事件、定时器、以及网络回调。
         */
        run: function () {
            assert(this.state !== states.DEAD, 'I\'m dead, leave me alone');
            if (this.state === states.RUNNING) {
                return false;
            }
            this.state = states.RUNNING;
            this.trigger('run');
        },

        /**
         * 停止沙盒，冻结定时器和网络回调、忽略事件。
         */
        stop: function () {
            assert(this.state !== states.DEAD, 'I\'m dead, leave me alone');
            if (this.state === states.IDLE) {
                return false;
            }
            this.state = states.IDLE;
            this.trigger('stop');
        },

        /**
         * 如果在跑，就让它停；如果已停，就让它跑
         */
        toggle: function () {
            if (this.state === states.IDLE) {
                return this.run();
            } else {
                return this.stop();
            }
        },

        /**
         * 杀死沙盒，销毁内部的定时器、网络、事件回调。一旦杀死不可重新开始工作。
         */
        die: function () {
            if (this.state === states.DEAD) {
                return false;
            }
            this.state = states.DEAD;
            this.trigger('die');
        },

        /**
         * Add a listener to the sandbox, available event types: run, stop, die
         *
         * @param {string} type the event type
         * @param {Function} cb the callback
         * @param {boolean} once execute only once
         */
        on: function (type, cb, once) {
            // assert(this.listeners[type], 'event type ' + type + ' not defined');
            if (!this.listeners[type]) {
                this.listeners[type] = [];
            }
            cb && this.listeners[type].push({
                function: cb,
                once: !!once
            });
        },

        /**
         * Attach a handler to an event for the sandbox. The handler is executed at most once per event type.
         *
         * @param {string} type the event type
         * @param {Function} cb the callback
         * @throws {Error} event type not defined
         */
        one: function (type, cb) {
            return this.on(type, cb, true);
        },

        /**
         * Execute all handlers and behaviors attached to the sandbox for the given event type
         *
         * @param {string} type the event type
         */
        trigger: function (type) {
            if (!this.listeners[type]) {
                return;
            }
            var listeners = this.listeners[type].slice(0);
            var len = listeners.length;
            while (len--) {
                var listener = listeners[len];
                if (listener.once === true) {
                    this.off(type, listener.function);
                }
                listener.function();
            }
        },

        /**
         * Remove a listener to the sandbox, available event types: run, stop, die
         *
         * @param {string} type the event type
         * @param {Function} cb the callback
         * @throws {Error} event type not defined
         */
        off: function (type, cb) {
            assert(this.listeners[type], 'event type ' + type + ' not defined');
            var list = this.listeners[type];
            for (var i = 0; i < list.length; i++) {
                if (list[i].function === cb) {
                    list.splice(i--, 1);
                }
            }
        },

        /**
         * 生成一个子沙盒对象，子沙盒会跟随父沙盒的生命周期。子沙盒会继承当前沙盒的状态，即：
         * 如果当前沙盒处于 RUNNING 状态，子沙盒会立即执行。
         *
         * @param {HTMLElement|string} child 子 HTMLElement 或子元素选择符
         * @param {Object} [context] 子 HTMLElement 或子元素选择符
         * @throws {Error} 沙盒已死
         * @throws {Error} 指定的节点是当前沙盒的祖先
         * @return {Sandbox} 子沙盒对象
         */
        spawn: function (child, context) {
            assert(this.state !== states.DEAD, 'I\'m dead, leave me alone');
            var childElement = obj.isString(child)
                ? this.document.documentElement.querySelector(child)
                : child;
            assert(dom.isElement(childElement), 'child not found or not instanceof HTMLElement');
            assert(
                !dom.contains(child, this.document.documentElement),
                'cannot spawn for ancestor node'
            );

            var sandbox = new Sandbox(childElement);
            obj.assign(sandbox.window, context);

            if (this.state === states.RUNNING) {
                sandbox.run();
            }
            return sandbox;
        }
    };

    return Sandbox;
});
