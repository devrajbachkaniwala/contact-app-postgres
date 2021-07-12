import { Pool, PoolConfig, QueryResult } from "pg";

type action = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
type multiType = string | number | boolean | null;

class RDBQuery {
    private __action: action = 'SELECT';
    private __columns: string = '';
    private __tables: string = '';
    private __where: string = '';
    private __set: string = '';
    private __newValues: string = '';
    private __clause: string = '';
    private __orderBy: string = '';
    private __groupBy: string = '';
    private __having: string = '';
    private __join: string = '';
    private __whereParams: multiType[] = [];
    private __config: PoolConfig;

    constructor(action: action, config?: PoolConfig) {
        this.__action = action;
        this.__config = config;
    }

    get query(): { query: string, params: multiType[] } {
        let fullQuery: string = '';
        if(this.__action == 'INSERT') {
            fullQuery += this.__action;
            fullQuery += this.__clause;
            fullQuery += this.__tables;
            fullQuery +=  this.__columns;
            fullQuery += this.__newValues + ';';
        } else {
            fullQuery += this.__action;
            fullQuery += this.__clause;
            fullQuery +=  this.__columns;
            fullQuery += this.__tables;
            fullQuery += this.__set;
            fullQuery += this.__join;
            fullQuery += this.__where;
            fullQuery += this.__groupBy;
            fullQuery += this.__having;
            fullQuery += this.__orderBy;
        }
        return { query: fullQuery, params: this.__whereParams };
    }

    // execute the query
    protected _execute(): Promise<QueryResult<any>> {
        const pool: Pool = new Pool(this.__config);
        return pool.query(this.query.query, this.query.params);
    }

    // giving necessary condition
    protected _where(param: string, condition: '=' | '>=' | '<=' | '>' | '<' | '!=' | '<>' | 'LIKE' | 'NOT LIKE' | 'ILIKE' | 'NOT ILIKE' | 'IS NULL' | 'IS NOT NULL' | 'BETWEEN' | 'NOT BETWEEN' | 'IN' | 'NOT IN', value: multiType | multiType[] = null, isOr: boolean = false) {
        if(this.__where.length > 0) {
            this.__where += isOr ? ' OR ' : ' AND ';
        }
        (this.__where.length == 0) ? this.__where += ' WHERE ' : this.__where += '';

        if(value == null) { 
            if(!(condition == 'IS NULL' || condition == 'IS NOT NULL')) {
                throw new Error('Value should not be empty');
            }   
        }

        if( condition == 'IS NULL' || condition == 'IS NOT NULL') {
           (condition == 'IS NULL') ? this.__where += `${param} ${condition}` : this.__where += `${param} ${condition}`;
        } else if(condition == 'BETWEEN' || condition == 'NOT BETWEEN' || condition == 'IN' || condition == 'NOT IN') {
            if(condition == 'BETWEEN' || condition == 'NOT BETWEEN') {
                if(typeof value == 'object') {
                    if(value.length == 2) {
                        this.__whereParams.push(value.shift());
                        this.__whereParams.push(value.shift());
                    } else if(value.length == 0) {
                        throw new Error('Value should contain two values');
                    } else if(value.length > 2) {
                        throw new Error('Value should contain only two values');
                    }
                }
                console.log(this.__whereParams);
                (condition == 'BETWEEN') ? this.__where += `${param} ${condition} $${this.__whereParams.length - 1} AND $${this.__whereParams.length}` : '';
                (condition == 'NOT BETWEEN') ? this.__where += `${param} ${condition} $${this.__whereParams.length - 1} AND $${this.__whereParams.length}` : '';
            }

            if(condition == 'IN' || condition == 'NOT IN') {
                if(typeof value == 'object') {
                    if(value.length == 0) {
                        throw new Error('Value should contain at least one value');
                    }
                    
                    while(value.length != 0) {
                        this.__whereParams.push(value.shift());
                    }
                } else {
                    value = [ value as multiType];
                    this.__whereParams.push(value.shift());
                }

                if(condition == 'IN') {
                    if(typeof value == 'object') {
                        let index = this.__whereParams.map( (val, i) => i += 1);
                        let inQuery: string = `( $${index.join(', $')} ) `;
                        this.__where += `${param} ${condition} ${inQuery}`;
                    }
                }
    
                if(condition == 'NOT IN') {
                    if(typeof value == 'object') {
                        let index = this.__whereParams.map( (val, i) => i += 1);
                        let inQuery: string = ` ( $${index.join(', $')} ) `;
                        this.__where += `${param} ${condition} ${inQuery}`;
                    }
                }
            }
        } else if(condition == '=' && typeof value == 'string' && value.includes('.')) {
            this.__where += `${param} ${condition} ${value}`;
        } else if(condition == '=' && typeof value == 'object' && value.length == 1 && value.map( item => (typeof item == 'string') ? (item.includes('.')) ? true : false : false) ) {
            this.__where += `${param} ${condition} ${value.map( item => item)}`;
        } else {
            if(typeof value == 'object') {
                if(value.length == 1) {
                    this.__whereParams.push(value.shift());
                } else if(value.length == 0) {
                    throw new Error('Value should contain one value');
                } else if(value.length > 1) {
                    throw new Error('Value should contain only one value');
                }
            } else {
                this.__whereParams.push(value);
            }
            this.__where += `${param} ${condition} $${this.__whereParams.length}`;
        }
        return this;
    }

