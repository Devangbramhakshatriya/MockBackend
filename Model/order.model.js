const mongoose=require('mongoose')
const bookSchema=mongoose.Schema({
    user : { type: ObjectId, ref: 'User' },
	 books : [{ type: ObjectId, ref: 'Book' }],
	 totalAmount: Number

})
const BookModel=mongoose.model("book",bookSchema)

module.exports={BookModel}