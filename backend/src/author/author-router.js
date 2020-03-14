const AuthorModel =  require('./author-model');

module.exports = function(app){

    app.get('/api/author/', async (req, res, next) => {
        const result = new AuthorModel().get_all()
            .then(function(result) {
                // console.log("teste - " + result)
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
                return next(e)
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
                return next(e)
            })
    })

    app.post('/api/author/', async (req, res, next) => {

        const input_data = req.body;

        if (!input_data) {
            return res.status(400).end();
        } else {
                
            const result = new AuthorModel().insert_author(input_data.author)
            .then(function(result) {
                console.log("added author row")
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
                return next(e)
            })

        }

    })

    app.post('/api/author/edit', async (req, res, next) => {

        const input_data = req.body

        if (!input_data) {
            return res.status(400).end();
        } else {
                
            const result = new AuthorModel().update_author(input_data.author)
            .then(function(result) {
                return res.json('updated author row')
            }).catch(function(err) {
                console.log(err)
                return next(err)
            })
            
        }

    })

    app.post('/api/author/:id', async (req, res, next) => {

        const id = parseInt(req.params.id)
        const result = new AuthorModel().delete_author(id)
            .then(function(result) {
                return res.json('deleted row')
            }).catch(function(err) {
                console.log(err)
                return next(e)
            })

    })



}