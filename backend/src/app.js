import express from 'express'
import author from './author/author-router'
import book from './book/book-router'
import exemplary from './exemplary/exemplary-router'

const fileUpload = require('express-fileupload')

const cors = require('cors')
const body_parser = require('body-parser')

const app = express()

app.use(cors())
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())


// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next()
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`)
    next()
})

app.use('/static', express.static('resources'))

app.use(fileUpload({
    createParentPath: true
}))

author(app)
book(app)
exemplary(app)


export default app