    //which query we want to execute
    protected _action(action: action) {
        this.__action = action;
        if(this.__action == 'DELETE' || this.__action == 'INSERT') {
            (this.__action == 'DELETE') ? this.__clause += ' FROM ' : this.__clause += ' INTO ';
        }
        return this;
    }

    //giving array of columns
    protected _columns(params: string | string[]) {
        if(typeof params == 'string') {
            params = [ params ];
        }

        if(this.__action == 'INSERT') {
            this.__columns += '(' + params.join(', ') + ') ';
        } else {
            this.__columns += ' ' + params.join(', ') + ' FROM';
        }
        return this;
    }

    //giving array of tables
    protected _tables(params: string | string[]) {
        if(typeof params == 'string') {
            params = [ params ];
        }

        if(this.__action == 'INSERT') {
            this.__tables += params.join(' ');
        } else {
            this.__tables += ' ' + params.join(', ');
        }
        return this;
    }

    //updating and setting the new value to the column
    protected _set(param: string, value: multiType) {
        (this.__set.length == 0) ? this.__set += ' SET ' : this.__set += ', ';
        
        this.__whereParams.push(value);
        this.__set += `${param} = $${this.__whereParams.length}`; 

        return this;
    }

    //insert new values in the table
    protected _newValues(params: multiType[]) {
        while(params.length != 0) {
            this.__whereParams.push(params.shift());
        }
        let index = this.__whereParams.map( (val, i) => i += 1);
        this.__newValues += ` VALUES( $${index.join(', $')} )`;
        return this;
    }

    //performing asc and desc according to columns
    protected _orderBy(param: string, order: 'ASC' | 'DESC') {
        (this.__orderBy.length == 0) ? this.__orderBy += ' ORDER BY ' : this.__orderBy += ', ';

        this.__orderBy += `${param} ${order}`;
        return this;
    }

    //grouping columns
    protected _groupBy(params: string | string[]) {
        if(typeof params == 'string') {
            params = [ params ];
        }

        this.__groupBy += ` GROUP BY ${params.join(',')} `;
        return this;
    }

    //grouping column's condition
    protected _having(param: string, condition: '=' | '<=' | '>=' | '<' | '>' | '!=' | '<>', value: multiType) {
        this.__whereParams.push(value);
        this.__having += ` HAVING ${param} ${condition} $${this.__whereParams.length} `;
        return this;
    }

    //joining tables
    protected _join(condition: 'INNER JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'FULL JOIN', table2: string, on: string[]) {
         if(on.length == 0) {
             throw new Error('Join table ON should not be empty');
         } else if(on.length > 2) {
            throw new Error('Join table ON should contain only two values');
         }
        this.__join += ` ${condition} ${table2} ON (${on[0]} = ${on[1]}) `;
        return this;
    }

