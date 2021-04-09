"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
exports.pool = new pg_1.Pool({
    connectionString: 'postgresql://postgres:postgres@postgresdb:5432/postgres'
});
// `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@
//                       ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
