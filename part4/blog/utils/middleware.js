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

module.exports = { blogErrorHandling }