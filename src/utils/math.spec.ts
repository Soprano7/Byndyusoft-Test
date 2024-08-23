import { add, div } from './math'


describe('add', () => {
  it('return sum of two numbers correctly', () => {
    // 3A
    // Arrange
    const num1 = 1
    const num2 = 2

    // act
    const result = add(num1, num2)

    // assert
    expect(result).toBe(3)
  })
})

describe('div', () => {
  it('return division of two numbers correctly', () => {
    // 3A
    // Arrange
    const num1 = 1
    const num2 = 2

    // act
    const result = add(num1, num2)

    // assert
    expect(result).toBe(3)
  })
})