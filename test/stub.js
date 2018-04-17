define(function () {
    function paragraphs (N) {
        var html = '';
        while (N--) {
            html += '<p>Hello World</p>';
        }
        return html;
    }
    function once (obj, event, cb) {
        function listener () {
            obj.removeEventListener(event, listener);
            return cb.apply(this, arguments);
        }
        obj.addEventListener(event, listener);
    }
    return {once: once, paragraphs: paragraphs};
});
