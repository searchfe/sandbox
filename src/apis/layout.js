define(function () {
    var events = require('./events');

    return function (scope, sandbox) {
        var win = {pageXOffset};

        events(win, sandbox);
        layout(win, sandbox);

        Object.defineProperty(scope, 'window', {
            value: win,
            writable: false
        });
    };
});
