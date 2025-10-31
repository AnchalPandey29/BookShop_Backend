const User = require("../models/UserModel");

// create user
const register = async(req,res)=>{
    try{
        const {firebaseUid,email,name,photoURL,phoneNumber,location}=req.body;

        if(!firebaseUid||!email)
        {
            return res.status(400).json({message:"Missing required fields"})
        }

        const user = await User.findOneAndUpdate({firebaseUid},{name,email,photoURL,phoneNumber,location},
            {new:true, upsert:true}
        );

        res.status(200).json({success:true, user})
    }
    catch(err)
    {
     res.status(500).json({message: err.message})

    }
}

const getUser = async(req,res)=>{
    try{
        const firebaseUid = req.user.uid;
        const user= User.findOne(firebaseUid);
        if(!user) return res.status(404).json({message:"User not found"})

        res.status(200).json({message:"User data", user});

    }
    catch(err)
    {
          res.status(500).json({message: err.message})
    }
}

module.exports={register, getUser};