function blogErrorHandling(error, request, response, next){
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
      } else{
        return response.status(400).json({ error: error.message });
      }
}

module.exports = {blogErrorHandling}