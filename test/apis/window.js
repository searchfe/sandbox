define(function (require) {
    var Sandbox = require('src/sandbox');
    var stub = require('../stub');
    describe('apis/window', function () {
        var sandbox;
        var div;
        beforeEach(function () {
            delete document.documentElement.sandbox;
            delete document.body.sandbox;
        });

        before(function () {
            div = document.createElement('div');
            div.innerHTML = stub.paragraphs(50);
            document.body.appendChild(div);
        });
        beforeEach(function () {
            sandbox = new Sandbox(document.documentElement);
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
        });
        after(function () {
            document.body.removeChild(div);
        });

        it('should have document property', function () {
            expect(sandbox.window.document.documentElement)
            .to.equal(document.documentElement);
        });

        it('should have width/height properties', function () {
            expect(sandbox.window.innerHeight).to.equal(window.innerHeight);
            expect(sandbox.window.innerWidth).to.equal(window.innerWidth);
            expect(sandbox.window.outerHeight).to.equal(window.outerHeight);
            expect(sandbox.window.outerWidth).to.equal(window.outerWidth);
        });

        it('should have scroll properties', function () {
            sandbox.window.scrollTo(0, 37);
            expect(window.pageYOffset).to.equal(37);
            expect(sandbox.window.pageXOffset).to.equal(0);
            expect(sandbox.window.pageYOffset).to.equal(37);
        });
    });
});
