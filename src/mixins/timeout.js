/**
 * 定时器接口，用于托管定时器。Window 对象使用了该接口。
 *
 * @interface ITimeout
 */
define(function () {
    function factory (sandbox, target) {
        var timeouts = Object.create(null);
        var intevals = Object.create(null);

        /**
         * The setInterval() method repeatedly calls a function or executes a code snippet,
         * with a fixed time delay between each call.
         * It returns an interval ID which uniquely identifies the interval,
         * so you can remove it later by calling clearInterval()
         *
         * @memberOf ITimeout
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
         * @memberOf ITimeout
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
         * @memberOf ITimeout
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
         * requestAnimationFrame() 是一个有 Polyfill 的 requestAnimationFrame()，相当于 16ms 的 timeout
         *
         * @memberOf ITimeout
         * @param {Function} fn The scheduled callback
         */
        function requestAnimationFrame (fn) {
            fn = sandbox.delegate.untilRunning(fn);
            return factory.requestAnimFrame(fn);
        }

        /**
         * 移除定时器
         *
         * @memberOf ITimeout
         * @param {Number} id 定时器 ID，即 setTimeout 的返回值
         */
        function clearTimeout (id) {
            delete timeouts[id];
            window.clearTimeout(id);
        }

        sandbox.on('die', function () {
            Object.keys(timeouts).forEach(clearTimeout);
            Object.keys(intevals).forEach(clearInterval);
        });

        Object.defineProperties(target, {
            requestAnimationFrame: { value: requestAnimationFrame, writable: false },
            setTimeout: { value: setTimeout, writable: false },
            clearTimeout: { value: clearTimeout, writable: false },
            setInterval: { value: setInterval, writable: false },
            clearInterval: { value: clearInterval, writable: false }
        });
    };

    factory.requestAnimFallback = function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

    factory.requestAnimFrame = (window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        factory.requestAnimFallback).bind(window);

    return factory;
});
