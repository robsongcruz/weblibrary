const DataBaseInterface =  require('../database-interface')

class BookModel {

    constructor() {
    }

    get_all(current_page, page_size) {

        let sqlcode = 'SELECT *, count(*) OVER() AS full_count FROM book LIMIT $1 OFFSET $2'
        let values = [page_size, (current_page - 1) * page_size]

        return new DataBaseInterface().query_param(sqlcode, values)
        
    }

    get_book(id) {

        let sqlcode = 'SELECT * WHERE id=$1'
        
        let values = [id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    insert_book(book) {

        let sqlcode = 'INSERT INTO book (title, subtitle, category, cover_file) VALUES ($1, $2, $3, $4) RETURNING id';

        let values = [book.title, book.subtitle, book.category, book.cover_file]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    update_book(book) {

        let sqlcode = 'UPDATE book SET title=$1, subtitle=$2, category=$3, cover_file=$4 WHERE id=$5'

        let values = [book.title, book.subtitle, book.category, book.cover_file, book.id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    delete_book(id) {

        let sqlcode = 'DELETE FROM book WHERE id=$1'

        let values = [id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }
}

module.exports = BookModel;