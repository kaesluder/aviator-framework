import { describe, test, expect } from 'vitest'
import { h, hString, hFragment, DOM_TYPES } from '../h.js'

describe('h function', () => {
  test('should create a basic element with default props and children', () => {
    const result = h('div')
    
    expect(result).toEqual({
      tag: 'div',
      props: {},
      children: [],
      type: DOM_TYPES.ELEMENT
    })
  })

  test('should create element with specified tag', () => {
    const tags = ['div', 'span', 'p', 'button', 'input', 'h1', 'h2', 'ul', 'li']
    
    tags.forEach(tag => {
      const result = h(tag)
      expect(result.tag).toBe(tag)
      expect(result.type).toBe(DOM_TYPES.ELEMENT)
    })
  })

  test('should create element with props', () => {
    const props = { 
      class: 'container',
      id: 'main',
      'data-test': 'value'
    }
    const result = h('div', props)
    
    expect(result.props).toEqual(props)
  })
})

describe('hString function', () => {
  test('should create a text node with string value', () => {
    const result = hString('Hello World')
    
    expect(result).toEqual({
      type: DOM_TYPES.TEXT,
      value: 'Hello World'
    })
  })

  test('should create a text node with empty string', () => {
    const result = hString('')
    
    expect(result).toEqual({
      type: DOM_TYPES.TEXT,
      value: ''
    })
  })

  test('should create a text node with numeric string', () => {
    const result = hString('123')
    
    expect(result).toEqual({
      type: DOM_TYPES.TEXT,
      value: '123'
    })
  })
})

describe('hFragment function', () => {
  test('should create a fragment with virtual nodes', () => {
    const child1 = h('div', {}, ['Hello'])
    const child2 = h('span', {}, ['World'])
    const result = hFragment([child1, child2])
    
    expect(result).toEqual({
      type: DOM_TYPES.FRAGMENT,
      children: [child1, child2]
    })
  })

  test('should create a fragment with string children converted to text nodes', () => {
    const result = hFragment(['Hello', 'World'])
    
    expect(result).toEqual({
      type: DOM_TYPES.FRAGMENT,
      children: [
        { type: DOM_TYPES.TEXT, value: 'Hello' },
        { type: DOM_TYPES.TEXT, value: 'World' }
      ]
    })
  })

  test('should create an empty fragment', () => {
    const result = hFragment([])
    
    expect(result).toEqual({
      type: DOM_TYPES.FRAGMENT,
      children: []
    })
  })
})