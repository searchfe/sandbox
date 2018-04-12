define(function () {
    return function () {
        /**
        * 沙盒环境，提供给沙盒内的业务逻辑使用，相当于浏览器的 window。
        *
        * @module Scope
        */
        var scope = Object.create(null);
        return scope;
    };
});
