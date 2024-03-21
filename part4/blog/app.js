const express = require('express')
const app = express()
require('express-async-errors')
const mongoose = require('mongoose')
const blogsRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const {MONGODB_URI} = require('./utils/config')
const cors = require('cors')
const middleware = require('./utils/middleware')


mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.getTokenFrom)
app.use('/api/blogs', middleware.userExtractor ,blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.blogErrorHandling)

module.exports = app