const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userController = require('./controllers/user-controller')
require('dotenv').config()

const app = express();



app.use(cors());
app.use(express.json())


app.post("/login", userController.signin)

app.get('/user/favorites/:userId', userController.getFavorites)
app.post('/user', userController.signupFunc)
app.patch('/user', userController.addToFavories)
app.delete('/user/:userId/:movieId', userController.removeFromFavorites)


const mongodbUrl = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@cluster0.w9stmxs.mongodb.net/imdb?retryWrites=true&w=majority';
mongoose.connect(mongodbUrl)
.then( function(){
    console.log('Server connected')
    app.listen(5000)
})
.catch( function(error){
    console.log(error)
})

