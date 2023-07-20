const User = require('../models/user-model');

async function signin(request, response){
    const email = request.body.email;
    const password = request.body.password;

    const existingUser = await User.findOne({email:email});
    if(existingUser && existingUser.password === password){
        response.send(existingUser);
    }else{
        response.status(400).send({msg:'email or password are incorrect'})
    }
}

async function signup(request, response)  {
    const user = request.body.user;

    const existingUser = await User.findOne({email:user.email});
    if(existingUser){
        response.status(400).send({msg:'email already exist'})
        return;
    }
    const newUser = new User(user);
    const savedUser = await newUser.save();

    response.send(savedUser)
}

async function addToFavories(request, response){
    try{
    const userId = request.body.userId;
    const movie = request.body.movie;

    const user = await User.findById(userId);
    if( user.favorites.find( m => m.id == movie.id) ){
        response.send({msg: movie.title + " already exist"});
        return;
    }
    user.favorites.push(movie);
    const savedUser = await user.save();
    
    response.send(savedUser)
    }catch(error){
        console.log(error);
        response.send({msg:'error'})
    }
}

async function getFavorites(request, response){
    const userId = request.params.userId;
    try{
        const user = await User.findById(userId);

        response.send({favorites: user.favorites})
    }catch(error){
        console.log(error);
        response.send({msg:'error'})
    }
}

async function removeFromFavorites(request, response){
    try{
    const userId = request.params.userId;
    const imdbID = request.params.movieId;

    const user = await User.findById(userId);

    user.favorites = user.favorites.filter( m => m.imdbID != imdbID)
    const savedUser = await user.save();
    
    response.send(savedUser)
    }catch(error){
        console.log(error);
        response.send({msg:'error'})
    }
}
module.exports={signupFunc: signup, signin, addToFavories, getFavorites, removeFromFavorites}