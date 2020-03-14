const DataBaseInterface =  require('./database-interface');

class AuthorModel {

    constructor() {
    }

    get_all() {

        var sqlcode = 'SELECT * FROM author'
        
        return new DataBaseInterface().query(sqlcode)
    }

    get_author(id) {

        var sqlcode = 'SELECT id, first_name, last_name FROM author WHERE id=$1'
        
        var values = [id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    insert_author(input) {

        let author = input.author

        var sqlcode = 'INSERT INTO author (first_name, last_name, birth_place) VALUES ($1, $2, $3) RETURNING id';

        var values = [author.first_name, author.last_name, author.birth_place]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    update_author(input) {

        let author = input.author

        let sqlcode = 'UPDATE author SET first_name=$1, last_name=$2, birth_place=$3 WHERE id=$4'

        var values = [author.first_name, author.last_name, author.birth_place, author.id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    delete_author(id) {

        let sqlcode = 'DELETE FROM author WHERE id=$1'

        var values = [id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }
}

module.exports = AuthorModel;