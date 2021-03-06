"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.db = void 0;
const rdb_query_class_1 = require("../classes/rdb-query.class");
const dotenv_1 = require("dotenv");
const pg_1 = require("pg");
dotenv_1.config();
exports.db = rdb_query_class_1.EasySQL.init({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_ACCESS_TOKEN,
    port: process.env.DB_PORT
});
exports.pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_ACCESS_TOKEN,
    port: process.env.DB_PORT
});
//# sourceMappingURL=db.js.map