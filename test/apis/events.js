define(['src/apis/events', 'src/sandbox', '../stub'], function (events, Sandbox, stub) {
    describe('apis/events', function () {
        var sandbox;

        beforeEach(function () {
            sandbox = new Sandbox(document.body);
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
        });

        it('should add event listener', function (done) {
            var listener = sinon.spy();
            sandbox.scope.addEventListener('click', listener);
            stub.once(window, 'click', function () {
                expect(listener).to.have.been.calledWithMatch({
                    type: 'click'
                });
                done();
            });
            window.dispatchEvent(new Event('click'));
        });

        it('should not respond if stoped', function (done) {
            var listener = sinon.spy();
            sandbox.stop();
            sandbox.scope.addEventListener('click', listener);
            stub.once(window, 'click', function () {
                expect(listener).to.not.have.been.called;
                done();
            });
            window.dispatchEvent(new Event('click'));
        });

        it('should not respond if dead', function (done) {
            var listener = sinon.spy();
            sandbox.die();
            sandbox.scope.addEventListener('click', listener);
            stub.once(window, 'click', function () {
                expect(listener).to.not.have.been.called;
                done();
            });
            window.dispatchEvent(new Event('click'));
        });

        it('should not respond if removed', function (done) {
            var listener = sinon.spy();
            sandbox.scope.addEventListener('click', listener);
            sandbox.scope.removeEventListener('click', listener);
            stub.once(window, 'click', function () {
                expect(listener).to.not.have.been.called;
                done();
            });
            window.dispatchEvent(new Event('click'));
        });

        it('should respond if not removed', function (done) {
            var listener = sinon.spy();
            sandbox.scope.addEventListener('click', listener);
            sandbox.scope.removeEventListener('click', sinon.spy());
            stub.once(window, 'click', function () {
                expect(listener).to.have.been.called;
                done();
            });
            window.dispatchEvent(new Event('click'));
        });

        it('should removeall listeners once dead', function (done) {
            var listener = sinon.spy();
            sandbox.scope.addEventListener('click', listener);
            sandbox.die();
            stub.once(window, 'click', function () {
                expect(listener).to.not.have.been.called;
                done();
            });
            window.dispatchEvent(new Event('click'));
        });
    });
});
