const blogsRouter = require('express').Router()
const { blogErrorHandling } = require('../utils/middleware')
const Blog = require('../model/blog')
const User = require('../model/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { 'username': 1, 'name': 1 })
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  const { body } = request
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  console.log(decodedToken)
  if(!decodedToken.id){
    return response.status(401).json({error: "Token invalid"})
  }
  const user = await User.findById(decodedToken.id)
  if (!user) return response.status(400).end()
  console.log('user: ', user)
  const blogToBeAdded = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blogToBeAdded.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  await Blog.findByIdAndDelete(id)
  response.sendStatus(204)
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { likes } = request.body

  if (!likes || likes < 0) throw new Error('Missing likes property')
  const blogToUpdate = await Blog.findByIdAndUpdate(id, { likes: likes }, { new: true, runValidators: true })
  response.status(200).json(blogToUpdate)
})


module.exports = blogsRouter