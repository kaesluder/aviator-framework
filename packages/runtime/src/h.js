import { withoutNulls } from './utils/arrays.js';

/**
 * Constants defining the types of virtual DOM nodes.
 * These types are used to identify what kind of virtual node is being processed.
 * 
 * @readonly
 * @enum {string}
 * @property {string} TEXT - Represents a text node containing only text content
 * @property {string} ELEMENT - Represents an HTML element with tag, props, and children
 * @property {string} FRAGMENT - Represents a collection of nodes without a parent wrapper
 */
export const DOM_TYPES = {
  TEXT: 'text',
  ELEMENT: 'element',
  FRAGMENT: 'fragment',
};

/**
 * Creates a virtual DOM element node (hyperscript function).
 * This is the main function for creating virtual representations of HTML elements.
 * String children are automatically converted to text nodes, and null values are filtered out.
 * 
 * @param {string} tag - The HTML tag name (e.g., 'div', 'p', 'button')
 * @param {Object} [props={}] - Element properties including attributes and event handlers
 * @param {Array} [children=[]] - Array of child nodes (strings, virtual nodes, or null)
 * @returns {Object} Virtual element node with type, tag, props, and children properties
 * 
 * @example
 * // Create a simple div
 * h('div', { class: 'container' }, ['Hello World'])
 * 
 * @example
 * // Create a button with click handler
 * h('button', { on: { click: handleClick } }, ['Click me'])
 */
export function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
};


/**
 * Creates a virtual DOM text node from a string.
 * Text nodes represent plain text content that will be rendered as text in the DOM.
 * 
 * @param {string} str - The text content for the node
 * @returns {Object} Virtual text node with type and value properties
 * 
 * @example
 * // Create a text node
 * hString('Hello World')
 * // Returns: { type: 'text', value: 'Hello World' }
 */
export function hString(str) {
  return { type: DOM_TYPES.TEXT, value: str };
};

/**
 * Maps an array of children, converting string values to text virtual nodes.
 * This is an internal utility function used by h() and hFragment() to automatically
 * convert string children to proper virtual text nodes.
 * 
 * @param {Array} children - Array of child nodes (strings, virtual nodes, etc.)
 * @returns {Array} Array with string children converted to virtual text nodes
 * 
 * @example
 * // Internal usage - converts strings to text nodes
 * mapTextNodes(['Hello', vNode, 'World'])
 * // Returns: [{ type: 'text', value: 'Hello' }, vNode, { type: 'text', value: 'World' }]
 */
function mapTextNodes(children) {
  return children.map((child) =>
    typeof child === 'string' ? hString(child) : child
  );
};

/**
 * Creates a virtual DOM fragment node to group multiple nodes without a wrapper element.
 * Fragments are useful when you need to return multiple elements from a component
 * without adding an extra parent element to the DOM.
 * 
 * @param {Array} vNodes - Array of virtual nodes to group together
 * @returns {Object} Virtual fragment node with type and children properties
 * 
 * @example
 * // Group multiple elements without a wrapper
 * hFragment([
 *   h('h1', {}, ['Title']),
 *   h('p', {}, ['Description'])
 * ])
 * 
 * @example
 * // Fragment with mixed content types
 * hFragment(['Some text', h('span', {}, ['Bold text'])])
 */
export function hFragment(vNodes) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  }
}