    protected _simpleQuery(sql: SQLQuery) {
        if(sql.action == 'SELECT') {
            this._action(sql.action);
            this._columns(sql.columns);
            this._tables(sql.tables);
    
            if(sql.join) {
                sql.join.forEach( item => {
                    this._join(item.condition, item.table2, item.on);
                });
            }
    
            if(sql.where) {
                sql.where.forEach( item => {
                    const isOr = (item.type == 'OR WHERE') ? true : false;
                    this._where(item.field, item.condition, item.value, isOr);
                });
            }
            
            if(sql.groupBy) {
                this._groupBy(sql.groupBy);
            }
    
            if(sql.having) {
                this._having(sql.having.param, sql.having.condition, sql.having.value);
            }
    
            if(sql.orderBy) {
                sql.orderBy.forEach( item => {
                    this._orderBy(item.param, item.order);    
                })
            }
        } else if(sql.action == 'INSERT') {
            this._action('INSERT');
            this._tables(sql.tables);
            
            if(sql.data) {
                let cols = [];
                let values = [];
    
                for(let key of Object.keys(sql.data)) {
                    cols.push(key);
                    values.push(sql.data[key]);
                }

                this._columns(cols);
                this._newValues(values);
            } else if(sql.newValues) {
                (sql.columns) ? this._columns(sql.columns) : '';
                this._newValues(sql.newValues);
            }
        } else if(sql.action == 'UPDATE') {
            this._action('UPDATE');
            this._tables(sql.tables);

            if(sql.data) {
                for(let key of Object.keys(sql.data)) {
                    this._set(key, sql.data[key]);
                }
            }

            if(sql.where) {
                sql.where.forEach( item => {
                    const isOr = (item.type == 'OR WHERE') ? true : false;
                    this._where(item.field, item.condition, item.value, isOr);
                })
            }
        } else if(sql.action == 'DELETE') {
            this._action('DELETE');
            this._tables(sql.tables);

            if(sql.where) {
                sql.where.forEach( item => {
                    const isOr = (item.type == 'OR WHERE') ? true : false;
                    this._where(item.field, item.condition, item.value, isOr);
                })
            }
        }
    }
}

export class ReadQuery extends RDBQuery {
    constructor(action: action = 'SELECT', config?: PoolConfig) {
        super(action, config);
    }

    static instance(): ReadQuery {
        return new ReadQuery();
    }

    
    columns(params: string | string[]): ReadQuery {
        this._columns(params);
        return this;
    }

    tables(params: string | string[]): ReadQuery {
        this._tables(params);
        return this;
    }

    join(condition: 'INNER JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'FULL JOIN', table2: string, on: string[]): ReadQuery {
        this._join(condition, table2, on);
        return this;
    }

    where(param: string, condition: '=' | '>=' | '<=' | '>' | '<' | '!=' | '<>' | 'LIKE' | 'NOT LIKE' | 'ILIKE' | 'NOT ILIKE' | 'IS NULL' | 'IS NOT NULL' | 'BETWEEN' | 'NOT BETWEEN' | 'IN' | 'NOT IN', value?: multiType | multiType[], isOr?: boolean): ReadQuery {
        this._where(param, condition, value, isOr);
        return this;
    }

    groupBy(params: string | string[]): ReadQuery {
        this._groupBy(params);
        return this;
    }

    having(param: string, condition: '=' | '<=' | '>=' | '<' | '>' | '!=' | '<>', value: multiType): ReadQuery {
        this._having(param, condition, value);
        return this;
    }
    
    orderBy(param: string, order: 'ASC' | 'DESC'): ReadQuery {
        this._orderBy(param, order);
        return this;
    }

    get(): Promise<QueryResult<any>> {
        return this._execute();
    }

}

export class WriteQuery extends RDBQuery {
    constructor(action: action = 'INSERT', config?: PoolConfig) {
        super(action, config);
    }

    static get instance(): WriteQuery {
        return new WriteQuery();
    }

    table(param: string): WriteQuery {
        this._tables(param);
        return this;
    }

    insert(data: Object): WriteQuery {
        let cols = [];
        let values = [];
        for(let key of Object.keys(data)) {
            cols.push(key);
            values.push(data[key]);
        }
        this._action('INSERT');
        this._columns(cols);
        this._newValues(values);
        return this;
    }

    execute(): Promise<QueryResult<any>> {
        return this._execute();
    }
}

export class UpdateQuery extends RDBQuery {
    constructor(action: action = 'UPDATE', config?: PoolConfig) {
        super(action, config);
    }

