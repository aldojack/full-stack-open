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
      const blogs = await api.get('/api/blogs').expect(200)
      expect(blogs.body).toHaveLength(listHelper.initialData.length)
    })
  })

  describe('POST Methods',() => {
    test("Testing api/blogs", async () => {

    const DBSizeBeforeAdd = await listHelper.getBlogs();
    
      const blog = {
        title: "frontend tips and tricks",
        author: "Alan Jack",
        url: "www.fronty.com",
        likes: 5
    }

      await api.post('/api/blogs').send(blog).expect(201)
      const DBSizeAfterAdd = await listHelper.getBlogs();
      expect(DBSizeAfterAdd.length).toBe(DBSizeBeforeAdd.length + 1)
    })
  })
  
  afterAll(async () => {
    await mongoose.connection.close()
  })