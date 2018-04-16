define(['src/sandbox'], function (Sandbox) {
    describe('Sandbox', function () {
        describe('new', function () {
            it('should throw when root element not passed', function () {
                expect(function () {
                    new Sandbox();
                }).to.throw(/HTMLElement should be passed/);
            });
        });
        describe('lifecycle', function () {
            var sandbox;
            var onRun;
            var onStop;
            var onDie;
            beforeEach(function () {
                onRun = sinon.spy();
                onStop = sinon.spy();
                onDie = sinon.spy();
                sandbox = new Sandbox(document.body);
                sandbox.on('run', onRun);
                sandbox.on('stop', onStop);
                sandbox.on('die', onDie);
            });
            it('should trigger run event', function () {
                sandbox.run();
                expect(onRun).to.have.been.calledOnce;
                expect(onStop).to.not.have.been.called;
                expect(onDie).to.not.have.been.called;
            });
            it('should trigger stop event', function () {
                sandbox.run();
                sandbox.stop();
                expect(onRun).to.have.been.calledOnce;
                expect(onStop).to.have.been.calledOnce;
                expect(onDie).to.not.have.been.called;
            });
            it('should trigger die event', function () {
                sandbox.run();
                sandbox.die();
                expect(onRun).to.have.been.calledOnce;
                expect(onStop).to.not.have.been.called;
                expect(onDie).to.have.been.calledOnce;
            });
            it('should not trigger run event if already running', function () {
                sandbox.run();
                sandbox.run();
                expect(onRun).to.have.been.calledOnce;
            });
            it('should not trigger stop event if already stopped', function () {
                sandbox.stop();
                expect(onRun).to.not.have.been.called;
                sandbox.run();
                sandbox.stop();
                sandbox.stop();
                expect(onRun).to.have.been.calledOnce;
            });
            it('should support off event handlers', function () {
                sandbox.off('run', onRun);
                sandbox.run();
                expect(onRun).to.not.have.been.called;
            });
            it('should only off the given handler', function () {
                var spy = sinon.spy();
                sandbox.on('run', spy);
                sandbox.off('run', onRun);
                sandbox.run();
                expect(onRun).to.not.have.been.called;
                expect(spy).to.have.been.calledOnce;
            });
        });
    });
});
