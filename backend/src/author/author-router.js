const AuthorModel =  require('./author-model');

module.exports = function(app){

    app.get('/api/author', async (req, res, next) => {

        const current_page = parseInt(req.query.currentPage)
        const page_size = parseInt(req.query.pageSize)
        
        const result = new AuthorModel().get_all(current_page, page_size)
            .then(function(result) {
                let form_result = {
                    "count": result[0] === undefined ? 0 : result[0].full_count,
                    "results": result
                }
                return res.json(form_result)
            }).catch(function(err) {
                console.log(err)
                // return next(err)
            })
    })

    app.get('/api/author/:id', async (req, res, next) => {
        const id = parseInt(req.params.id)
        const result = new AuthorModel().get_author(id)
            .then(function(result) {
                // console.log("teste - " + result)
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
               //  return next(err)
            })
    })

    app.get('/api/author/name/:name', async (req, res, next) => {
        const name = req.params.name

        const result = new AuthorModel().get_author_by_name(name)
            .then(function(result) {
                // console.log("teste - " + result)
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
               // return next(err)
            })
    })

    app.post('/api/author/', async (req, res, next) => {

        const input_data = req.body;

        if (input_data.author !== undefined)  {
            
            const result = new AuthorModel().insert_author(input_data.author)
            .then(function(result) {
                console.log("added author row")
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
               // return next(err)
            })

        } else {
            return res.status(400).end()
        }

    })

    app.post('/api/author/edit', async (req, res, next) => {

        const input_data = req.body

        if (input_data.author !== undefined)  {
           
            const result = new AuthorModel().update_author(input_data.author)
            .then(function(result) {
                return res.json('updated author row')
            }).catch(function(err) {
                console.log(err)
               // return next(err)
            })
            
        } else {
            return res.status(400).end()
        }

    })

    app.post('/api/author/rem', async (req, res, next) => {

        const input_data = req.body

        if (input_data.id !== undefined)  {
            
            const result = new AuthorModel().delete_author(input_data.id)
            .then(function(result) {
                return res.json('deleted author row')
            }).catch(function(err) {
                console.log(err)
               // return next(err)
            })
            
        } else {
            return res.status(400).end()
        }

    })

}