"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    // TODO: Utilize env variables to hide connection and details
    connectionString: 'postgresql://postgres:postgres@postgresdb:5432/postgres'
});
