define(['src/mixins/events', 'src/sandbox', '../stub'], function (events, Sandbox, stub) {
    describe('mixins/events', function () {
        var sandbox;

        beforeEach(function () {
            delete document.body.sandbox;
            sandbox = new Sandbox(document.body);
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
        });

        it('should add event listener', function (done) {
            var listener = sinon.spy();
            sandbox.window.addEventListener('click', listener);
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
            sandbox.window.addEventListener('click', listener);
            stub.once(window, 'click', function () {
                expect(listener).to.not.have.been.called;
                done();
            });
            window.dispatchEvent(new Event('click'));
        });

        it('should not respond if dead', function (done) {
            var listener = sinon.spy();
            sandbox.die();
            sandbox.window.addEventListener('click', listener);
            stub.once(window, 'click', function () {
                expect(listener).to.not.have.been.called;
                done();
            });
            window.dispatchEvent(new Event('click'));
        });

        it('should not respond if removed', function (done) {
            var listener = sinon.spy();
            sandbox.window.addEventListener('click', listener);
            sandbox.window.removeEventListener('click', listener);
            stub.once(window, 'click', function () {
                expect(listener).to.not.have.been.called;
                done();
            });
            window.dispatchEvent(new Event('click'));
        });

        it('should respond if not removed', function (done) {
            var listener = sinon.spy();
            sandbox.window.addEventListener('click', listener);
            sandbox.window.removeEventListener('click', sinon.spy());
            stub.once(window, 'click', function () {
                expect(listener).to.have.been.called;
                done();
            });
            window.dispatchEvent(new Event('click'));
        });

        it('should removeall listeners once dead', function (done) {
            var listener = sinon.spy();
            sandbox.window.addEventListener('click', listener);
            sandbox.die();
            stub.once(window, 'click', function () {
                expect(listener).to.not.have.been.called;
                done();
            });
            window.dispatchEvent(new Event('click'));
        });
    });
});
