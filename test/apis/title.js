define(function (require) {
    var Sandbox = require('src/sandbox');
    describe('apis/title', function () {
        var sandbox;

        beforeEach(function () {
            delete document.documentElement.sandbox;
            sandbox = new Sandbox(document.documentElement);
            document.title = '';
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
        });

        it('should set document.title', function () {
            sandbox.document.title = 'foo';
            expect(document.title).to.equal('foo');
        });

        it('should get document.title', function () {
            sandbox.document.title = 'bar';
            expect(sandbox.document.title).to.equal('bar');
        });
    });
});
