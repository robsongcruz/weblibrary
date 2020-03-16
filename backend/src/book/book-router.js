const BookModel =  require('./book-model');

module.exports = function(app){

    app.get('/api/book', async (req, res, next) => {

        const current_page = parseInt(req.query.currentPage)
        const page_size = parseInt(req.query.pageSize)
        
        const result = new BookModel().get_all(current_page, page_size)
            .then(function(result) {
                let form_result = {
                    "count": result[0].full_count,
                    "results": result
                }
                return res.json(form_result)
            }).catch(function(err) {
                console.log(err)
                return next(err)
            })
    })

    app.get('/api/book/:id', async (req, res, next) => {
        const id = parseInt(req.params.id)
        const result = new BookModel().get_book(id)
            .then(function(result) {
                // console.log("teste - " + result)
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
                return next(err)
            })
    })

    app.post('/api/book/', async (req, res, next) => {

        const input_data = req.body;

        if (!input_data) {
            return res.status(400).end();
        } else {
                
            const result = new BookModel().insert_book(input_data.book)
            .then(function(result) {
                console.log("added book row")
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
                return next(err)
            })

        }

    })

    app.post('/api/book/edit', async (req, res, next) => {

        const input_data = req.body

        if (!input_data) {
            return res.status(400).end();
        } else {
                
            const result = new BookModel().update_book(input_data.book)
            .then(function(result) {
                return res.json('updated book row')
            }).catch(function(err) {
                console.log(err)
                return next(err)
            })
            
        }

    })

    app.post('/api/book/rem', async (req, res, next) => {

        const input_data = req.body

        if (!input_data) {
            return res.status(400).end();
        } else {
                
            const result = new BookModel().delete_author(input_data.id)
            .then(function(result) {
                return res.json('deleted book row')
            }).catch(function(err) {
                console.log(err)
                return next(err)
            })
            
        }

    })


}