define(function (require) {
    var Sandbox = require('src/sandbox');
    describe('apis/document', function () {
        var sandbox;
        beforeEach(function () {
            sandbox = new Sandbox(document.documentElement);
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
        });

        it('should set to sandbox.document', function () {
            expect(sandbox.document).to.equal(sandbox.window.document);
        });

        it('should have documentElement property', function () {
            expect(sandbox.document.documentElement)
            .to.equal(document.documentElement);
        });

        it('should have scrollingElement property', function () {
            expect(sandbox.document).to.have.property('scrollingElement');
        });
    });
});