    static get instance(): UpdateQuery {
        return new UpdateQuery();
    }

    table(param: string): UpdateQuery {
        this._tables(param);
        return this;
    }

    update(data: Object): UpdateQuery {
        this._action('UPDATE');
        for(let key of Object.keys(data)) {
            this._set(key,data[key]);
        }
        return this;
    }

    where(param: string, condition: '=' | '>=' | '<=' | '>' | '<' | '!=' | '<>' | 'LIKE' | 'NOT LIKE' | 'ILIKE' | 'NOT ILIKE' | 'IS NULL' | 'IS NOT NULL' | 'BETWEEN' | 'NOT BETWEEN' | 'IN' | 'NOT IN', value?: multiType | multiType[], isOr?: boolean): UpdateQuery {
        this._where(param, condition, value, isOr);
        return this;
    }

    execute(): Promise<QueryResult<any>> {
        return this._execute();
    }
}

export class DeleteQuery extends RDBQuery {
    constructor(action: action = 'DELETE', config?: PoolConfig) {
        super(action, config);
    }

    static get instance(): DeleteQuery {
        return new DeleteQuery();
    }

    table(param: string): DeleteQuery {
        this._action('DELETE');
        this._tables(param);
        return this;
    }

    where(param: string, condition: '=' | '>=' | '<=' | '>' | '<' | '!=' | '<>' | 'LIKE' | 'NOT LIKE' | 'ILIKE' | 'NOT ILIKE' | 'IS NULL' | 'IS NOT NULL' | 'BETWEEN' | 'NOT BETWEEN' | 'IN' | 'NOT IN', value?: multiType | multiType[], isOr?: boolean): DeleteQuery {
        this._where(param, condition, value, isOr);
        return this;
    }

    delete(): Promise<QueryResult<any>> {
        return this._execute();
    }
}

export class SimpleQuery extends RDBQuery {
    constructor(action: action = 'SELECT', config?: PoolConfig) {
        super(action, config);
    }

    simpleQuery(sql: SQLQuery): SimpleQuery {
        this._simpleQuery(sql);
        return this;
    }

    execute(): Promise<QueryResult<any>> {
        return this._execute();
    }
}

export class EasySQL {
    private __config: PoolConfig;

    constructor(config?: PoolConfig) {
        this.__config = config;
    }

    static init(config: PoolConfig): EasySQL {
        return new EasySQL(config);
    }

    get read(): ReadQuery {
        return new ReadQuery('SELECT', this.__config);
    }
    
    get write(): WriteQuery {
        return new WriteQuery('INSERT', this.__config);
    }

    get update(): UpdateQuery {
        return new UpdateQuery('UPDATE', this.__config);
    }
    
    get delete(): DeleteQuery {
        return new DeleteQuery('DELETE', this.__config);
    }

    get simpleQuery(): SimpleQuery {
        return new SimpleQuery('SELECT', this.__config);
    }
}

export interface SQLQuery {
    action: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
    columns?: string | Array<string>;
    tables: string | Array<string>;
    join?: Array<SQLQueryJoin>;
    where?: Array<SQLQueryWhere>;
    groupBy?: string | Array<string>;
    having?: SQLQueryHaving;
    orderBy?: Array<SQLQueryOrderBy>;
    data?: Object;
    newValues?: multiType[];
}

export interface SQLQueryJoin {
    condition: 'INNER JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'FULL JOIN';
    table2: string;
    on: Array<string>;
}

export interface SQLQueryWhere {
    type: 'WHERE' | 'OR WHERE' | 'AND WHERE';
    field?: string;
    condition?: '=' | '>=' | '<=' | '>' | '<' | '!=' | '<>' | 'LIKE' | 'NOT LIKE' | 'ILIKE' | 'NOT ILIKE' | 'IS NULL' | 'IS NOT NULL' | 'BETWEEN' | 'NOT BETWEEN' | 'IN' | 'NOT IN';
    value?: multiType | Array<multiType>;
    nested?: Array<SQLQueryWhere>;
}

export interface SQLQueryHaving {
    param: string;
    condition: '=' | '<=' | '>=' | '<' | '>' | '!=' | '<>';
    value: multiType;
}

export interface SQLQueryOrderBy {
    param: string;
    order: 'ASC' | 'DESC';
}