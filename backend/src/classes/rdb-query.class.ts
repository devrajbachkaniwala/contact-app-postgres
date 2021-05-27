import { QueryResult } from "pg";
import { pool } from "../Database/db";


type action = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
type multiType = string | number | boolean;


export class RDBQuery {
    private _action: action = 'SELECT';
    private _columns: string = '';
    private _tables: string = '';
    private _where: string = '';
    private _set: string = '';
    private _newValues: string = '';
    private _clause: string = '';
    private _orderBy: string = '';
    private _groupBy: string = '';
    private _having: string = '';
    private _join: string = '';

    /* get queryWhere() {
        return this._where;
    } */

    // execute the query
    async execute(){
        let fullQuery: string = '';
        if(this._action == 'INSERT') {
            fullQuery += this._action;
            fullQuery += this._clause;
            fullQuery += this._tables;
            fullQuery +=  this._columns;
            fullQuery += this._newValues + ';';
        } else {
            fullQuery += this._action;
            fullQuery += this._clause;
            fullQuery +=  this._columns;
            fullQuery += this._tables;
            fullQuery += this._set;
            fullQuery += this._join;
            fullQuery += this._where;
            fullQuery += this._groupBy;
            fullQuery += this._having;
            fullQuery += this._orderBy;
        }
        console.log(fullQuery);
        const result =  await pool.query(fullQuery)
        return result.rows;
    }

    // giving necessary condition
    where(param: string, condition: '=' | '>=' | '<=' | '>' | '<' | '!=' | '<>' | 'LIKE' | 'NOT LIKE' | 'ILIKE' | 'NOT ILIKE' | 'IS NULL' | 'IS NOT NULL' | 'BETWEEN' | 'NOT BETWEEN' | 'IN' | 'NOT IN', value: multiType | multiType[] = '', isOr: boolean = false) {
        if(this._where.length > 0) {
            this._where += isOr ? ' OR ' : ' AND ';
        }
        (this._where.length == 0) ? this._where += ' WHERE ' : this._where += '';

        if( condition == 'IS NULL' || condition == 'IS NOT NULL') {
           (condition == 'IS NULL') ? this._where += `${param} ${condition}` : this._where += `${param} ${condition}`;
        } else if(condition == 'BETWEEN' || condition == 'NOT BETWEEN' || condition == 'IN' || condition == 'NOT IN') {
            (condition == 'BETWEEN') ? this._where += `${param} ${condition} '${value[0]}' AND '${value[1]}'` : '';
            (condition == 'NOT BETWEEN') ? this._where += `${param} ${condition} '${value[0]}' AND '${value[1]}'` : '';
            if(condition == 'IN') {
                if(typeof value == 'object') {
                    let inQuery: string = "('" + value.join("','") + "')";
                    this._where += `${param} ${condition} ${inQuery}`;
                }
            }

            if(condition == 'NOT IN') {
                if(typeof value == 'object') {
                    let inQuery: string = "('" + value.join("','") + "')";
                    this._where += `${param} ${condition} ${inQuery}`;
                }
            }
        } else {
            this._where += `${param} ${condition} '${value}'`;
        }

        return this;
    }

    //which query we want to execute
    action(action: action) {
        this._action = action;
        if(this._action == 'DELETE' || this._action == 'INSERT') {
            (this._action == 'DELETE') ? this._clause += ' FROM ' : this._clause += ' INTO ';
        }
        return this;
    }

    //giving array of columns
    columns(params: string[]) {
        if(this._action == 'INSERT') {
            this._columns += '(' + params.join(', ') + ') VALUES';
        } else {
            this._columns += ' ' + params.join(', ') + ' FROM';
        }
        return this;
    }

    //giving array of tables
    tables(params: string[]) {
        if(this._action == 'INSERT') {
            this._tables += params.join(' ');
        } else {
            this._tables += ' ' + params.join(', ');
        }
        return this;
    }

    //updating and setting the new value to the column
    set(param: string, value: multiType) {
        (this._set.length == 0) ? this._set += ' SET ' : this._set += ', ';
        
        (typeof value == "string" ) ? this._set += `${param} = '${value}'` : this._set += `${param} = ${value}`; 

        return this;
    }

    //insert new values in the table
    newValues(params: multiType[]) {
        this._newValues += "('" + params.join("','") + "')";
        return this;
    }

    //performing asc and desc according to columns
    orderBy(params: string[], order: 'ASC' | 'DESC') {
        this._orderBy += ` ORDER BY ${params.join(', ')} ${order}`;
        return this;
    }

    //grouping columns
    groupBy(params: string[]) {
        this._groupBy += ` GROUP BY ${params.join(',')} `;
        return this;
    }

    //grouping column's condition
    having(param: string, condition: '=' | '<=' | '>=' | '<' | '>' | '!=' | '<>', value: multiType) {
        this._having += ` HAVING ${param} ${condition} '${value}' `;
        return this;
    }

    //joining tables
    join(condition: 'INNER JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'FULL JOIN', table2: string, on: string[]) {
        this._join += ` ${condition} ${table2} ON ${on[0]} = ${on[1]} `;
        return this;
    }
}