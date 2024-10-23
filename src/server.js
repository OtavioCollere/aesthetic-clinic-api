"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var env_1 = require("./env");
app_1.app.listen({
    host: '0.0.0.0',
    port: env_1.env.NODE_PORT
}).then(function () {
    console.log("HTTP server running !");
});
