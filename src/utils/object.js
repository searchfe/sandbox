define(function (require) {
    return {
        readOnlyValue: function (val) {
            return {
                value: val,
                writable: false
            };
        },
        readOnlyMethod: function (obj, method) {
            function proxy () {
                return obj[method].apply(obj, arguments);
            }
            return {
                get: function () {
                    return proxy;
                }
            };
        },
        readOnlyProperty: function (obj, property) {
            return {
                get: function () {
                    return obj[property];
                }
            };
        },
        isString: function (value) {
            return value instanceof String || typeof value === 'string';
        }
    };
});
