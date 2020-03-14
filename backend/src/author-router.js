const AuthorModel =  require('./author-model');

module.exports = function(app){

    app.get('/api/author/', async (req, res, next) => {
        try {
            const result = new AuthorModel().get_all()
            
            return res.json(result)
        } catch (e) {
            // fire down to error middleware
            return next(e)
        }
    })

    app.get('/api/author/:id', async (req, res, next) => {
        try {
            const id = parseInt(req.params.id)

            const result = new AuthorModel().get_author(id)
            
            return res.json(result);
        } catch (e) {
            // fire down to error middleware
            return next(e)
        }
    })

    app.post('/api/author/', async (req, res, next) => {
      
        try {
            
            const input_data = req.body;

            if (!input_data) {
                return res.status(400).end();
            } else {
                
                // console.log(input_data);
                const result = new AuthorModel().insert_author(input_data)
                                                                        
                return res.json(result);
            }
    
        } catch (e) {
            // fire down to error middleware
            return next(e);
        }
    })

    app.post('/api/author/edit', async (req, res, next) => {
      
        try {
            
            const input_data = req.body;

            if (!input_data) {
                return res.status(400).end();
            } else {
                
                // console.log(input_data);
                const result = new AuthorModel(req.connection).update_author(input_data)
                                                                        
                return res.json('update sucessfull');
            }
    
        } catch (e) {
            // fire down to error middleware
            return next(e);
        }
    })

    app.post('/api/author/:id', async (req, res, next) => {

        try {
            const id = parseInt(req.params.id)

            const result = new AuthorModel().delete_author(id)
            
            return res.json('deleted row')
        } catch (e) {
            // fire down to error middleware
            return next(e)
        }


    })



}