define(function (require) {
    return function (sandbox) {
        return function (input, init) {
            return new Promise(function (resolve, reject) {
                fetch(input, init)
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
