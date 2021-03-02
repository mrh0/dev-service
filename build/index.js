"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("./src/api/routes");
var http_1 = require("http");
require("dotenv").config();
var server = http_1.createServer(routes_1.default);
server.listen(process.env.PORT || 5000, function () {
    console.log("Server listening on port " + (process.env.PORT || 5000));
});
//# sourceMappingURL=index.js.map