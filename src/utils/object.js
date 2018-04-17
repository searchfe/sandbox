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
        },
        readOnlyProperties: function (obj, properties) {
            var conf = {};
            properties.forEach(function (property) {
                conf[property] = {
                    get: function () {
                        return obj[property];
                    }
                };
            });
            return conf;
        }
    };
});
