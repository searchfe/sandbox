define(function () {
    function once (obj, event, cb) {
        function listener () {
            obj.removeEventListener(event, listener);
            return cb.apply(this, arguments);
        }
        obj.addEventListener(event, listener);
    }
    return {once};
});
