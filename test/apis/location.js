define(function (require) {
    var Sandbox = require('src/sandbox');
    describe('apis/location', function () {
        var sandbox;

        beforeEach(function () {
            delete document.documentElement.sandbox;
            sandbox = new Sandbox(document.documentElement);
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
        });

        it('should have href property', function () {
            expect(sandbox.window.location.href).to.match(/^https?:\/\//);
        });

        it('should have pathname property', function () {
            expect(sandbox.window.location.pathname).to.match(/^\//);
        });
    });
});
