const DataBaseInterface =  require('../database-interface')

class BookModel {

    constructor() {
    }

    get_all() {

        let sqlcode = 'SELECT * FROM book'
        
        return new DataBaseInterface().query(sqlcode)
        
    }

    get_book(id) {

        let sqlcode = 'SELECT * WHERE id=$1'
        
        let values = [id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    insert_book(book) {

        let sqlcode = 'INSERT INTO book (title, subtitle, category) VALUES ($1, $2, $3) RETURNING id';

        let values = [book.title, book.subtitle, book.category]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    update_book(book) {

        let sqlcode = 'UPDATE book SET title=$1, subtitle=$2, category=$3 WHERE id=$4'

        let values = [book.title, book.subtitle, book.category, book.id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }

    delete_book(id) {

        let sqlcode = 'DELETE FROM book WHERE id=$1'

        let values = [id]
        
        return new DataBaseInterface().query_param(sqlcode, values)
    }
}

module.exports = BookModel;