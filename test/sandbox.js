define(function (require) {
    var Sandbox = require('src/sandbox');
    var states = require('src/states');

    describe('Sandbox', function () {
        beforeEach(function () {
            delete document.documentElement.sandbox;
            delete document.body.sandbox;
        });
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
            it('should toggle states', function () {
                expect(sandbox.state).to.equal(states.IDLE);
                sandbox.toggle();
                expect(sandbox.state).to.equal(states.RUNNING);
                sandbox.toggle();
                expect(sandbox.state).to.equal(states.IDLE);
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
        describe('#spawn()', function () {
            it('should throw if not contained', function () {
                var sandbox = new Sandbox(document.body);
                expect(function () {
                    sandbox.spawn(document.documentElement);
                }).to.throw(/cannot spawn for ancestor node/);
            });
            it('should throw if not specified', function () {
                var sandbox = new Sandbox(document.body);
                expect(function () {
                    sandbox.spawn();
                }).to.throw(/child not found or not instanceof HTMLElement/);
            });
            it('should throw if already DEAD', function () {
                var sandbox = new Sandbox(document.body);
                sandbox.die();
                expect(function () {
                    sandbox.spawn();
                }).to.throw(/leave me alone/);
            });
            it('should spawn with child HTMLElement', function () {
                expect(document.body.sandbox).to.equal(undefined);
                var sandbox = new Sandbox(document.documentElement);
                var child = sandbox.spawn(document.body);
                expect(document.body.sandbox).to.equal(child);
            });
            it('should spawn with child selector', function () {
                expect(document.body.sandbox).to.equal(undefined);
                var sandbox = new Sandbox(document.documentElement);
                var child = sandbox.spawn('body');
                expect(document.body.sandbox).to.equal(child);
            });
            it('should keep idle if current not running', function () {
                var sandbox = new Sandbox(document.documentElement);
                var child = sandbox.spawn('body');
                expect(child.state).to.equal(states.IDLE);
            });
            it('should run immediately if current running', function () {
                var sandbox = new Sandbox(document.documentElement);
                sandbox.run();
                var child = sandbox.spawn('body');
                expect(child.state).to.equal(states.RUNNING);
            });
        });
    });
});
