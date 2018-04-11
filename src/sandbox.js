define(function (require) {
    var assert = require('@searchfe/assert');
    var dom = require('./utils/dom');
    var delegate = require('./delegate');
    var states = require('./states');

    /**
     * Create a new sandbox.
     * The passed in function will receive functions resolve and reject as its arguments
     * which can be called to seal the fate of the created sandbox.
     *
     * The returned sandbox will be resolved when resolve is called, and rejected when reject called or any exception occurred.
     * If you pass a sandbox object to the resolve function, the created sandbox will follow the state of that sandbox.
     *
     * @param {Function} cb The resolver callback.
     * @constructor
     * @alias module:Sandbox
     */
    function Sandbox (element) {
        assert(dom.isElement(element), 'an HTMLElement should be passed to create a sandbox');
        this.delegate = delegate(this);
        this.scope = Object.create(null);
        this.listeners = {
            run: [],
            die: [],
            stop: []
        };

        Sandbox.apis.forEach(function (factory) {
            factory(this.scope, this);
        }, this);
    }

    /**
     * Resolve the un-trusted sandbox definition function: fn
     * which has exactly the same signature as the .then function
     *
     * @param {Function} fn the reslver
     */
    Sandbox.prototype.run = function (result) {
        assert(this.state !== states.DEAD, 'I\'m dead, leave me alone');
        if (this.state === states.RUNNING) {
            return false;
        }
        this.state = states.RUNNING;
        this.trigger('run');
    };

    /**
     * Resolve the un-trusted sandbox definition function: fn
     * which has exactly the same signature as the .then function
     *
     * @param {Function} fn the reslver
     */
    Sandbox.prototype.stop = function (result) {
        assert(this.state !== states.DEAD, 'I\'m dead, leave me alone');
        if (this.state === states.IDLE) {
            return false;
        }
        this.state = states.IDLE;
        this.trigger('stop');
    };

    /**
     * Resolve the un-trusted sandbox definition function: fn
     * which has exactly the same signature as the .then function
     *
     * @param {Function} fn the reslver
     */
    Sandbox.prototype.die = function (result) {
        if (this.state === states.DEAD) {
            return false;
        }
        this.state = states.DEAD;
        this.trigger('die');
    };

    Sandbox.prototype.on = function (type, cb) {
        assert(this.listeners[type], 'event type ' + type + ' not defined');
        cb && this.listeners[type].push(cb);
    };

    Sandbox.prototype.trigger = function (type) {
        assert(this.listeners[type], 'event type ' + type + ' not defined');
        this.listeners[type].forEach(function (listener) {
            listener();
        });
    };

    Sandbox.prototype.off = function (type, cb) {
        assert(this.listeners[type], 'event type ' + type + ' not defined');
        var list = this.listeners[type];
        for (var i = 0; i < list.length; i++) {
            if (list[i] === cb) {
                list.splice(i--, 1);
            }
        }
    };

    Sandbox.apis = [];
    return Sandbox;
});
