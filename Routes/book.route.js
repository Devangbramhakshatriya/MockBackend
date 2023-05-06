const { BookModel } = require("../Model/book.model");
const express=require('express')
const jwt=require("jsonwebtoken")
const bookRouter=express.Router()
bookRouter.post("/add",async(req,res)=>{
    try{
        const book=new BookModel(req.body)
        await book.save()
        res.status(201).send({"msg":"A New book Added"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

bookRouter.get("/",async(req,res)=>{
    const query=req.query
    const category=query.category
    const author=query.author
    q={}
    if(category){
        q={category:category}
    }else if(author){
        q={author:author}
    }else{
        q={}
    }
    try{
        const book=await BookModel.find(q)
        res.status(200).send(book)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

bookRouter.get("/:id",async(req,res)=>{
    const {id}=req.params
    try{
        const book=await BookModel.findById({_id:id})
        res.status(200).send(book)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

bookRouter.patch("/:id",async(req,res)=>{
    
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"dev")
    if(decoded){
        const {id}=req.params
    const payload=req.body
        try{
            const book=await BookModel.findByIdAndUpdate({_id:id},payload)
            res.status(202).send({"msg":"Book has been Updated"})
        }catch(err){
            res.status(400).send({"msg":err.message})
        }
    }else{
        res.status(400).send({"msg":"Please Login First"})
    }
})

bookRouter.delete("/:id",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"dev")
    if(decoded){
        const {id}=req.params
        try{
            const book=await BookModel.findByIdAndDelete({_id:id})
            res.status(202).send({"msg":"Book has been Deleted"})
        }catch(err){
            res.status(400).send({"msg":err.message})
        }
    }else{
        res.status(400).send({"msg":"Please Login First"})
    }
    
})
module.exports={
    bookRouter
}