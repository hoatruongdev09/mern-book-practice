const express = require('express')
var app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000

app.use('/books', require('./routers/booksRouter'))
app.use('/users', require('./routers/usersRouter'))

app.listen(port, () => {
    console.log("app listen on: ", port)
})