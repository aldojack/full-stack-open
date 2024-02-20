const listHelper = require('../utils/list_helper')
const data = require('../utils/stub_data')

test('dummy returns one', () => {
  const result = listHelper.dummy(data.listWithZero)
  expect(result).toBe(1)
})