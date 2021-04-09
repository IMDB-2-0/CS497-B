"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var cors_1 = __importDefault(require("cors"));
var celebrate_1 = require("celebrate");
var app = express_1.default();
var port = 5000;
var host = '0.0.0.0';
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(celebrate_1.errors());
// Allows routes to be used
app.use('/api/v1/database', routes_1.router);
// Listens on specified port and host
app.listen(port, host, function () {
    console.log("App running on http://" + host + ":" + port);
});
