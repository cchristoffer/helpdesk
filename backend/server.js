const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000

//Connect to database
connectDB()

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