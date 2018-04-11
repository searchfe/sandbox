define(function (require) {
    return {
        isElement: function isElement (o) {
            return (typeof HTMLElement === 'object'
            ? o instanceof HTMLElement
            : o && typeof o === 'object' &&
                o !== null &&
                o.nodeType === 1 &&
                typeof o.nodeName === 'string'
            );
        }
    };
});
