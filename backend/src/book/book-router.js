const BookModel =  require('./book-model');

module.exports = function(app){

    app.get('/api/book/', async (req, res, next) => {
        const result = new BookModel().get_all()
            .then(function(result) {
                // console.log("teste - " + result)
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
                return next(e)
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
                return next(e)
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
                return next(e)
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

    app.post('/api/book/:id', async (req, res, next) => {

        const id = parseInt(req.params.id)
        const result = new BookModel().delete_author(id)
            .then(function(result) {
                return res.json('deleted row')
            }).catch(function(err) {
                console.log(err)
                return next(e)
            })

    })


}