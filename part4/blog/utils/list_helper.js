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
    console.log(likesCount);
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

    console.log(result);
    return result
    
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}