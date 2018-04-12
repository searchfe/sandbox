/**
* @alias module:Scope
*/
define(function () {
    return function (scope, sandbox) {
        var timeouts = Object.create(null);
        var intevals = Object.create(null);

        /**
         * The setInterval() method repeatedly calls a function or executes a code snippet,
         * with a fixed time delay between each call.
         * It returns an interval ID which uniquely identifies the interval,
         * so you can remove it later by calling clearInterval()
         *
         * @instance
         * @memberOf module:Scope
         * @param {Function} fn The scheduled callback
         * @param {Number} timeout Time inteval in millisecond
         */
        function setInterval (fn, timeout) {
            fn = sandbox.delegate.onlyRunning(fn);
            var id = window.setInterval(fn, timeout);
            intevals[id] = true;
            return id;
        }

        /**
         * 移除定时器
         *
         * @instance
         * @memberOf module:Scope
         * @param {Number} id 定时器 ID，即 setInteval 的返回值
         */
        function clearInterval (id) {
            delete intevals[id];
            window.clearInterval(id);
        }

        /**
         * The setTimeout() method sets a timer which executes a function or
         * specified piece of code once after the timer expires.
         *
         * @instance
         * @memberOf module:Scope
         * @param {Function} fn The scheduled callback
         * @param {Number} timeout Time in millisecond
         */
        function setTimeout (fn, timeout) {
            fn = sandbox.delegate.untilRunning(fn);
            var id = window.setTimeout(fn, timeout);
            timeouts[id] = true;
            return id;
        }

        /**
         * 移除定时器
         *
         * @instance
         * @memberOf module:Scope
         * @param {Number} id 定时器 ID，即 setTimeout 的返回值
         */
        function clearTimeout (id) {
            delete timeouts[id];
            window.clearTimeout(id);
        }

        Object.defineProperty(scope, 'setInterval', {
            value: setInterval,
            writable: false
        });

        Object.defineProperty(scope, 'clearInterval', {
            value: clearInterval,
            writable: false
        });

        Object.defineProperty(scope, 'setTimeout', {
            value: setTimeout,
            writable: false
        });

        Object.defineProperty(scope, 'clearTimeout', {
            value: clearTimeout,
            writable: false
        });

        sandbox.on('die', function () {
            Object.keys(timeouts).forEach(clearTimeout);
            Object.keys(intevals).forEach(clearInterval);
        });
    };
});
