const mongoose= require('mongoose')

const connection = mongoose.connect("mongodb+srv://devang:devang@cluster0.83s4lmj.mongodb.net/bookdata?retryWrites=true&w=majority")

module.exports={connection}