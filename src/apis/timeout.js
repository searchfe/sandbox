define(function () {
    return function (scope, sandbox) {
        Object.defineProperty(scope, 'setInterval', {
            value: function (fn, timeout) {
                fn = sandbox.delegate.onlyRunning(fn);
                return setInterval(fn, timeout);
            },
            writable: false
        });
        Object.defineProperty(scope, 'setTimeout', {
            value: function (fn, timeout) {
                fn = sandbox.delegate.untilRunning(fn);
                return setTimeout(fn, timeout);
            },
            writable: false
        });
    };
});
