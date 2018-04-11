define(function () {
    var events = require('./events');
    var layout = require('./layout');

    return function (scope, sandbox) {
        var win = {};

        events(win, sandbox);
        layout(win, sandbox);

        Object.defineProperty(scope, 'window', {
            value: win,
            writable: false
        });
    };
});
