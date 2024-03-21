const jwt = require('jsonwebtoken')

function blogErrorHandling(error, request, response, next) {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  else {
    console.log(error.name)
    console.log(error.message)
    console.log(error);
    return response.status(400).json({ error: error.message });
  }
}

const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  request.user = decodedToken.id
  next()
}

module.exports = { blogErrorHandling, getTokenFrom, userExtractor }