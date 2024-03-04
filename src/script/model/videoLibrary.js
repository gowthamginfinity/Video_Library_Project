const mongoose = require('mongoose');
const validator = require('validator');
let registerSchema = new mongoose.Schema({  
   name : {
    type : String,
    required : true,
    trim : true,
    minLength : 2
   },
   userId : {
    type : String,
    required : true,
    trim : true,
    minLength : 2,
    lowercase : true,
    unique : [true,"Username is already present"]
   },
   password : {
    type : String,
    required : true,
    minLength : 5,
    trim : true,
   },
   date : {
    type : Date
   },
   phone :{
    type : Number,
    trim: true,
    min: 10,
    required: true,
    unique : true
    
   },
   email : {
    type : String,
    unique : [true,"Email is already present"],
    trim : true,
    lowercase : true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email");
        }
    }
   },
   
})

const UserRegister = mongoose.model("users",registerSchema);

module.exports = UserRegister;