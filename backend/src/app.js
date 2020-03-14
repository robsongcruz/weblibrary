import express from 'express'
import author from './author-router'

const cors = require('cors')
const body_parser = require('body-parser')

const app = express()

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
app.use(cors())

// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(400).send('Error: ${res.originUrl} not found');
    next()
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Error: ${err}')
    next()
})

author(app)

export default app