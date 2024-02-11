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

  test('most liked blog', () => {
    const result = listHelper.favoriteBlog(data.listWithMultipleBlogs)
    expect(result).toEqual(data.listWithMultipleBlogs[2])
  })