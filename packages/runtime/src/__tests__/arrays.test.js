import { describe, test, expect } from 'vitest'
import { withoutNulls } from '../utils/arrays.js'
import {
  threeObjects,
  oneObject,
  emptyArray,
  threeWithNull,
  threeWithUndefined,
  mixedNullsAndUndefined,
  allNullsAndUndefined,
  falsyButValidValues
} from './fixtures/arrays-fixtures.js'

describe('withoutNulls', () => {
  test('should return array unchanged when no null values present (3 objects)', () => {
    const result = withoutNulls(threeObjects)
    
    expect(result).toEqual(threeObjects)
    expect(result).toHaveLength(3)
    expect(result).not.toBe(threeObjects) // should return new array
  })

  test('should return array unchanged when no null values present (1 object)', () => {
    const result = withoutNulls(oneObject)
    
    expect(result).toEqual(oneObject)
    expect(result).toHaveLength(1)
    expect(result).not.toBe(oneObject) // should return new array
  })

  test('should return empty array when input is empty (0 objects)', () => {
    const result = withoutNulls(emptyArray)
    
    expect(result).toEqual([])
    expect(result).toHaveLength(0)
    expect(result).not.toBe(emptyArray) // should return new array
  })

  test('should filter out null values (3 objects with null)', () => {
    const result = withoutNulls(threeWithNull)
    
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual(threeWithNull[0]) // button element
    expect(result[1]).toEqual(threeWithNull[2]) // text node
    expect(result.every(item => item !== null)).toBe(true)
  })

  test('should filter out undefined values (3 objects with undefined)', () => {
    const result = withoutNulls(threeWithUndefined)
    
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual(threeWithUndefined[0]) // input element
    expect(result[1]).toEqual(threeWithUndefined[2]) // fragment
    expect(result.every(item => item !== undefined)).toBe(true)
  })

  test('should filter out both null and undefined values', () => {
    const result = withoutNulls(mixedNullsAndUndefined)
    
    expect(result).toHaveLength(3)
    expect(result[0]).toEqual(mixedNullsAndUndefined[0]) // h1 element
    expect(result[1]).toEqual(mixedNullsAndUndefined[2]) // text node
    expect(result[2]).toEqual(mixedNullsAndUndefined[4]) // footer element
    expect(result.every(item => item != null)).toBe(true)
  })

  test('should return empty array when all values are null or undefined', () => {
    const result = withoutNulls(allNullsAndUndefined)
    
    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })

  test('should preserve falsy values that are not null or undefined', () => {
    const result = withoutNulls(falsyButValidValues)
    
    expect(result).toHaveLength(5) // 0, '', false, empty text node, empty div element
    expect(result).toContain(0)
    expect(result).toContain('')
    expect(result).toContain(false)
    
    // Check that virtual DOM nodes with falsy content are preserved
    const textNode = result.find(item => item?.type === 'text' && item?.value === '')
    expect(textNode).toBeDefined()
    
    const emptyElement = result.find(item => item?.type === 'element' && item?.tag === 'div')
    expect(emptyElement).toBeDefined()
    
    // Ensure null and undefined were filtered out
    expect(result).not.toContain(null)
    expect(result).not.toContain(undefined)
  })

  test('should preserve virtual DOM node structure', () => {
    const result = withoutNulls(threeObjects)
    
    // Check element node structure
    const elementNode = result[0]
    expect(elementNode).toHaveProperty('tag', 'div')
    expect(elementNode).toHaveProperty('props')
    expect(elementNode).toHaveProperty('children')
    expect(elementNode).toHaveProperty('type', 'element')
    
    // Check text node structure
    const textNode = result[1]
    expect(textNode).toHaveProperty('type', 'text')
    expect(textNode).toHaveProperty('value', 'Hello world')
  })
})