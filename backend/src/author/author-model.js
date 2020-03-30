const DataBaseInterface =  require('../database-interface')

class AuthorModel {

    constructor() {
    }

    get_all(current_page, page_size) {

        let sqlcode = 'SELECT *, count(*) OVER() AS full_count FROM author LIMIT $1 OFFSET $2'
        let values = [page_size, (current_page - 1) * page_size]

        return new DataBaseInterface().query_param(sqlcode, values)
        
    }

    get_author(id) {

        let sqlcode = 'SELECT id, first_name, last_name FROM author WHERE id=$1'
        
        let values = [id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    get_author_by_name(name) {
        //OR LOWER(last_name) LIKE LOWER($1%)
        let sqlcode = `SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM author WHERE LOWER(first_name) LIKE LOWER($1) OR LOWER(last_name) LIKE LOWER($2)`
        
        let values = [name + '%', '%' + name + '%']
        
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