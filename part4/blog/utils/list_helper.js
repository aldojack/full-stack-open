const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length <= 0) return 0

    let totalLikes = 0

    blogs.forEach(blog => {
        totalLikes += blog.likes
    })

    return totalLikes
}

const favoriteBlog = (blogs) => {
    if (blogs.length <= 0) return 'No blogs'
    return blogs.reduce((fav, blog) => fav.likes > blog.likes ? fav : blog)
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}