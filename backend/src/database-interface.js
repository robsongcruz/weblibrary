const { Pool } = require('pg')

class DataBaseInterface {

    constructor() {
        this._config_data = {
            host : 'localhost',
            user : 'libuser',
            max: 20,
            password : '@011235',
            database : 'web_library'
        }
        this._database = new Pool(this._config_data)

        this._database.on('connect', () => console.log('pool => connected to database'))

    }

    query(sqlcode) {
        let self = this

        return new Promise(function(resolve, reject) {
            self._database.query(sqlcode, function(err, result) {
                    if(err)
                        return reject(err)
                    resolve(result.rows)
                })

                self._database.end()
        })

    }

    query_param(sqlcode, values) {
        let self = this
        
        return new Promise(function(resolve, reject) {
            self._database.query(sqlcode, values, function(err, result) {
                    if(err)
                        return reject(err)
                    resolve(result.rows)
                })

                self._database.end()
        })

    }

    prepare_database() {

        let sqlcode = `CREATE TABLE IF NOT EXISTS author ( 
                        id SERIAL PRIMARY KEY,  
                        first_name   varchar(40) NOT NULL, 
                        last_name    varchar(60),
                        birth_place  varchar(40)
                    ); 

                    CREATE TABLE IF NOT EXISTS book ( 
                        id SERIAL PRIMARY KEY,  
                        title  varchar(100), 
                        subtitle   varchar(600),
                        category   varchar(20)[3],
                        cover_file varchar(30)
                    ); 

                    CREATE TABLE IF NOT EXISTS exemplary ( 
                        author     integer NOT NULL,
                        book   	integer NOT NULL, 

                        PRIMARY KEY (author, book), 
                        CONSTRAINT author_fkey FOREIGN KEY (author) 
                            REFERENCES author (id) 
                            ON UPDATE NO ACTION ON DELETE CASCADE, 
                        CONSTRAINT book_fkey FOREIGN KEY (book)  
                            REFERENCES book (id) 
                            ON UPDATE NO ACTION ON DELETE CASCADE 
                    )`

        this._database
        .query(sqlcode)
        .then(res => {
            console.log("Done..Checked tables")
            this._database.end()
        })
        .catch(err => console.error(`Error on check db tables `, err.stack))
    }

}

module.exports = DataBaseInterface