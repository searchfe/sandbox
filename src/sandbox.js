define(function (require) {
    var assert = require('@searchfe/assert');
    var dom = require('./utils/dom');
    var delegate = require('./delegate');
    var states = require('./states');
    var Window = require('./window');

    /**
     * 创建后默认处于睡眠状态。需要调用 `sandbox.run()` 让它开始工作。
     *
     * @class 沙盒实例 创建后默认处于睡眠状态。需要调用 `sandbox.run()` 让它开始工作。
     * @alias Sandbox
     * @param {Function} element 沙盒对应的 DOM 根元素
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
    function Sandbox (element) {
        assert(dom.isElement(element), 'an HTMLElement should be passed to create a sandbox');
        this.delegate = delegate(this);
        this.listeners = {
            run: [],
            die: [],
            stop: []
        };
        this.window = new Window(element, this);
        this.document = this.window.document;
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
         * @param {Function} type the event type
         * @param {Function} cb the callback
         * @throws {Error} event type not defined
         */
        on: function (type, cb) {
            assert(this.listeners[type], 'event type ' + type + ' not defined');
            cb && this.listeners[type].push(cb);
        },

        /**
         * @private
         */
        trigger: function (type) {
            assert(this.listeners[type], 'event type ' + type + ' not defined');
            this.listeners[type].forEach(function (listener) {
                listener();
            });
        },

        /**
         * Remove a listener to the sandbox, available event types: run, stop, die
         *
         * @param {Function} type the event type
         * @param {Function} cb the callback
         * @throws {Error} event type not defined
         */
        off: function (type, cb) {
            assert(this.listeners[type], 'event type ' + type + ' not defined');
            var list = this.listeners[type];
            for (var i = 0; i < list.length; i++) {
                if (list[i] === cb) {
                    list.splice(i--, 1);
                }
            }
        }
    };

    return Sandbox;
});
