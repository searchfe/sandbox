define(function (require) {
    var Sandbox = require('src/sandbox');
    describe('apis/fetch', function () {
        var sandbox;
        beforeEach(function () {
            delete document.documentElement.sandbox;
            delete document.body.sandbox;
        });

        beforeEach(function () {
            sandbox = new Sandbox(document.documentElement);
            sandbox.run();
        });
        afterEach(function () {
            sandbox.die();
        });

        it('should fetch data', function () {
            return sandbox.window.fetch('/')
            .then(function (response) {
                expect(response.headers.get('Content-Type')).to.equal('text/html');
                return response.text();
            })
            .then(function (text) {
                expect(text).to.contain('</html>');
            });
        });

        it('should resolve 404', function () {
            return sandbox.window.fetch('/foo')
            .then(function (res) {
                expect(res.status).to.equal(404);
            });
        });

        it('should catch error', function (done) {
            sandbox.window.fetch('/foo', {method: 'fuck'})
            .catch(function (err) {
                expect(err).to.be.instanceOf(TypeError);
                done();
            });
        });

        it('should keep pending when stopped', function (done) {
            var state = 'pending';
            sandbox.window.fetch('/').then(function (res) {
                state = 'resolved';
                expect(res.status).to.equal(200);
            });
            sandbox.stop();
            setTimeout(function () {
                expect(state).to.equal('pending');
                sandbox.run();
                setTimeout(function () {
                    expect(state).to.equal('resolved');
                    done();
                }, 100);
            }, 100);
        });
    });
});
