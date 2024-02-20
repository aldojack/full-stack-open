const Blog = require('../model/blog')

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

const mostBlogs = (blogs) => {
    //Take in array of blogs as parameter
    //Find which author has the most amount of blogs
    //Return object with author name and number of blogs
    // Create an object to store author counts
    if (blogs.length <= 0) return 'No blogs'

    const authorCounts = {};

    // Iterate over each blog
    blogs.forEach(blog => {
        const author = blog.author;
        // Increment the count for the author
        authorCounts[author] = (authorCounts[author] || 0) + 1;
    });

    // Find the author with the most blogs
    let maxAuthor = '';
    let maxCount = 0;
    for (const author in authorCounts) {
        if (authorCounts[author] > maxCount) {
            maxAuthor = author;
            maxCount = authorCounts[author];
        }
    }

    // Return object with author name and number of blogs
    return {
        author: maxAuthor,
        blogs: maxCount
    };
    
}

const mostLikes = (blogs) => {
    if (blogs.length <= 0) return 'No blogs'

    const likesCount = {};

    // Iterate over each blog
    blogs.forEach(blog => {
        const author = blog.author;
        // Increment the count for the author
        likesCount[author] = (likesCount[author] || 0) + blog.likes;
    });
    
    // Find the author with the most blogs
    let maxAuthor = '';
    let maxCount = 0;
    for (const author in likesCount) {
        if (likesCount[author] > maxCount) {
            maxAuthor = author;
            maxCount = likesCount[author];
        }
    }
    // Return object with author name and number of blogs
    const result = {
        author: maxAuthor,
        likes: maxCount
    };

    return result
    
}

const initialData = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    }  
  ]

  const getBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, initialData, getBlogs
}