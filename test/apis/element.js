define(function (require) {
    var Sandbox = require('src/sandbox');
    var stub = require('../stub');
    describe('apis/element', function () {
        var sandbox;
        var div;

        beforeEach(function () {
            div = document.createElement('div');
            div.innerHTML = stub.paragraphs(50);
            div.style.overflow = 'scroll';
            div.style.height = '800px';
            div.style.width = '10px';
            div.style.border = '5px solid black';
            document.body.appendChild(div);
            sandbox = new Sandbox(div);
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
            document.body.removeChild(div);
        });

        it('should set clientHeight/clientWidth properties accordingly', function () {
            var el = sandbox.document.documentElement;
            expect(el.clientHeight).to.equal(800);
            expect(el.clientWidth).to.equal(10);
        });
        it('should set offsetHeight/offsetWidth properties accordingly', function () {
            var el = sandbox.document.documentElement;
            expect(el.offsetHeight).to.equal(810);
            expect(el.offsetWidth).to.equal(20);
        });
        it('should set scrollHeight/scrollWidth properties accordingly', function () {
            var el = sandbox.document.documentElement;
            expect(el.scrollHeight).to.be.above(800);
            expect(el.scrollWidth).to.be.above(10);
        });
        it('should set scrollLeft/scrollTop properties accordingly', function () {
            var el = sandbox.document.documentElement;
            expect(el.scrollLeft).to.equal(0);
            expect(el.scrollTop).to.equal(0);
            el.scrollLeft = 2;
            el.scrollTop = 3;
            expect(el.scrollLeft).to.equal(2);
            expect(el.scrollTop).to.equal(3);
            expect(div.scrollLeft).to.equal(2);
            expect(div.scrollTop).to.equal(3);
        });
        it('should implement scrollTo', function () {
            var el = sandbox.document.documentElement;
            expect(el.scrollLeft).to.equal(0);
            expect(el.scrollTop).to.equal(0);
            el.scrollTo(2, 3);
            expect(el.scrollLeft).to.equal(2);
            expect(el.scrollTop).to.equal(3);
        });
    });
});
