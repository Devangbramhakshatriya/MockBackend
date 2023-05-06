const bcrypt=require("bcrypt")
const express=require('express')
const jwt=require("jsonwebtoken")
const { UserModel } = require('../Model/user.model')
const userRouter=express.Router()
userRouter.post("/register",async(req,res)=>{
    const {name,email,password,isAdmin}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            const user=new UserModel({name,email,password:hash,isAdmin})
            await user.save()
            res.status(201).send({"msg":"A New User Added"})
        })
        
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(201).send({"msg":"Login Successfull","token":jwt.sign({"userId":user._id},"dev")})
                }else{
                    res.status(400).send({"msg":"Wrong Credentials"})
                }
            })
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={
    userRouter
}