define(function () {
    return function (scope, sandbox) {
        Object.defineProperty(scope, 'pageXOffset', {
            get: function () {
                return window.pageXOffset;
            }
        });
    };
});
