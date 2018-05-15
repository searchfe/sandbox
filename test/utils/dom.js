define(function (require) {
    var dom = require('src/utils/dom');
    describe('utils/dom', function () {
        var parent;
        var child;

        beforeEach(function () {
            parent = document.createElement('div');
            child = document.createElement('div');
            parent.appendChild(child);
        });

        describe('.contains()', function () {
            it('should return true for direct child', function () {
                expect(dom.contains(parent, child)).to.equal(true);
            });
            it('should return false if not child', function () {
                expect(dom.contains(child, parent)).to.equal(false);
            });
            it('should return true for itself', function () {
                expect(dom.contains(parent, parent)).to.equal(true);
            });
        });

        describe('.contains() polyfill', function () {
            beforeEach(function () {
                parent.contains = null;
            });
            it('should return true for direct child', function () {
                expect(dom.contains(parent, child)).to.equal(true);
            });
            it('should return false if not child', function () {
                expect(dom.contains(child, parent)).to.equal(false);
            });
            it('should return true for itself', function () {
                expect(dom.contains(parent, parent)).to.equal(true);
            });
        });
    });
});
