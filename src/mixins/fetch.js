/**
 * Fetch API 的封装，见 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * 具体实现取决于当前浏览器版本，以及当前环境的 Fetch Polyfill
 *
 * @interface IFetchAPI
 */
define(function (require) {
    var objUtil = require('../utils/object');

    return function (sandbox, target) {
        /**
         * 发起一个被沙盒托管的网络请求，API 请参考：
         * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
         *
         * @memberOf IFetchAPI
         * @param {String} input 目标 url
         * @param {Function} init 请求参数
         */
        function fetch (input, init) {
            return new Promise(function (resolve, reject) {
                window.fetch(input, init)
                .then(sandbox.delegate.untilRunning(function (result) {
                    resolve(result);
                }))
                .catch(sandbox.delegate.untilRunning(function (err) {
                    reject(err);
                }));
            });
        }

        Object.defineProperty(target, 'fetch', objUtil.readOnlyValue(fetch));
    };
});
