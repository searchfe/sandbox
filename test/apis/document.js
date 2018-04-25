define(function (require) {
    var Sandbox = require('src/sandbox');
    describe('apis/document', function () {
        var sandbox;
        beforeEach(function () {
            delete document.documentElement.sandbox;
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

        it('should maintain title', function () {
            sandbox.document.title = 'origin';
            sandbox.stop();
            document.title = 'changed';
            sandbox.run();
            expect(sandbox.document.title).to.equal('origin');
        });
    });
});
