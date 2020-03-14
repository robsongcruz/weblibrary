const DataBaseInterface =  require('../database-interface')

class AuthorModel {

    constructor() {
    }

    get_all() {

        let sqlcode = 'SELECT * FROM author'
        
        return new DataBaseInterface().query(sqlcode)
        
    }

    get_author(id) {

        let sqlcode = 'SELECT id, first_name, last_name FROM author WHERE id=$1'
        
        let values = [id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    insert_author(author) {

        let sqlcode = 'INSERT INTO author (first_name, last_name, birth_place) VALUES ($1, $2, $3) RETURNING id';

        let values = [author.first_name, author.last_name, author.birth_place]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    update_author(author) {

        let sqlcode = 'UPDATE author SET first_name=$1, last_name=$2, birth_place=$3 WHERE id=$4'

        let values = [author.first_name, author.last_name, author.birth_place, author.id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    delete_author(id) {

        let sqlcode = 'DELETE FROM author WHERE id=$1'

        let values = [id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }
}

module.exports = AuthorModel;