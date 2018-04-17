define(function (require) {
    return {
        readOnly: function (val) {
            return {
                value: val,
                writable: false
            };
        },
        readOnlyProperty: function (obj, property) {
            return {
                get: function () {
                    return obj[property];
                }
            };
        }
    };
});
