const ExemplaryModel =  require('./exemplary-model');

module.exports = function(app){

    app.get('/api/exemplary', async (req, res, next) => {

        const current_page = parseInt(req.query.currentPage)
        const page_size = parseInt(req.query.pageSize)
        
        const result = new ExemplaryModel().get_all(current_page, page_size)
            .then(function(result) {
                let form_result = {
                    "count": result[0] === undefined ? 0 : result[0].full_count,
                    "results": result
                }
                return res.json(form_result)
            }).catch(function(err) {
                console.log(err)
            })
    })  

    app.get('/api/exemplary/full', async (req, res, next) => {

        const current_page = parseInt(req.query.currentPage)
        const page_size = parseInt(req.query.pageSize)
        
        const result = new ExemplaryModel().get_exemplaries(current_page, page_size)
            .then(function(result) {
                let form_result = {
                    "count": result[0] === undefined ? 0 : result[0].full_count,
                    "results": result
                }
                return res.json(form_result)
            }).catch(function(err) {
                console.log(err)
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
            })
    })

    app.post('/api/exemplary/', async (req, res, next) => {

        const input_data = req.body;

        if (input_data !== undefined)  {
                
            const result = new ExemplaryModel().insert_exemplary(input_data.author, input_data.book)
            .then(function(result) {
                console.log("added exemplary row")
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
            })

        } else {
            return res.status(400).end()
        }

    })

    app.post('/api/exemplary/b/', async (req, res, next) => {

        const input_data = req.body;

        if (input_data.data !== undefined)  {
                
            const result = new ExemplaryModel().insert_exemplary_bulk(input_data.data)
            .then(function(result) {
                console.log("added exemplary bulk")
                return res.json('sucess')
            }).catch(function(err) {
                console.log(input_data.data)
            })

        } else {
            return res.status(400).end()
        }

    })

    app.post('/api/exemplary/edit', async (req, res, next) => {

        const input_data = req.body

        if ((input_data.new_data !== undefined) && (input_data.old_data !== undefined)) {
                
            const result = new ExemplaryModel().update_exemplary(input_data.new_data, input_data.old_data)
            .then(function(result) {
                return res.json('updated author row')
            }).catch(function(err) {
                console.log(err)
            })
            
        } else {
            return res.status(400).end()
        }

    })

    app.post('/api/exemplary/rem', async (req, res, next) => {

        const input_data = req.body

        if ((input_data.author !== undefined) && (input_data.book !== undefined)) {
                
            const result = new ExemplaryModel().delete_exemplary(input_data.author, input_data.book)
            .then(function(result) {
                return res.json('deleted author row')
            }).catch(function(err) {
                console.log(err)
            })
            
        } else {
            return res.status(400).end()
        }

    })

    app.post('/api/exemplary/rem/b', async (req, res, next) => {

        const input_data = req.body

        if (input_data.data !== undefined)  {
                
            const result = new ExemplaryModel().delete_exemplary_bulk(input_data.data)
            .then(function(result) {
                return res.json('deleted author rows')
            }).catch(function(err) {
                console.log(err)
            })
            
        } else {
            return res.status(400).end()
        }

    })



}