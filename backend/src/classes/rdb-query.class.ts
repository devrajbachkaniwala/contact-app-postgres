import { Pool, PoolConfig, QueryResult } from 'pg';

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
    private static __whereParamsLength: number = 0;
    private __subqueryList: Array<{ query: string, queryWhen: { inColumn?: boolean, afterFrom?: boolean, afterWhere?: boolean } }> = [];
    //private __isSubquery: boolean = true;

    constructor(action: action, config?: PoolConfig) {
        this.__action = action;
        this.__config = config;
    }

    get query(): { query: string, params: multiType[] } {
        let fullQuery: string = '';
        /* if (this.__action == 'INSERT') {
            fullQuery += this.__action;
            fullQuery += this.__clause;
            fullQuery += this.__tables;
            fullQuery += this.__columns;

            for (let i = 0; i < this.__subqueryList.length; i++) {
                const subquery = this.__subqueryList[i];
                if (subquery.queryWhen.afterFrom) {
                    // (this.__columns == '') ? '' : fullQuery += ' , ';
                    fullQuery += ` ${subquery.query} `
                }
            }

            fullQuery += (this.__subqueryList.length) ? '' : this.__newValues + ';';
        } else if (this.__action == 'UPDATE') {
            fullQuery += this.__action;
            fullQuery += this.__tables;
            //fullQuery += (this.__subqueryList.length) ? '' : '';
            fullQuery += (this.__subqueryList.length) ? '' : this.__set;

            for (let i = 0; i < this.__subqueryList.length; i++) {
                const subquery = this.__subqueryList[i];
                if (subquery.queryWhen.afterFrom) {
                    const columnList = this.__columns.split(' ');
                    columnList.unshift(' ( ');
                    columnList.push(' ) = ');
                    const columnQuery = columnList.join(' ');
                    fullQuery += columnQuery;
                    // (this.__columns == '') ? '' : fullQuery += ' , ';
                    fullQuery += ` ${subquery.query} `
                }
            }

            fullQuery += this.__where;
        } else {
            fullQuery += this.__action;
            fullQuery += this.__clause;
            fullQuery += this.__columns;

            for (let i = 0; i < this.__subqueryList.length; i++) {
                const subquery = this.__subqueryList[i];
                if (subquery.queryWhen.inColumn) {
                    (this.__columns == '') ? '' : fullQuery += ' , ';
                    fullQuery += ` ${subquery.query} `
                }
            }

            fullQuery += (this.__action == 'SELECT') ? ' FROM ' : '';

            for (let i = 0; i < this.__subqueryList.length; i++) {
                const subquery = this.__subqueryList[i];
                if (subquery.queryWhen.afterFrom) {
                    fullQuery += ` ${subquery.query} `
                }
            }

            fullQuery += this.__tables;
            fullQuery += this.__set;
            fullQuery += this.__join;
            fullQuery += this.__where;

            for (let i = 0; i < this.__subqueryList.length; i++) {
                const subquery = this.__subqueryList[i];
                if (subquery.queryWhen.afterWhere) {
                    fullQuery += ` ${subquery.query} `
                }
            }

            fullQuery += this.__groupBy;
            fullQuery += this.__having;
            fullQuery += this.__orderBy;
        } */

        //this.__isSubquery = false;
        switch (this.__action) {
            case 'INSERT':
                fullQuery += this.__action;
                //fullQuery += this.__clause;
                fullQuery += ` INTO ${this.__tables}`;
                fullQuery += ` (${this.__columns})`;

                for (let i = 0; i < this.__subqueryList.length; i++) {
                    const subquery = this.__subqueryList[i];
                    if (subquery.queryWhen.afterFrom) {
                        // (this.__columns == '') ? '' : fullQuery += ' , ';
                        fullQuery += ` ${subquery.query} `
                    }
                }

                fullQuery += (this.__subqueryList.length) ? '' : this.__newValues;

                return { query: fullQuery, params: this.__whereParams };

            case 'UPDATE':
                fullQuery += this.__action;
                fullQuery += ` ${this.__tables} SET `;
                //fullQuery += (this.__subqueryList.length) ? '' : '';
                fullQuery += (this.__subqueryList.length) ? '' : this.__set;

                for (let i = 0; i < this.__subqueryList.length; i++) {
                    const subquery = this.__subqueryList[i];
                    if (subquery.queryWhen.afterFrom) {
                        const columnList = this.__columns.split(' ');
                        columnList.unshift(' ( ');
                        columnList.push(' ) = ');
                        const columnQuery = columnList.join(' ');
                        fullQuery += columnQuery;
                        // (this.__columns == '') ? '' : fullQuery += ' , ';
                        fullQuery += ` ${subquery.query} `
                    }
                }

                fullQuery += this.__where;

                return { query: fullQuery, params: this.__whereParams };

            case 'SELECT':
                fullQuery += this.__action;
                //fullQuery += this.__clause;
                fullQuery += this.__columns;

                for (let i = 0; i < this.__subqueryList.length; i++) {
                    const subquery = this.__subqueryList[i];
                    if (subquery.queryWhen.inColumn) {
                        (this.__columns == '') ? '' : fullQuery += ' , ';
                        fullQuery += ` ${subquery.query} `
                    }
                }

                fullQuery += ' FROM ';

                for (let i = 0; i < this.__subqueryList.length; i++) {
                    const subquery = this.__subqueryList[i];
                    if (subquery.queryWhen.afterFrom) {
                        fullQuery += ` ${subquery.query} `
                    }
                }

                fullQuery += this.__tables;
                //fullQuery += this.__set;
                fullQuery += this.__join;
                fullQuery += this.__where;

                for (let i = 0; i < this.__subqueryList.length; i++) {
                    const subquery = this.__subqueryList[i];
                    if (subquery.queryWhen.afterWhere) {
                        fullQuery += ` ${subquery.query} `
                    }
                }

                fullQuery += this.__groupBy;
                fullQuery += this.__having;
                fullQuery += this.__orderBy;

                /* fullQuery = ` ${this.__action} ${this.__columns} FROM ${this.__tables} ${this.__join} ${this.__where} 
                              ${this.__groupBy} ${this.__having} ${this.__orderBy} `; */

                return { query: fullQuery, params: this.__whereParams };

            case 'DELETE':
                fullQuery += this.__action;
                //fullQuery += this.__clause;
                fullQuery += ` FROM ${this.__columns}`;

                for (let i = 0; i < this.__subqueryList.length; i++) {
                    const subquery = this.__subqueryList[i];
                    if (subquery.queryWhen.inColumn) {
                        (this.__columns == '') ? '' : fullQuery += ' , ';
                        fullQuery += ` ${subquery.query} `
                    }
                }

                //fullQuery += (this.__action == 'SELECT') ? ' FROM ' : '';

                for (let i = 0; i < this.__subqueryList.length; i++) {
                    const subquery = this.__subqueryList[i];
                    if (subquery.queryWhen.afterFrom) {
                        fullQuery += ` ${subquery.query} `
                    }
                }

                fullQuery += this.__tables;
                fullQuery += this.__set;
                fullQuery += this.__join;
                fullQuery += this.__where;

                for (let i = 0; i < this.__subqueryList.length; i++) {
                    const subquery = this.__subqueryList[i];
                    if (subquery.queryWhen.afterWhere) {
                        fullQuery += ` ${subquery.query} `
                    }
                }

                fullQuery += this.__groupBy;
                fullQuery += this.__having;
                fullQuery += this.__orderBy;

                return { query: fullQuery, params: this.__whereParams };
        }
    }

    // execute the query
    protected _execute(): Promise<QueryResult<any>> {
        RDBQuery.__whereParamsLength = 0;

        const pool: Pool = new Pool(this.__config);
        return pool.query(this.query.query, this.query.params);
    }

    // giving necessary condition
    protected _where(param: string, condition: '=' | '>=' | '<=' | '>' | '<' | '!=' | '<>' | 'LIKE' | 'NOT LIKE' | 'ILIKE' | 'NOT ILIKE' | 'IS NULL' | 'IS NOT NULL' | 'BETWEEN' | 'NOT BETWEEN' | 'IN' | 'NOT IN', value: multiType | multiType[] = null, isOr: boolean = false, isSubquery: boolean = false) {
        /* if (this.__where.length > 0) {
            this.__where += isOr ? ' OR ' : ' AND ';
        }
        (this.__where.length == 0) ? this.__where += ' WHERE ' : '' ; */
        /* this.__where = ` WHERE ${param} ${condition} ${value} `;
        return this; */

        switch (this.__where.length) {
            case 0:
                this.__where += ' WHERE ';
                break;
            default:
                switch (isOr) {
                    case true:
                        this.__where += ' OR ';
                        break;
                    case false:
                        this.__where += ' AND ';
                        break;
                }
                break;
        }

        switch (isSubquery) {
            case true:
                this.__where += `${param} ${condition}`;
                return this;
        }

        switch (value) {
            case null:
                switch (condition) {
                    case 'IS NULL':
                    case 'IS NOT NULL':
                        this.__where += `${param} ${condition}`;
                        return this;

                    default:
                        throw new Error('Value should not be empty');
                }
                break;

            default:
                switch (Array.isArray(value)) {
                    case true:
                        switch (typeof value) {
                            case 'object':
                                switch (value.length) {
                                    case 0:
                                        switch (condition) {
                                            case 'IS NULL':
                                            case 'IS NOT NULL':
                                                break;

                                            default:
                                                throw new Error('Value of array should not be empty');
                                        }
                                        break;

                                    default:
                                        switch (condition) {
                                            case 'IS NULL':
                                            case 'IS NOT NULL':
                                                break;

                                            default:
                                                this.__whereParams = [...this.__whereParams, ...value];
                                                RDBQuery.__whereParamsLength += value.length;
                                                break;
                                        }
                                        break;
                                }
                                break;
                        }
                        break;

                    case false:
                        switch (condition) {
                            case 'BETWEEN':
                            case 'NOT BETWEEN':
                                throw new Error('Value should contain an array of two values');

                            case 'IS NULL':
                            case 'IS NOT NULL':
                                break;

                            default:
                                this.__whereParams.push(value as multiType);
                                RDBQuery.__whereParamsLength += 1;
                                break;
                        }
                        break;
                }
                break;
        }

        /* if (value == null) {
            if (!(condition == 'IS NULL' || condition == 'IS NOT NULL')) {
                throw new Error('Value should not be empty');
            }
        }   */

        switch (condition) {
            case 'IS NULL':
            case 'IS NOT NULL':
                this.__where += `${param} ${condition}`;
                return this;

            case 'BETWEEN':
            case 'NOT BETWEEN':
                switch (typeof value) {
                    case 'object':
                        switch (value.length) {
                            case 2:
                                this.__where += `${param} ${condition} $${RDBQuery.__whereParamsLength - 1} AND $${RDBQuery.__whereParamsLength}`;
                                return this;
                            default:
                                throw new Error('Value should contain an array of two elements');
                        }
                        break;
                }
                break;

            case 'IN':
            case 'NOT IN':
                switch (Array.isArray(value)) {
                    case true:
                        switch (typeof value) {
                            case 'object':
                                //switch(value.length) {
                                /* case 0:
                                    throw new Error('Value should contain an array of atleast one element'); */
                                //default:
                                let currentLength = RDBQuery.__whereParamsLength - value.length;
                                this.__where += ` ${param} ${condition} ($${(value.map((item) => ++currentLength)).join(', $')}) `;
                                return this;
                            //}
                            //break;
                        }
                        break;

                    case false:
                        this.__where += ` ${param} ${condition} ($${RDBQuery.__whereParamsLength}) `;
                        return this;
                }
                break;

            case '=':
                switch (typeof value) {
                    case 'object':
                        switch (value.length) {
                            /* case 0:
                                throw new Error('Value should contain an array of one element'); */

                            case 1:
                                value.map(item => {
                                    switch (typeof item) {
                                        case 'string':
                                            switch (item.includes('.')) {
                                                case true:
                                                    this.__where += `${param} ${condition} ${item}`;
                                                    this.__whereParams.pop();
                                                    RDBQuery.__whereParamsLength--;
                                                    return this;

                                                case false:
                                                    this.__where += `${param} ${condition} $${RDBQuery.__whereParamsLength}`;
                                                    return this;

                                            }
                                            break;

                                        default:
                                            this.__where += `${param} ${condition} $${RDBQuery.__whereParamsLength}`;
                                            return this;
                                    }
                                });
                                break;

                            default:
                                throw new Error('Value should contain an array of one element');
                        }
                        break;

                    case 'string':
                        switch (value.includes('.')) {
                            case true:
                                this.__where += `${param} ${condition} ${value}`;
                                this.__whereParams.pop();
                                RDBQuery.__whereParamsLength--;
                                return this;

                            case false:
                                this.__where += `${param} ${condition} $${RDBQuery.__whereParamsLength}`;
                                return this;
                        }
                        break;

                    default:
                        this.__where += `${param} ${condition} $${RDBQuery.__whereParamsLength}`;
                        return this;
                }
                break;

            default:
                switch (typeof value) {
                    case 'object':
                        switch (value.length) {
                            case 1:
                                this.__where += `${param} ${condition} $${RDBQuery.__whereParamsLength}`;
                                return this;

                            default:
                                throw new Error('Value should contain an array of one element');
                        }
                        break;

                    default:
                        this.__where += `${param} ${condition} $${RDBQuery.__whereParamsLength}`;
                        return this;
                }
                break;
        }

        /*if (condition == 'IS NULL' || condition == 'IS NOT NULL') {
            (condition == 'IS NULL') ? this.__where += `${param} ${condition}` : this.__where += `${param} ${condition}`;
        } else if (condition == 'BETWEEN' || condition == 'NOT BETWEEN' || condition == 'IN' || condition == 'NOT IN') {
             if (condition == 'BETWEEN' || condition == 'NOT BETWEEN') {
                if (typeof value == 'object') {
                    if (value.length == 2) {
                        this.__whereParams.push(value.shift());
                        this.__whereParams.push(value.shift());
                        (this.__isSubquery) ? RDBQuery.__whereParamsLength += 2 : '';
                    } else if (value.length == 0) {
                        throw new Error('Value should contain two values');
                    } else if (value.length > 2) {
                        throw new Error('Value should contain only two values');
                    }
                }
                console.log(this.__whereParams);
                (condition == 'BETWEEN') ? this.__where += `${param} ${condition} $${(this.__isSubquery) ? RDBQuery.__whereParamsLength - 1 : this.__whereParams.length - 1} AND $${(this.__isSubquery) ? RDBQuery.__whereParamsLength : this.__whereParams.length}` : '';
                (condition == 'NOT BETWEEN') ? this.__where += `${param} ${condition} $${(this.__isSubquery) ? RDBQuery.__whereParamsLength - 1 : this.__whereParams.length - 1} AND $${(this.__isSubquery) ? RDBQuery.__whereParamsLength : this.__whereParams.length}` : '';
            } 

            if (condition == 'IN' || condition == 'NOT IN') {
                if (typeof value == 'object') {
                    if (value.length == 0) {
                        throw new Error('Value should contain at least one value');
                    }

                    for (let i = 0; i < value.length; i++) {
                        this.__whereParams.push(value[i]);
                        (this.__isSubquery) ? RDBQuery.__whereParamsLength += 1 : '';
                    }
                } else {
                    value = [value as multiType];
                    this.__whereParams.push(value[0]);
                    (this.__isSubquery) ? RDBQuery.__whereParamsLength += 1 : '';
                }

                if (condition == 'IN') {
                    if (typeof value == 'object') {
                        if (this.__isSubquery) {
                            let valueLength = value.length;
                            let totalLength = RDBQuery.__whereParamsLength;
                            let index = [];
                            let currentIndex = totalLength - valueLength;
                            for (let i = 0; i < valueLength; i++) {
                                index.push(++currentIndex);
                            }

                            //let index = this.__whereParams.map( (val, i) => i += 1);
                            let inQuery: string = `( $${index.join(', $')} ) `;
                            this.__where += `${param} ${condition} ${inQuery}`;
                        } else {
                            let index = this.__whereParams.map((val, i) => i += 1);
                            let inQuery: string = `( $${index.join(', $')} ) `;
                            this.__where += `${param} ${condition} ${inQuery}`;
                        }
                    }
                }

                if (condition == 'NOT IN') {
                    if (typeof value == 'object') {
                        if (this.__isSubquery) {
                            let valueLength = value.length;
                            let totalLength = RDBQuery.__whereParamsLength;
                            let index = [];
                            let currentIndex = totalLength - valueLength;
                            for (let i = 0; i < valueLength; i++) {
                                index.push(++currentIndex);
                            }

                            let inQuery: string = ` ( $${index.join(', $')} ) `;
                            this.__where += `${param} ${condition} ${inQuery}`;
                        } else {
                            let index = this.__whereParams.map((val, i) => i += 1);
                            let inQuery: string = ` ( $${index.join(', $')} ) `;
                            this.__where += `${param} ${condition} ${inQuery}`;
                        }
                    }
                }
            }
        } else if (condition == '=' && typeof value == 'string' && value.includes('.')) {
            this.__where += `${param} ${condition} ${value}`;
        } else if (condition == '=' && typeof value == 'object' && value.length == 1 && value.map(item => (typeof item == 'string') ? (item.includes('.')) ? true : false : false)) {
            this.__where += `${param} ${condition} ${value.map(item => item)}`;
        } else {
            if (typeof value == 'object') {
                if (value.length == 1) {
                    this.__whereParams.push(value.shift());
                    (this.__isSubquery) ? RDBQuery.__whereParamsLength += 1 : '';
                } else if (value.length == 0) {
                    throw new Error('Value should contain one value');
                } else if (value.length > 1) {
                    throw new Error('Value should contain only one value');
                }
            } else {
                // this.__whereParams.push(value);
                //(this.__isSubquery) ? RDBQuery.__whereParamsLength += 1 : ''; 
            } 

            this.__where += `${param} ${condition} $${(this.__isSubquery) ? RDBQuery.__whereParamsLength : this.__whereParams.length}`;
        }
        return this; */
    }


    //which query we want to execute
    protected _action(action: action) {
        this.__action = action;
        /* if (this.__action == 'DELETE' || this.__action == 'INSERT') {
            (this.__action == 'DELETE') ? this.__clause += ' FROM ' : this.__clause += ' INTO ';
        } 
        return this; */
        /* switch (this.__action) {
            case 'DELETE':
                this.__clause += ' FROM ';
                break;

            case 'INSERT':
                this.__clause += ' INTO ';
                break;
        } */

        return this;
    }

    //giving array of columns
    protected _columns(params: string | string[]) {
        /* if (typeof params == 'string') {
            params = [params];
        }

        if (this.__action == 'INSERT') {
            this.__columns += '(' + params.join(', ') + ') ';
        } else {
            this.__columns += ' ' + params.join(', ') + ' ';
        }
        return this; */
        switch (typeof params) {
            case 'string':
                this.__columns = ` ${params} `;
                return this;

            case 'object':
                switch (Array.isArray(params)) {
                    case true:
                        this.__columns = ` ${params.join(', ')} `;
                        return this;
                }
                break;
        }

        /* switch (this.__action) {
            case 'INSERT':
                this.__columns += '(' + params.join(', ') + ') ';
                break;

            default:
                this.__columns += ' ' + params.join(', ') + ' ';
                break;
        } */
    }

    //giving array of tables
    protected _tables(params: string | string[]) {
        /* if (typeof params == 'string') {
            params = [params];
        } 

        if (this.__action == 'INSERT') {
            this.__tables += params.join(' ');
        } else if(this.__action == 'UPDATE') {
            this.__tables += ' ' + params.join(' ') + ' SET ';
        } else {
            this.__tables += ' ' + params.join(', ');
        }
        return this;
        */
        switch (typeof params) {
            case 'string':
                this.__tables = ` ${params} `;
                return this;

            case 'object':
                switch(Array.isArray(params)) {
                    case true:
                        switch (params.length) {
                            case 1:
                                this.__tables = ` ${params.join(' ')} `;
                                return this;
        
                            default:
                                switch (this.__action) {
                                    case 'INSERT':
                                    case 'UPDATE':
                                    case 'DELETE':
                                        throw new Error('Table should contain one param');

                                    default:
                                        this.__tables = ` ${params.join(', ')} `;
                                        return this;
                                }
                                break;
                        }
                        break;
                }
                break;
        }

        

        /* switch (this.__action) {
            case 'INSERT':
                this.__tables += params.join(' ');
                return this;

            case 'UPDATE':
                this.__tables += ' ' + params.join(' ') + ' SET ';
                return this;

            default:
                this.__tables += ' ' + params.join(', ');
                return this;
        } */
    }

    //updating and setting the new value to the column
    protected _set(param: string, value: multiType) {
        /* (this.__set.length == 0) ? '' : this.__set += ', ';

        this.__whereParams.push(value);
        (this.__isSubquery) ? RDBQuery.__whereParamsLength += 1 : '';
        this.__set += ` ${param} = $${(this.__isSubquery) ? RDBQuery.__whereParamsLength : this.__whereParams.length}`;

        return this; */
        switch (this.__set.length) {
            case 0:
                break;

            default:
                this.__set += ', ';
                break;
        }

        this.__whereParams.push(value);
        RDBQuery.__whereParamsLength += 1;
        this.__set += ` ${param} = $${RDBQuery.__whereParamsLength}`;
        return this;
    }

    //insert new values in the table
    protected _newValues(params: multiType[]) {
        /* while (params.length != 0) {
            this.__whereParams.push(params.shift());
            (this.__isSubquery) ? RDBQuery.__whereParamsLength += 1 : '';
        }
        let index = this.__whereParams.map((val, i) => i += 1);
        this.__newValues += ` VALUES( $${index.join(', $')} )`;
        return this; */
        while (params.length != 0) {
            this.__whereParams.push(params.shift());
            RDBQuery.__whereParamsLength += 1;
        }
        let index = this.__whereParams.map((val, i) => i += 1);
        this.__newValues += ` VALUES( $${index.join(', $')} )`;
        return this;
    }

    //performing asc and desc according to columns
    protected _orderBy(param: string, order: 'ASC' | 'DESC') {
        //(this.__orderBy.length == 0) ? this.__orderBy += ' ORDER BY ' : this.__orderBy += ', ';
        switch (this.__orderBy.length) {
            case 0:
                this.__orderBy += ' ORDER BY ';
                break;

            default:
                this.__orderBy += ', ';
                break;
        }

        this.__orderBy += `${param} ${order}`;
        return this;
    }

    //grouping columns
    protected _groupBy(params: string | string[]) {
        /* if (typeof params == 'string') {
            params = [params];
        } */

        switch (typeof params) {
            case 'string':
                this.__groupBy += ` GROUP BY ${params} `;
                return this;

            case 'object':
                switch(Array.isArray(params)) {
                    case true:
                        this.__groupBy += ` GROUP BY ${params.join(', ')} `;
                        return this;
                }
        }

        /* this.__groupBy += ` GROUP BY ${params.join(',')} `;
        return this; */
    }

    //grouping column's condition
    protected _having(param: string, condition: '=' | '<=' | '>=' | '<' | '>' | '!=' | '<>', value: multiType) {
        this.__whereParams.push(value);
        RDBQuery.__whereParamsLength += 1;
        this.__having += ` HAVING ${param} ${condition} $${RDBQuery.__whereParamsLength} `;
        return this;
    }

    //joining tables
    protected _join(condition: 'INNER JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'FULL JOIN', table2: string, on: string[]) {
        /* if (on.length == 0) {
            throw new Error('Join table ON should not be empty');
        } else if (on.length > 2) {
            throw new Error('Join table ON should contain only two values');
        }
        this.__join += ` ${condition} ${table2} ON (${on[0]} = ${on[1]}) `;
        return this; */

        switch (on.length) {
            case 2:
                this.__join += ` ${condition} ${table2} ON (${on[0]} = ${on[1]}) `;
                return this;

            default:
                throw new Error('Join table ON should contain an array of two elements');
        }
    }


    protected _subquery(query: string, queryParams: multiType[], subqueryWhen: { inColumn?: boolean, afterFrom?: boolean, afterWhere?: boolean }, aliasName?: string) {
        let queryArray = query.split(' ');
        queryArray.unshift('( ');
        queryArray.push(' ) ');
        queryArray.push(aliasName);
        let queryString = queryArray.join(' ');

        //this.__isSubquery = true;

        this.__whereParams = [...this.__whereParams, ...queryParams];

        this.__subqueryList.push({ query: queryString, queryWhen: subqueryWhen });

        return this;
    }

    protected _simpleQuery(sql: SQLQuery) {
        if (sql.action == 'SELECT') {
            this._action(sql.action);
            this._columns(sql.columns);
            this._tables(sql.tables);

            if (sql.join) {
                sql.join.forEach(item => {
                    this._join(item.condition, item.table2, item.on);
                });
            }

            if (sql.where) {
                sql.where.forEach(item => {
                    const isOr = (item.type == 'OR WHERE') ? true : false;
                    this._where(item.field, item.condition, item.value, isOr);
                });
            }

            if (sql.groupBy) {
                this._groupBy(sql.groupBy);
            }

            if (sql.having) {
                this._having(sql.having.param, sql.having.condition, sql.having.value);
            }

            if (sql.orderBy) {
                sql.orderBy.forEach(item => {
                    this._orderBy(item.param, item.order);
                })
            }
        } else if (sql.action == 'INSERT') {
            this._action('INSERT');
            this._tables(sql.tables);

            if (sql.data) {
                let cols = [];
                let values = [];

                for (let key of Object.keys(sql.data)) {
                    cols.push(key);
                    values.push(sql.data[key]);
                }

                this._columns(cols);
                this._newValues(values);
            } else if (sql.newValues) {
                (sql.columns) ? this._columns(sql.columns) : '';
                this._newValues(sql.newValues);
            }
        } else if (sql.action == 'UPDATE') {
            this._action('UPDATE');
            this._tables(sql.tables);

            if (sql.data) {
                for (let key of Object.keys(sql.data)) {
                    this._set(key, sql.data[key]);
                }
            }

            if (sql.where) {
                sql.where.forEach(item => {
                    const isOr = (item.type == 'OR WHERE') ? true : false;
                    this._where(item.field, item.condition, item.value, isOr);
                })
            }
        } else if (sql.action == 'DELETE') {
            this._action('DELETE');
            this._tables(sql.tables);

            if (sql.where) {
                sql.where.forEach(item => {
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

    where(param: string, condition: '=' | '>=' | '<=' | '>' | '<' | '!=' | '<>' | 'LIKE' | 'NOT LIKE' | 'ILIKE' | 'NOT ILIKE' | 'IS NULL' | 'IS NOT NULL' | 'BETWEEN' | 'NOT BETWEEN' | 'IN' | 'NOT IN', value?: multiType | multiType[], isOr?: boolean, isSubquery?: boolean): ReadQuery {
        this._where(param, condition, value, isOr, isSubquery);
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

    subquery(query: string, queryParams: multiType[], subqueryWhen: { inColumn?: boolean, afterFrom?: boolean, afterWhere?: boolean }, aliasName?: string): ReadQuery {
        this._subquery(query, queryParams, subqueryWhen, aliasName);
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
        this._action('INSERT');
        return this;
    }

    columns(params: string | string[]): WriteQuery {
        this._columns(params);
        return this;
    }

    insert(data: Object): WriteQuery {
        let cols = [];
        let values = [];

        for (let key of Object.keys(data)) {
            cols.push(key);
            values.push(data[key]);
        }
        this._columns(cols);
        this._newValues(values);
        return this;
    }

    subquery(query: string, queryParams: multiType[], subqueryWhen: { afterColumn?: boolean }, aliasName?: string): WriteQuery {
        this._subquery(query, queryParams, { afterFrom: subqueryWhen.afterColumn }, aliasName);
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

    columns(params: string | string[]): UpdateQuery {
        this._columns(params);
        return this;
    }

    update(data: Object): UpdateQuery {
        this._action('UPDATE');
        for (let key of Object.keys(data)) {
            this._set(key, data[key]);
        }
        return this;
    }

    subquery(query: string, queryParams: multiType[], subqueryWhen: { afterColumn?: boolean }, aliasName?: string): UpdateQuery {
        this._subquery(query, queryParams, { afterFrom: subqueryWhen.afterColumn }, aliasName);
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

    where(param: string, condition: '=' | '>=' | '<=' | '>' | '<' | '!=' | '<>' | 'LIKE' | 'NOT LIKE' | 'ILIKE' | 'NOT ILIKE' | 'IS NULL' | 'IS NOT NULL' | 'BETWEEN' | 'NOT BETWEEN' | 'IN' | 'NOT IN', value?: multiType | multiType[], isOr?: boolean, isSubquery?: boolean): DeleteQuery {
        this._where(param, condition, value, isOr, isSubquery);
        return this;
    }

    subquery(query: string, queryParams: multiType[], subqueryWhen: { afterWhere?: boolean; }, aliasName?: string): DeleteQuery {
        this._subquery(query, queryParams, { afterWhere: subqueryWhen.afterWhere }, aliasName);
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