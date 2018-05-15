define(function (require) {
    var Sandbox = require('src/sandbox');
    var mixin = require('src/mixins/timeout');
    describe('apis/timeout', function () {
        var sandbox;

        beforeEach(function () {
            delete document.body.sandbox;
            sandbox = new Sandbox(document.body);
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
        });

        describe('setTimeout', function () {
            it('should call callback', function (done) {
                var listener = sinon.spy();
                sandbox.window.setTimeout(listener);
                setTimeout(function () {
                    expect(listener).to.have.been.calledOnce;
                    done();
                });
            });
            it('should stop calling callback once stoped', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                sandbox.window.setTimeout(listener);
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
            it('should call once become running', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                sandbox.window.setTimeout(listener);
                setTimeout(function () {
                    sandbox.run();
                    expect(listener).to.have.been.called;
                    done();
                });
            });
            it('should stop calling callback once dead', function (done) {
                var listener = sinon.spy();
                sandbox.die();
                sandbox.window.setTimeout(listener);
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
        });
        describe('clearTimeout', function () {
            it('should clear callback', function (done) {
                var listener = sinon.spy();
                var id = sandbox.window.setTimeout(listener);
                sandbox.window.clearTimeout(id);
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
            it('should work even when stopped', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                var id = sandbox.window.setTimeout(listener);
                sandbox.window.clearTimeout(id);
                setTimeout(function () {
                    sandbox.run();
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
            it('should clear timeouts once dead', function (done) {
                var listener = sinon.spy();
                sandbox.window.setTimeout(listener);
                sandbox.die();
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
        });
        describe('setInterval', function () {
            it('should call callback', function (done) {
                var listener = sinon.spy();
                sandbox.window.setInterval(listener, 1);
                setTimeout(function () {
                    expect(listener.callCount).to.be.at.least(5);
                    done();
                }, 100);
            });
            it('should stop calling callback once stoped', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                sandbox.window.setInterval(listener, 1);
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
            it('should call once become running', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                sandbox.window.setInterval(listener, 1);
                sandbox.run();
                setTimeout(function () {
                    expect(listener.callCount).to.be.at.least(5);
                    done();
                }, 100);
            });
            it('should stop calling callback once dead', function (done) {
                var listener = sinon.spy();
                sandbox.die();
                sandbox.window.setInterval(listener, 1);
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
        });
        describe('clearInteval', function () {
            it('should clear callback', function (done) {
                var listener = sinon.spy();
                var id = sandbox.window.setInterval(listener, 1);
                sandbox.window.clearInterval(id);
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
            it('should work even when stopped', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                var id = sandbox.window.setInterval(listener, 1);
                sandbox.window.clearInterval(id);
                setTimeout(function () {
                    sandbox.run();
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
            it('should clear timeouts once dead', function (done) {
                var listener = sinon.spy();
                sandbox.window.setInterval(listener, 1);
                sandbox.die();
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
        });

        describe('requestAnimationFrame', function () {
            it('should call callback', function (done) {
                var listener = sinon.spy();
                sandbox.window.requestAnimationFrame(listener);
                window.requestAnimationFrame(function () {
                    expect(listener).to.have.been.calledOnce;
                    done();
                });
            });
            it('should stop calling callback once stoped', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                sandbox.window.requestAnimationFrame(listener);
                window.requestAnimationFrame(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
            it('should call once become running', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                sandbox.window.requestAnimationFrame(listener);
                window.requestAnimationFrame(function () {
                    sandbox.run();
                    expect(listener).to.have.been.called;
                    done();
                });
            });
            it('should stop calling callback once dead', function (done) {
                var listener = sinon.spy();
                sandbox.die();
                sandbox.window.requestAnimationFrame(listener);
                window.requestAnimationFrame(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
            it('requestAnimFallback should work', function (done) {
                var begin = Date.now();
                mixin.requestAnimFallback(function () {
                    var end = Date.now();
                    expect(end - begin).to.be.above(5);
                    expect(end - begin).to.be.below(25);
                    done();
                });
            });
        });
    });
});
