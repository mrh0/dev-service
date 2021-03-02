"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.err = exports.log = void 0;
function log(name) {
    var message = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        message[_i - 1] = arguments[_i];
    }
    console.log.apply(console, __spreadArray(["[", name, "]:"], message));
}
exports.log = log;
function err(name) {
    var message = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        message[_i - 1] = arguments[_i];
    }
    console.error.apply(console, __spreadArray(["[", name, "]:"], message));
}
exports.err = err;
exports.default = log;
//# sourceMappingURL=logging.js.map