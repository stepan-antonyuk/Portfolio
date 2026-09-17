/**
 * Convert a virtual DOM node (vNode) into a real DOM node.
 *
 * @param {Object|string} vNode - A virtual DOM node. Either:
 *   - string → represents a text node
 *   - object → { type: string, props: Object, children: Array }
 * @returns {Node} A real DOM Node (Element or Text)
 */
function createTree(vnode) {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  const el = document.createElement(vnode.type);

  // set attributes
  for (const [key, value] of Object.entries(vnode.props || {})) {
    el.setAttribute(key, value);
  }

  // recursively create children
  (vnode.children || []).forEach(child => {
    el.appendChild(createTree(child));
  });

  return el;
}

/**
 * Diff two virtual DOM nodes and update the real DOM node accordingly.
 * @param {Object|string|null} oldVNode - Previous vDOM node.
 * @param {Object|string|null} newVNode - New vDOM node.
 * @param {Node|null} parentNode - parent of Real DOM node corresponding to oldVNode.
 * @param {number} index - Position of the node within parentNode.
 */
function diff(oldVNode, newVNode, parentNode, index) {

  // You may have to use some of these: appendChild(), removeChild(), 
  // replaceChild(), removeAttribute(), getAttribute(), textContent, childNodes[]

  // Case 1: both are text (string), but may be different

  // Case 2: oldVnode is nullish -> append new node to parent
  

  // Case 3: newVnode is nullish -> remove
 

  // Case 4: Node type changed -> replace
 

  // Case 5: Update attributes


    // remove old attributes not in new
  

    // add/update new attributes
 

  // Recursively diff children
  
}
