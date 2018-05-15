define(function (require) {
    return function (sandbox, target) {
        /**
         * 沙盒文档标题
         *
         * @type {String}
         * @name Document#title
         * @todo Implement 做一个栈，保证退场后上一个页面（不论是否在沙盒中）的 title 也能恢复
         */
        var title = document.title;
        sandbox.on('run', function () {
            document.title = title;
        });

        Object.defineProperty(target, 'title', {
            get: function () {
                return title;
            },
            set: function (val) {
                console.log('setting to', val);
                document.title = title = val;
            }
        });
    };
});
