const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minLength: 3,
    required: true
  },
  name: String,
  hashedPassword: { 
    type: String, 
    required: true 
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.hashedPassword

  }
})

module.exports = mongoose.model('User', userSchema)

