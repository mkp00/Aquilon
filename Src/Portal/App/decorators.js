"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function singleton(target) {
    var instance;
    // a utility function to generate instances of a class
    function construct(constructor, args) {
        function c() {
            constructor.apply(this, args);
        }
        c.prototype = constructor.prototype;
        return new c();
    }
    // save a reference to the original constructor
    var ctor = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        instance = instance || construct(target, args);
        return instance;
    };
    ctor.prototype = Object.create(target.prototype);
    return ctor;
}
exports.singleton = singleton;
//# sourceMappingURL=decorators.js.map