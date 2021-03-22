"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.push = void 0;
var ioredis_1 = require("ioredis");
var redis = new ioredis_1.default(6379);
function push(packet) {
    console.log(redis);
}
exports.push = push;
//# sourceMappingURL=recovery.js.map