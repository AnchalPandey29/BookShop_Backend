const Book = require("../models/BookModel");

const addBook = async(req,res)=>{
    try{
        const {title,author,description,price,pages,image,category,condition,lat,long,publishDate} =req.body;

        const newBook = new Book({
            title,
            author,
            description,
            price,
            pages,
            image,
            category,
            condition,
            location:{
                type:"Point",
                coordinates:[long,lat]
            },
            publishDate,
            seller:req.user.uid,
        });

        await newBook.save();

        res.status(201).json({sucess:true,book:newBook})

    }
    catch(err)
    {
        console.error("Erorr happened",err.message);
        res.status(500).json({sucess:false,message:err.message})
        
    }
}

const getBooks = async(req,res)=>{
    try{
        const {lat,long,maxDistance}= req.query;

        if(lat&&long&&maxDistance){
            const books =await Book.find({
                location:{
                    $near:{
                        $geometry:{type:"Point",coordinates:[parseFloat(long),parseFloat(lat)]},
                        $maxDistance:parseFloat(maxDistance)
                    }
                }
            })

            return res.json(books);

        }

        const books = await Book.find().sort({createdAt:-1});
        res.json(books);

    }
    catch(err)
    {
         console.error("Erorr happened",err.message);
        res.status(500).json({sucess:false,message:err.message})
        
    }
}

module.exports={addBook,getBooks};