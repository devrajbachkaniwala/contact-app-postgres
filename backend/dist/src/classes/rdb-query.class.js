"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RDBQuery = void 0;
const db_1 = require("../Database/db");
class RDBQuery {
    constructor() {
        this._action = 'SELECT';
        this._columns = '';
        this._tables = '';
        this._where = '';
        this._set = '';
        this._newValues = '';
        this._clause = '';
        this._orderBy = '';
        this._groupBy = '';
        this._having = '';
        this._join = '';
    }
    /* get queryWhere() {
        return this._where;
    } */
    // execute the query
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let fullQuery = '';
            if (this._action == 'INSERT') {
                fullQuery += this._action;
                fullQuery += this._clause;
                fullQuery += this._tables;
                fullQuery += this._columns;
                fullQuery += this._newValues + ';';
            }
            else {
                fullQuery += this._action;
                fullQuery += this._clause;
                fullQuery += this._columns;
                fullQuery += this._tables;
                fullQuery += this._set;
                fullQuery += this._join;
                fullQuery += this._where;
                fullQuery += this._groupBy;
                fullQuery += this._having;
                fullQuery += this._orderBy;
            }
            console.log(fullQuery);
            const result = yield db_1.pool.query(fullQuery);
            return result.rows;
        });
    }
    // giving necessary condition
    where(param, condition, value = '', isOr = false) {
        if (this._where.length > 0) {
            this._where += isOr ? ' OR ' : ' AND ';
        }
        (this._where.length == 0) ? this._where += ' WHERE ' : this._where += '';
        if (condition == 'IS NULL' || condition == 'IS NOT NULL') {
            (condition == 'IS NULL') ? this._where += `${param} ${condition}` : this._where += `${param} ${condition}`;
        }
        else if (condition == 'BETWEEN' || condition == 'NOT BETWEEN' || condition == 'IN' || condition == 'NOT IN') {
            (condition == 'BETWEEN') ? this._where += `${param} ${condition} '${value[0]}' AND '${value[1]}'` : '';
            (condition == 'NOT BETWEEN') ? this._where += `${param} ${condition} '${value[0]}' AND '${value[1]}'` : '';
            if (condition == 'IN') {
                if (typeof value == 'object') {
                    let inQuery = "('" + value.join("','") + "')";
                    this._where += `${param} ${condition} ${inQuery}`;
                }
            }
            if (condition == 'NOT IN') {
                if (typeof value == 'object') {
                    let inQuery = "('" + value.join("','") + "')";
                    this._where += `${param} ${condition} ${inQuery}`;
                }
            }
        }
        else {
            this._where += `${param} ${condition} '${value}'`;
        }
        return this;
    }
    //which query we want to execute
    action(action) {
        this._action = action;
        if (this._action == 'DELETE' || this._action == 'INSERT') {
            (this._action == 'DELETE') ? this._clause += ' FROM ' : this._clause += ' INTO ';
        }
        return this;
    }
    //giving array of columns
    columns(params) {
        if (this._action == 'INSERT') {
            this._columns += '(' + params.join(', ') + ') VALUES';
        }
        else {
            this._columns += ' ' + params.join(', ') + ' FROM';
        }
        return this;
    }
    //giving array of tables
    tables(params) {
        if (this._action == 'INSERT') {
            this._tables += params.join(' ');
        }
        else {
            this._tables += ' ' + params.join(', ');
        }
        return this;
    }
    //updating and setting the new value to the column
    set(param, value) {
        (this._set.length == 0) ? this._set += ' SET ' : this._set += ', ';
        (typeof value == "string") ? this._set += `${param} = '${value}'` : this._set += `${param} = ${value}`;
        return this;
    }
    //insert new values in the table
    newValues(params) {
        this._newValues += "('" + params.join("','") + "')";
        return this;
    }
    //performing asc and desc according to columns
    orderBy(params, order) {
        this._orderBy += ` ORDER BY ${params.join(', ')} ${order}`;
        return this;
    }
    //grouping columns
    groupBy(params) {
        this._groupBy += ` GROUP BY ${params.join(',')} `;
        return this;
    }
    //grouping column's condition
    having(param, condition, value) {
        this._having += ` HAVING ${param} ${condition} '${value}' `;
        return this;
    }
    //joining tables
    join(condition, table2, on) {
        this._join += ` ${condition} ${table2} ON ${on[0]} = ${on[1]} `;
        return this;
    }
}
exports.RDBQuery = RDBQuery;
//# sourceMappingURL=rdb-query.class.js.map