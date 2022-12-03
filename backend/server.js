const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlewares/errorMiddleware')
const PORT = process.env.PORT || 8000

const app = express()

//Middlewares

//Enables JSON
app.use(express.json())
//Enables url encoded bodies
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the Help desk api'})
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})