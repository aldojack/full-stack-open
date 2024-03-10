const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {type: String, minLength: 8, required: true},
  author: String,
  url: {type: String, minLength: 10, required: true},
  likes: {type: Number, min: [ 0, 'Cannot be negative value' ] },
  user: {
    type: mongoose.Schema.ObjectId, 
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Blog', blogSchema)

