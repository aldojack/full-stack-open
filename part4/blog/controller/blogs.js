const blogsRouter = require('express').Router()
const Blog = require('../model/blog')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const {body} = request

    const blogToBeAdded = new Blog({
      title: body.title,
      author: body.author,
      url: body.url, 
      likes: body.likes || 0
    })

    console.log(blogToBeAdded);
    
    const savedBlog = await blogToBeAdded.save()
    response.status(201).json(savedBlog)
  })

  module.exports = blogsRouter