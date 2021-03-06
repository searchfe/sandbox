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
        },
        match: function (element, selector) {
            if (element.parentNode && element.parentNode.querySelector(selector) === element) {
                return element;
            }
        },
        contains: function (lhs, rhs) {
            if (lhs.contains) {
                return lhs.contains(rhs);
            } else {
                var parent = rhs;
                while (parent) {
                    if (parent === lhs) return true;
                    parent = parent.parentNode;
                }
            }
            return false;
        }
    };
});
