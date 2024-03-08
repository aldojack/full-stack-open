// const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../model/user')
const app = require('../app')
const api = supertest(app)

beforeAll(async () => {
    await User.deleteMany({})
})


describe('Creating User', () => {
    test('Successful User added', async () => {
        const newUser = {
            username: "aldojack",
            name: "Alan Jack",
            password: "password"
        }
        await api.post('/api/users').send(newUser).expect(201)
    })

    test('Ignore spaces in username', async () => {
        const newUser = {
            username: "extremely long complicated username",
            name: "Alan Jack",
            password: "password"
        }
        const result = await api.post('/api/users').send(newUser).expect(201)
        expect(result.body.username).toBe('extremelylongcomplicatedusername')
    })
    test('New user password too short', async () => {
        const newUser = {
            username: "lmcmil212",
            name: "I should not run :( ",
            password: "pa"
        }
        const result = await api.post('/api/users').send(newUser).expect(400)
        expect(result.body.error).toBe('Password length too short must be greater than 3')
    })

    test('Only unique users', async () => {
        const newUser = {
            username: "aldojack",
            name: "John Doe",
            password: "beansandtoast"
        }
        const result = await api.post('/api/users').send(newUser).expect(400)
        expect(result.body.error).toBe('expected `username` to be unique')

    })
})

afterAll(async () => {
    await mongoose.connection.close()
})