define(function (require) {
    return function (scope, sandbox) {
        Object.defineProperty(scope, 'pageXOffset', {
            get: function () {
                return window.pageXOffset;
            }
        });
    };
});
