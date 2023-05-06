const express=require('express')
const { connection } = require('./db')
const { bookRouter } = require('./Routes/book.route')
const { userRouter } = require('./Routes/user.route')
const { auth } = require('./Middleware/auth.middleware')
const app=express()
app.use(express.json())
app.use("/users",userRouter)
app.use(auth)
app.use("/books",bookRouter)
app.listen(4500,async()=>{
    try{
        await connection
        console.log("Connected To DB")
    }catch(err){
        console.log("Not Connected")
        console.log(err)
    }
    console.log("Server Is Running on 4500 port")
})