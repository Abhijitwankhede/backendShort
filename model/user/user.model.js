const mongoose = require("mongoose")

const User = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        unique:true
    },
    mobileNumber:{
        type:String
    },
    password:{
        type:String
    },

    status:{
        type:String,
        default:"active"
    },
    otp:{
        type:String
    },
   
},
{
timestamps:true
})

module.export = mongoose.model("User",User)
