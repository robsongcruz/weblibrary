const AuthorModel =  require('./exemplary-model');

module.exports = function(app){

    app.get('/api/exemplary', async (req, res, next) => {

        const current_page = parseInt(req.query.currentPage)
        const page_size = parseInt(req.query.pageSize)
        
        const result = new ExemplaryModel().get_all(current_page, page_size)
            .then(function(result) {
                let form_result = {
                    "count": result[0].full_count,
                    "results": result
                }
                return res.json(form_result)
            }).catch(function(err) {
                console.log(err)
                return next(e)
            })
    })

    app.get('/api/exemplary/author/:id', async (req, res, next) => {
        const id = parseInt(req.params.id)
        const result = new ExemplaryModel().get_book_by_author(id)
            .then(function(result) {
                // console.log("teste - " + result)
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
                return next(e)
            })
    })

    app.get('/api/exemplary/book/:id', async (req, res, next) => {
        const id = parseInt(req.params.id)
        const result = new ExemplaryModel().get_author_by_book(id)
            .then(function(result) {
                // console.log("teste - " + result)
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
                return next(e)
            })
    })

    app.post('/api/exemplary/', async (req, res, next) => {

        const input_data = req.body;

        if (!input_data) {
            return res.status(400).end();
        } else {
                
            const result = new ExemplaryModel().insert_exemplary(input_data.author, input_data.book)
            .then(function(result) {
                console.log("added exemplary row")
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
                return next(e)
            })

        }

    })

    app.post('/api/exemplary/edit', async (req, res, next) => {

        const input_data = req.body

        if (!input_data) {
            return res.status(400).end();
        } else {
                
            const result = new ExemplaryModel().update_exemplary(input_data.new_data, input_data.old_data)
            .then(function(result) {
                return res.json('updated author row')
            }).catch(function(err) {
                console.log(err)
                return next(err)
            })
            
        }

    })

    app.post('/api/exemplary/rem', async (req, res, next) => {

        const input_data = req.body

        if (!input_data) {
            return res.status(400).end();
        } else {
                
            const result = new ExemplaryModel().delete_exemplary(input_data.author, input_data.book)
            .then(function(result) {
                return res.json('deleted author row')
            }).catch(function(err) {
                console.log(err)
                return next(err)
            })
            
        }

    })



}