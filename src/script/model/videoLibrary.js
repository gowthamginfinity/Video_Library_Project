const mongoose = require("mongoose");
const validator = require("validator");
let registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
  userId: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    lowercase: true,
    unique: [true, "Username is already present"],
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    trim: true,
  },
  date: {
    type: Date,
  },
  phone: {
    type: Number,
    trim: true,
    min: 10,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: [true, "Email is already present"],
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
});
let videosSchema = new mongoose.Schema({
    videoTitle : {
        type : String,
        required: true,
        trim: true
    },
    videoDescription : {
        type : String,
        required: true,
        trim: true
    },videoUrl : {
        type : String,
        required: true,
        trim: true
    },
    categoryType : {
     type : String,
     required: true,
     trim: true
    },
    videoLikes : {
        type : Number,
        default : 0
    },
    videoDislikes : {
        type : Number,
        default : 0
    },
    videoViews : {
        type : Number,
        default : 0
    }
});
let adminSchema  = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  mobile: {
    type: Number,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
});
const UserRegister = mongoose.model("users", registerSchema);
const Videoss = mongoose.model("videos", videosSchema);
const Adminn = mongoose.model("admins", adminSchema);

module.exports = { UserRegister, Videoss, Adminn };
