const usersRouter = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    let { username, name, password } = request.body
    username = username.replace(/\s+/g, '');
    
    if (password.length < 3) {
        return response.status(400).json({
            error: 'Password length too short must be greater than 3'
        })
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = new User({ username, name, hashedPassword })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter