import { DOM_TYPES } from '../../h.js'

// Test fixtures for withoutNulls function using virtual DOM node formats

export const threeObjects = [
  {
    tag: 'div',
    props: { class: 'container' },
    children: [],
    type: DOM_TYPES.ELEMENT,
  },
  {
    type: DOM_TYPES.TEXT,
    value: 'Hello world'
  },
  {
    tag: 'span',
    props: {},
    children: [
      {
        type: DOM_TYPES.TEXT,
        value: 'Nested text'
      }
    ],
    type: DOM_TYPES.ELEMENT,
  }
]

export const oneObject = [
  {
    type: DOM_TYPES.FRAGMENT,
    children: [
      {
        type: DOM_TYPES.TEXT,
        value: 'Fragment content'
      }
    ]
  }
]

export const emptyArray = []

export const threeWithNull = [
  {
    tag: 'button',
    props: { disabled: true },
    children: [
      {
        type: DOM_TYPES.TEXT,
        value: 'Click me'
      }
    ],
    type: DOM_TYPES.ELEMENT,
  },
  null,
  {
    type: DOM_TYPES.TEXT,
    value: 'After null'
  }
]

export const threeWithUndefined = [
  {
    tag: 'input',
    props: { type: 'text', name: 'username' },
    children: [],
    type: DOM_TYPES.ELEMENT,
  },
  undefined,
  {
    type: DOM_TYPES.FRAGMENT,
    children: [
      {
        tag: 'p',
        props: {},
        children: [
          {
            type: DOM_TYPES.TEXT,
            value: 'Paragraph text'
          }
        ],
        type: DOM_TYPES.ELEMENT,
      }
    ]
  }
]

export const mixedNullsAndUndefined = [
  {
    tag: 'h1',
    props: { id: 'title' },
    children: [
      {
        type: DOM_TYPES.TEXT,
        value: 'Main Title'
      }
    ],
    type: DOM_TYPES.ELEMENT,
  },
  null,
  {
    type: DOM_TYPES.TEXT,
    value: 'Some text'
  },
  undefined,
  {
    tag: 'footer',
    props: { class: 'page-footer' },
    children: [],
    type: DOM_TYPES.ELEMENT,
  }
]

export const allNullsAndUndefined = [null, undefined, null, undefined]

export const falsyButValidValues = [
  0,
  '',
  false,
  null,
  undefined,
  {
    type: DOM_TYPES.TEXT,
    value: ''
  },
  {
    tag: 'div',
    props: {},
    children: [],
    type: DOM_TYPES.ELEMENT,
  }
]