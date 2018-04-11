define(['src/apis/timeout', 'src/sandbox', '../stub'], function (timeout, Sandbox, stub) {
    describe('apis/timeout', function () {
        var sandbox;

        beforeEach(function () {
            Sandbox.apis = [timeout];
            sandbox = new Sandbox(document.body);
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
        });

        describe('setTimeout', function () {
            it('should call callback', function (done) {
                var listener = sinon.spy();
                sandbox.scope.setTimeout(listener);
                setTimeout(function () {
                    expect(listener).to.have.been.calledOnce;
                    done();
                });
            });
            it('should stop calling callback once stoped', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                sandbox.scope.setTimeout(listener);
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
            it('should call once become running', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                sandbox.scope.setTimeout(listener);
                sandbox.run();
                setTimeout(function () {
                    expect(listener).to.have.been.called;
                    done();
                });
            });
            it('should stop calling callback once dead', function (done) {
                var listener = sinon.spy();
                sandbox.die();
                sandbox.scope.setTimeout(listener);
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
        });
        describe('setInterval', function () {
            it('should call callback', function (done) {
                var listener = sinon.spy();
                sandbox.scope.setInterval(listener, 1);
                setTimeout(function () {
                    console.log(listener.callCount);
                    expect(listener.callCount).to.be.at.least(5);
                    done();
                }, 100);
            });
            it('should stop calling callback once stoped', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                sandbox.scope.setInterval(listener, 1);
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
            it('should call once become running', function (done) {
                var listener = sinon.spy();
                sandbox.stop();
                sandbox.scope.setInterval(listener, 1);
                sandbox.run();
                setTimeout(function () {
                    expect(listener.callCount).to.be.at.least(5);
                    done();
                }, 100);
            });
            it('should stop calling callback once dead', function (done) {
                var listener = sinon.spy();
                sandbox.die();
                sandbox.scope.setInterval(listener, 1);
                setTimeout(function () {
                    expect(listener).to.not.have.been.called;
                    done();
                });
            });
        });
    });
});
