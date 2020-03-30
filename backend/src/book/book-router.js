const BookModel =  require('./book-model');

module.exports = function(app){

    app.get('/api/book', async (req, res, next) => {

        const current_page = parseInt(req.query.currentPage)
        const page_size = parseInt(req.query.pageSize)
        
        const result = new BookModel().get_all(current_page, page_size)
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

    app.get('/api/book/:id', async (req, res, next) => {
        const id = parseInt(req.params.id)
        const result = new BookModel().get_book(id)
            .then(function(result) {
                // console.log("teste - " + result)
                return res.json(result)
            }).catch(function(err) {
                console.log(err)
            })
    })

    /* app.post('/api/book/', async (req, res, next) => {

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
                // return next(err)
            })

        }

    }) 
    
    app.post('/static', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
    });
    */

   // app.post('/api/book/', async (req, res, next) => {


    app.post('/api/book/', async (req, res, next) => {

        const input_data = req.body
        console.log(input_data)
        console.log(req.files)

        if (input_data.book !== undefined)  {
            
            input_data.book = JSON.parse(input_data.book)
            const file = req.files
            
            try {
                
                if(file !== null) {
                    const cover = file.cover
                    //Use the mv() method to place the file in upload directory
                    cover.mv('resources/img/' + cover.name)
                    
                    input_data.book.cover_file = cover.name
                    console.log('File uploaded')  
                } else {
                    console.log('Undefined File')
                }

            } catch (err) {
                console.log('Error on File Uploading')
                console.log(err)
            }
            
            const result = new BookModel().insert_book(input_data.book)
                    .then(function(result) {
                        console.log("added book row")
                        return res.json(result)
                    }).catch(function(err) {
                        console.log(err)
                        // return next(err)
                    })

        }

    })

    app.post('/api/book/edit', async (req, res, next) => {

        const input_data = req.body
        console.log(input_data)
        console.log(req.files)

        if (input_data.book !== undefined)  {
            
            input_data.book = JSON.parse(input_data.book)
            const cover = req.files.cover
            
            try {
                    
                if(cover !== null) {
                    
                    //Use the mv() method to place the file in upload directory
                    cover.mv('resources/img/' + cover.name)
                    
                    input_data.book.cover_file = cover.name
                    console.log('File uploaded')  
                } else {
                    console.log('Undefined File')
                }

            } catch (err) {
                console.log('Error on File Uploading')
                console.log(err)
            }
            
            const result = new BookModel().update_book(input_data.book)
                    .then(function(result) {
                        console.log("added book row")
                        return res.json(result)
                    }).catch(function(err) {
                        console.log(err)
                        // return next(err)
                    })

        }

    })

    app.post('/api/book/rem', async (req, res, next) => {

        const input_data = req.body

        console.log(input_data)

        if (input_data.id !== undefined)  {
                
            const result = new BookModel().delete_book(input_data.id)
            .then(function(result) {
                return res.json('deleted book row')
            }).catch(function(err) {
                console.log(err)
                console.log("Error On DELETE")
                // return next(err)
            })
            
        } else {

            return res.status(400).end();

        }

    })


}