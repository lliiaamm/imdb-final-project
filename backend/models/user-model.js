const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    favorites:[{
        imdbID:{type:String, required:true},
        Poster:{type:String, required:true},
        Title:{type:String, required:true},
        Plot:{type:String, required:true},
        Type:{type:String, required:true},

    }]
});
module.exports = mongoose.model('User', userSchema);