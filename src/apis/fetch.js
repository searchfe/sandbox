define(function (require) {
    return function (sandbox) {
        if (!window.fetch) {
            var msg = 'Fetch API not implemented by your browser, ' +
                'consider a polyfill: https://www.npmjs.com/package/whatwg-fetch';
            console.log(msg);
            return;
        }
        return function fetch (input, init) {
            return new Promise(function (resolve, reject) {
                window.fetch(input, init)
                .then(sandbox.delegate.untilRunning(function (result) {
                    resolve(result);
                }))
                .catch(sandbox.delegate.untilRunning(function (err) {
                    reject(err);
                }));
            });
        };
    };
});
