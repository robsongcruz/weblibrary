const DataBaseInterface =  require('../database-interface')

class ExemplaryModel {

    constructor() {
    }

    get_all(current_page, page_size) {

        let sqlcode = 'SELECT author.id, author.first_name, author.last_name, author.birth_place, book.title, count(*) OVER() AS full_count FROM author ' 
                        + ' LEFT JOIN exemplary ON exemplary.author=author.id '
                        + ' LEFT JOIN book ON exemplary.book=book.id '
                        + ' LIMIT $1 OFFSET $2'

        let values = [page_size, (current_page - 1) * page_size]

        return new DataBaseInterface().query_param(sqlcode, values)
        
    }

    get_book_by_author(id) {

        let sqlcode = 'SELECT book.id, book.title, count(*) OVER() AS full_count FROM exemplary ' 
                        + ' INNER JOIN author ON exemplary.author=author.id ' 
                        + ' INNER JOIN book ON exemplary.book=book.id '
                        + ' WHERE author.id=$1'
        
        let values = [id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    get_author_by_book(id) {

        let sqlcode = 'SELECT author.id, author.first_name, author.last_name, count(*) OVER() AS full_count FROM exemplary ' 
                        + ' INNER JOIN author ON exemplary.author=author.id ' 
                        + ' INNER JOIN book ON exemplary.book=book.id '
                        + ' WHERE book.id=$1'

        
        let values = [id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    insert_exemplary(author, book) {

        let sqlcode = 'INSERT INTO exemplary (author, book) VALUES ($1, $2) RETURNING *';

        let values = [author.id, book.id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    update_exemplary(new_data, old_data) {

        let sqlcode = 'UPDATE exemplary SET author=$1, book=$2 WHERE author=$3 AND book=$4'

        let values = [new_data.author, new_data.book, old_data.author, old_data.book]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    delete_exemplary(author, book) {

        let sqlcode = 'DELETE FROM exemplary WHERE author=$3 AND book=$4'

        let values = [author, book]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }
}

module.exports = ExemplaryModel;