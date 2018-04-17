define(function (require) {
    var Sandbox = require('src/sandbox');
    var stub = require('../stub');
    describe('apis/element', function () {
        var sandbox;
        var div;

        beforeEach(function () {
            div = document.createElement('div');
            div.innerHTML = stub.paragraphs(50);
            div.style.width = '5000px';
            document.body.appendChild(div);

            var html = document.documentElement;
            html.style.overflow = 'scroll';
            html.style.height = '800px';
            html.style.margin = '10px 0 0 12px';
            html.style.width = '10px';
            html.style.border = '5px solid black';
            sandbox = new Sandbox(div);
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
            document.body.removeChild(div);
        });

        it('should set clientHeight/clientWidth properties accordingly', function () {
            var el = sandbox.document.scrollingElement;
            expect(el.clientHeight).to.equal(document.scrollingElement.clientHeight);
            expect(el.clientWidth).to.equal(document.scrollingElement.clientWidth);
        });
        it('should set offsetTop/offsetLeft properties accordingly', function () {
            var el = sandbox.document.scrollingElement;
            expect(el.offsetTop).to.equal(10);
            expect(el.offsetLeft).to.equal(12);
        });
        it('should set offsetHeight/offsetWidth properties accordingly', function () {
            var el = sandbox.document.scrollingElement;
            expect(el.offsetHeight).to.equal(810);
            expect(el.offsetWidth).to.equal(20);
        });
        it('should set scrollHeight/scrollWidth properties accordingly', function () {
            var el = sandbox.document.scrollingElement;
            expect(el.scrollHeight).to.be.above(800);
            expect(el.scrollWidth).to.be.above(10);
        });
        it('should set scrollLeft/scrollTop properties accordingly', function () {
            var el = sandbox.document.scrollingElement;
            expect(el.scrollLeft).to.equal(0);
            expect(el.scrollTop).to.equal(0);
            el.scrollLeft = 2;
            el.scrollTop = 3;
            expect(el.scrollLeft).to.equal(2);
            expect(el.scrollTop).to.equal(3);
        });
        it('should implement scrollTo', function () {
            var el = sandbox.document.scrollingElement;
            el.scrollTo(2, 3);
            expect(el.scrollLeft).to.equal(2);
            expect(el.scrollTop).to.equal(3);
        });
    });
});
