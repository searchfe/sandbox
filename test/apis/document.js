define(function (require) {
    var Sandbox = require('src/sandbox');
    describe('apis/document', function () {
        var sandbox;
        var div = document.createElement('div');
        div.classList.add('stub-foo');

        beforeEach(function () {
            delete document.documentElement.sandbox;
            document.body.appendChild(div);
            sandbox = new Sandbox(document.documentElement);
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
            document.body.removeChild(div);
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

        describe('cookie', function () {
            it('should write cookie', function () {
                sandbox.document.cookie = 'foo:FOO';
                expect(document.cookie).to.contain('foo:FOO');
                sandbox.document.cookie = 'foo:FOO; expires=Thu, 18 Dec 2013 12:00:00 UTC';
                expect(document.cookie).to.not.contain('foo');
            });
            it('should read cookie', function () {
                document.cookie = 'foo:FOO';
                expect(sandbox.document.cookie).to.contain('foo:FOO');
                document.cookie = 'foo:FOO; expires=Thu, 18 Dec 2013 12:00:00 UTC';
                expect(sandbox.document.cookie).to.not.contain('foo');
            });
        });

        describe('createElement', function () {
            it('should proxy to documentElement', function () {
                var target = sandbox.document.createElement('div');
                expect(target).to.have.property('tagName', 'DIV');
            });
        });

        describe('querySelector', function () {
            it('should proxy to documentElement', function () {
                var target = sandbox.document.querySelector('.stub-foo');
                expect(target).to.equal(div);
            });
            it('should support querying documentElement itself', function () {
                var target = sandbox.document.querySelector('html');
                expect(target).to.equal(document.documentElement);
            });
        });

        describe('querySelectorAll', function () {
            it('should proxy to documentElement', function () {
                var target = sandbox.document.querySelectorAll('.stub-foo');
                expect(target).to.have.lengthOf(1);
                expect(target[0]).to.equal(div);
            });

            it('should support querying documentElement itself', function () {
                var target = sandbox.document.querySelectorAll('html');
                expect(target).to.have.lengthOf(1);
                expect(target[0]).to.equal(document.documentElement);
            });

            it('should support querying children with documentElement itself', function () {
                var target = sandbox.document.querySelectorAll('html, .stub-foo');
                expect(target).to.have.lengthOf(2);
                expect(target[0]).to.equal(document.documentElement);
                expect(target[1]).to.equal(div);
            });
        });
    });
});
