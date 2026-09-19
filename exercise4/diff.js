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
    let realNode = parentNode.childNodes[index];

    switch(true) {
        // Case 1: both are text (string), but may be different
        case typeof oldVNode === "string" && typeof newVNode === "string":
            if (oldVNode !== newVNode) {
                realNode.textContent = newVNode;
            }
            break;
        // Case 2: oldVnode is nullish -> append new node to parent
        case oldVNode == null:
            parentNode.appendChild(createTree(newVNode));
            return;
        // Case 3: newVnode is nullish -> remove
        case newVNode == null:
            parentNode.removeChild(realNode);
            return;
        // Case 4: Node type changed -> replace
        case oldVNode?.type !== newVNode?.type:
            realNode.replaceWith(createTree(newVNode));
            return;
        // Case 5: Update attributes
        default:
            // remove old attributes not in new
            for (let prop in oldVNode?.props) {
                if (!newVNode?.props[prop]) {
                    realNode.removeAttribute(prop);
                }
            }
            // add/update new attributes
            for (let prop in newVNode?.props) {
                realNode.setAttribute(prop, newVNode.props[prop]);
            }
    }

    // Recursively diff children
    let length = Math.max(oldVNode?.children?.length, newVNode?.children?.length);
    for (let i = 0; i < length; i++) {
        let newOldVNode = oldVNode.children[i];
        let newNewVNode = newVNode.children[i];
        let newParentNode = realNode;
        diff(newOldVNode, newNewVNode, newParentNode, i);
    }

}
