const express = require('express')
const app = express()
const PORT = 8080

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, (err) => {
    console.log('This app is running on port ${PORT}')
})