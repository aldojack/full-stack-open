const usersRouter = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = new User({username, name, hashedPassword})
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter