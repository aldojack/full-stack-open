const blogsRouter = require('express').Router()
const {blogErrorHandling} = require('../utils/middleware')
const Blog = require('../model/blog')
const User = require('../model/user')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const {body} = request
    const user = await User.findById(body.userId)
    if(!user) return response.status(400).end()

    const blogToBeAdded = new Blog({
      title: body.title,
      author: body.author,
      url: body.url, 
      likes: body.likes || 0,
      user: body.userId
    })
    console.log(blogToBeAdded)
    const savedBlog = await blogToBeAdded.save()
    response.status(201).json(savedBlog)
  })

  blogsRouter.delete('/:id', async(request, response) => {
    const {id} = request.params
    await Blog.findByIdAndDelete(id)
    response.sendStatus(204)
  })

  blogsRouter.put('/:id', async (request, response) => {
    const {id} = request.params
    const {likes} = request.body
    
    if(!likes || likes <0) throw new Error('Missing likes property')
    const blogToUpdate = await Blog.findByIdAndUpdate(id, {likes: likes}, {new: true, runValidators: true})
    response.status(200).json(blogToUpdate)
  })


  module.exports = blogsRouter