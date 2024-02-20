const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../model/blog')
const app = require('../app')
const api = supertest(app)

beforeAll(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(listHelper.initialData)
  })
  
  describe('GET Methods',() => {
    test("Testing api/blogs", async () => {
      await api.get('/api/blogs').expect(200)
    })
  })
  
  describe('POST Methods',() => {
    test("Testing api/blogs", async () => {
      const blog = listHelper.initialData[0]
      const blogs = await api.post('/api/blogs', blog).expect(201)
    })
  })
  
  afterAll(async () => {
    await mongoose.connection.close()
  })