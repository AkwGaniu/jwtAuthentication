const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Initiallize Express app
const app = express()

//DOTENV CONFIG
dotenv.config()

//Connect to db
mongoose.connect('mongodb://localhost:27017/userAuth', {useNewUrlParser: true},
(err) => {
    if (err) throw err 
    console.log("DB connection successful") 
})

//Import route middle ware
const authRoute = require('./router/route')
const postRoute = require('./router/post')


// Create bodyParser middle ware
app.use(express.json())

///Create route middle ware
app.use('/api/user', authRoute)
app.use('/api/user', postRoute)





app.listen(3000, () => console.log(`Server up and running on port 3000`))
