/**
 * Get indentation of node
 * @param  {Node}   node       Node to determine identation level
 * @param  {String} indentChar Character used for indentation
 * @return {String}            Indentation string
 */
function getIndentation(node, indentChar, amount) {
  return indentChar.repeat(getNestedDepth(node) * amount);
}

/**
 * Get depth of a nested node
 * @param  {Node}   node    Node to determine nested depth
 * @param  {Number} [depth] Current depth of nesting
 * @return {Number}         Depth of indentation
 */
function getNestedDepth(node, depth) {
  depth = depth || 0;

  if (node.parent.type !== 'root') {
    return getNestedDepth(node.parent, depth + 1);
  } else {
    return depth;
  }
}

module.exports = {
  getNestedDepth: getNestedDepth,
  getIndentation: getIndentation
}