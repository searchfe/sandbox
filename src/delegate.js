define(function (require) {
    var states = require('./states');

    return function (sandbox) {
        return {
            untilRunning: function (cb, thisArg) {
                return function () {
                    var args = arguments;
                    if (sandbox.state === states.RUNNING) {
                        return cb.apply(thisArg, args);
                    }
                    sandbox.on('run', function () {
                        return cb.apply(thisArg, args);
                    });
                };
            },
            onlyRunning: function (cb, thisArg) {
                return function () {
                    var args = arguments;
                    if (sandbox.state === states.RUNNING) {
                        return cb.apply(thisArg, args);
                    };
                };
            }
        };
    };
});
