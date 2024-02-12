const listHelper = require('../utils/list_helper')
const data = require('../utils/stub_data')

test('dummy returns one', () => {
  const result = listHelper.dummy(data.listWithZero)
  expect(result).toBe(1)
})

describe('total likes', () => {


    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(data.listWithZero)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        
        const result = listHelper.totalLikes(data.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(data.listWithMultipleBlogs)
        expect(result).toBe(36)
    })
})

describe('most liked blog', () => {

    test('most liked blog from list of blogs', () => {
      const result = listHelper.favoriteBlog(data.listWithMultipleBlogs)
      expect(result).toEqual(data.listWithMultipleBlogs[2])
    })

    test('most liked blog from list of 1', () => {
        const result = listHelper.favoriteBlog(data.listWithOneBlog)
        expect(result).toEqual(data.listWithOneBlog[0])
      })

      test('most liked blog from empty list', () => {
        const result = listHelper.favoriteBlog(data.listWithZero)
        expect(result).toBe('No blogs')
      })

})

describe('most blogs', () => {

  test('author with most blogs from list of blogs', () => {
    const result = listHelper.mostBlogs(data.listWithMultipleBlogs)
    console.log(result);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })

  test('author with most blogs from list of 1', () => {
      const result = listHelper.mostBlogs(data.listWithOneBlog)
      console.log(result);
      expect(result).toEqual(    {
        author: 'Edsger W. Dijkstra',
        blogs: 1,
      })
    })

    test('author with most blogs from empty list', () => {
      const result = listHelper.mostBlogs(data.listWithZero)
      console.log(result);
      expect(result).toBe('No blogs')
    })

})

describe('most likes', () => {

  test('author with most likes from list of blogs', () => {
    const result = listHelper.mostLikes(data.listWithMultipleBlogs)
    console.log(result);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

  test('author with most blogs from list of 1', () => {
      const result = listHelper.mostLikes(data.listWithOneBlog)
      console.log(result);
      expect(result).toEqual(    {
        author: 'Edsger W. Dijkstra',
        likes: 5,
      })
    })

    test('author with most blogs from empty list', () => {
      const result = listHelper.mostLikes(data.listWithZero)
      console.log(result);
      expect(result).toBe('No blogs')
    })

})