define(function () {
    var Sandbox = require('./src/sandbox');

    Sandbox.apis.push(require('./src/apis/setTimeout'));
    Sandbox.apis.push(require('./src/apis/setInteval'));
    Sandbox.apis.push(require('./src/apis/window'));

    return Sandbox;
});
