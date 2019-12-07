/**
 * 事件接口，用于托管全局事件。Window 和 Document 对象实现了该接口。
 * 根元素以下的事件监听不予监听，见：https://github.com/searchfe/sandbox/issues/2
 *
 * @interface IEventTarget
 */
define(function () {
    return function (sandbox, target) {
        var listeners = Object.create(null);

        /**
         * Add an event listener to the hosted object
         *
         * @memberOf IEventTarget
         * @param {String} event The event type
         * @param {Function} cb The event listener
         * @param {Boolean} useCapture Whether or not use capture
         */
        function addEventListener (event, cb, useCapture) {
            var item = record(event, cb, useCapture);
            window.addEventListener(event, item.listener, useCapture);
        }

        /**
         * Remove an event listener to the hosted object
         *
         * @memberOf IEventTarget
         * @param {String} event The event type
         * @param {Function} cb The event listener
         * @param {Boolean} useCapture Whether or not use capture
         */
        function removeEventListener (event, cb, useCapture) {
            var item = findAndRemove(event, cb, useCapture);
            if (item) {
                window.removeEventListener(event, item.listener, useCapture);
            }
        }

        function removeAllEventListener () {
            Object.keys(listeners).forEach(function (event) {
                listeners[event].forEach(function (item) {
                    window.removeEventListener(event, item.listener, item.useCapture);
                });
            });
        }

        function findAndRemove (event, cb, useCapture) {
            var list = listeners[event];
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (item.cb === cb && item.useCapture === useCapture) {
                    list.splice(i, 1);
                    return item;
                }
            }
            return null;
        }

        function record (event, cb, useCapture) {
            var listener = sandbox.delegate.onlyRunning(cb);
            if (!listeners[event]) {
                listeners[event] = [];
            }
            var item = {
                cb: cb,
                listener: listener,
                useCapture: useCapture
            };
            listeners[event].push(item);
            return item;
        }

        sandbox.on('die', removeAllEventListener);

        Object.defineProperties(target, {
            addEventListener: { value: addEventListener, writable: false },
            removeEventListener: { value: removeEventListener, writable: false }
        });
    };
});
