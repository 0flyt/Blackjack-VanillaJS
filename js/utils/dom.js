export function elt(type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child != 'string') node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}
