define(function (require) {
    var states = require('./states');

    return function (sandbox) {
        return {
            untilRunning: function (cb, thisArg) {
                return function () {
                    if (sandbox.state === states.RUNNING) {
                        return cb.apply(thisArg, arguments);
                    }
                    sandbox.on('run', function () {
                        return cb.apply(thisArg, arguments);
                    });
                };
            },
            onlyRunning: function (cb, thisArg) {
                return function () {
                    if (sandbox.state === states.RUNNING) {
                        return cb.apply(thisArg, arguments);
                    };
                };
            }
        };
    };
});
