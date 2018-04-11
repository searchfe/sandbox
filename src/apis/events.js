define(function () {
    return function (scope, sandbox) {
        var listeners = Object.create(null);

        function addEventListener (event, cb, useCapture) {
            var item = record(event, cb, useCapture);
            window.addEventListener(event, item.listener, useCapture);
        }

        function removeEventListener (event, cb, useCapture) {
            var item = retrieve(event, cb, useCapture);
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

        function retrieve (event, cb, useCapture) {
            var list = listeners[event];
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (item.cb === cb && item.useCapture === useCapture) {
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

        Object.defineProperty(scope, 'addEventListener', {
            value: addEventListener,
            writable: false
        });

        Object.defineProperty(scope, 'removeEventListener', {
            value: removeEventListener,
            writable: false
        });

        return { die: removeAllEventListener };
    };
});
