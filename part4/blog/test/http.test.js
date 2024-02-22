const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../model/blog')
const app = require('../app')
const api = supertest(app)

// beforeAll(async () => {
//     await Blog.deleteMany({})
//     await Blog.insertMany(listHelper.initialData)
// })

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(listHelper.initialData)
})

describe('GET Methods', () => {
    test("Testing api/blogs", async () => {
        const blogs = await api.get('/api/blogs').expect(200)
        expect(blogs.body).toHaveLength(listHelper.initialData.length)
    })

    test('Testing all blogs have ID', async () => {
        const blogs = await api.get('/api/blogs').expect(200)
        expect(blogs.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: expect.any(String) })
            ])
        )
    })
})

  

describe('POST Methods', () => {
    test.each([
        ['with likes property', {
            title: "frontend tips and tricks",
            author: "Alan Jack",
            url: "www.fronty.com",
            likes: 5
        }],
        ['without likes property', {
            title: "frontend tips and tricks",
            author: "Alan Jack",
            url: "www.fronty.com",
        }],
        ['without likes title and url', {
            author: "Alan Jack",
            likes: 5
        }]
    ])('Testing api/blogs %s', async (_, blog) => {
        const DBBeforeAdd = await listHelper.getBlogs();

        if (!blog.title || !blog.url) {
            await api.post('/api/blogs').send(blog).expect(400);
          } else {
            await api.post('/api/blogs').send(blog).expect(201);
          }
          const DBAfterAdd = await listHelper.getBlogs();

          if (!blog.title || !blog.url) {
            expect(DBAfterAdd.length).toBe(DBBeforeAdd.length); // No change in DB size
          } else {
            expect(DBAfterAdd.length).toBe(DBBeforeAdd.length + 1); // DB size increases by one
          }
    });
});

describe('DELETE Methods', () => {
    test('using valid ID', async () => {
        const blogs = await listHelper.getBlogs()
        const deleteBlog = blogs[0]
        const DBBeforeAdd = blogs.length
        await api.delete(`/api/blogs/${deleteBlog.id}`).expect(204)

        const DBAfterAdd = await listHelper.getBlogs();
        expect(DBAfterAdd.length).toBe(DBBeforeAdd - 1);
    })
    test('using invalid ID', async() => {
        const blogs = await listHelper.getBlogs()
        const DBBeforeAdd = blogs.length
        await api.delete(`/api/blogs/aRandomString}`).expect(400)

        const DBAfterAdd = await listHelper.getBlogs();
        expect(DBAfterAdd.length).toBe(DBBeforeAdd);
    })
})

describe('PUT Methods', () => {
    test('using valid ID and likes', async () => {
        const blogs = await listHelper.getBlogs()
        const idToUpdate = blogs[0]
        const updatedBlog = {likes: 50};
        
        const result = await api.put(`/api/blogs/${idToUpdate.id}`).send(updatedBlog).expect(200)
        expect(result.body.likes).toBe(updatedBlog.likes);
    })

    test('using valid ID with negative likes', async () => {
        const blogs = await listHelper.getBlogs()
        const idToUpdate = blogs[0]
        const updatedBlog = {likes: -50};
        
        const result = await api.put(`/api/blogs/${idToUpdate.id}`).send(updatedBlog).expect(400)
        expect(result.body).toHaveProperty("error");
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})