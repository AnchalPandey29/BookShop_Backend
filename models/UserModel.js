const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseUid:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
    photoURL:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    location:{
        lat:Number,
        long:Number,
    },
    
},
{timestamps:true}
);

module.exports=mongoose.model("User",userSchema);