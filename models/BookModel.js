const mongoose =require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    author:{
        type:String,
         required: true,
    },
    publishDate:{
        type:Date,

    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
         required:true,
    },
    pages:{
         type:Number,
         required:true,
    },
    category:{
        type:String,
    },
    condition:{
        type:String,
        enum:["New","In-between","Old","Treta-Yug"]
    },
    location:{
       type:{
        type:String,
        enum:["Point"],
        default:"Point"
       },
       coordinates:{
        type:[Number],
        required:true
       }

    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true,
    },
    image:{
        type:String,
    }
},
{
    timestamps:true,
});

bookSchema.index({location:"2dsphere"});

module.exports=mongoose.model("Book",bookSchema);