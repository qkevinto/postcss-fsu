const postcss = require('postcss');
 
module.exports = postcss.plugin('indent', function indent(options) {
  return css => {
    options = Object.assign({
        type: 'spaces',
        amount: 2
      }, options
    );

    // Determine type of indentation
    if (options.type === 'spaces') {
      options.indentChar = ' ';
    } else if (options.type === 'tabs') {
      options.indentChar = '\t';
    } else {
      throw new TypeError('Invalid indentation type, expected \'spaces\' or ' +
        `\'tabs\', instead got \'${options.type}\'`);
    }

    /**
     * Get indentation of node
     * @param  {Node}   node       Node to determine identation level
     * @param  {String} indentChar Character used for indentation
     * @return {String}            Indentation string
     */
    function getIndentation(node, indentChar) {
      return indentChar.repeat(getNestedDepth(node) * options.amount);
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
    
    css.walkRules(rule => {
      rule.raws.before = rule.raws.before.replace(/ /g, '') +
        getIndentation(rule, options.indentChar);

      if (!rule.ruleWithoutBody) {
        rule.raws.after = rule.raws.after.replace(/ /g, '') +
          getIndentation(rule, options.indentChar);
      }
    });

    css.walkDecls(decls => {
      decls.raws.before = decls.raws.before.replace(/ /g, '') +
        getIndentation(decls, options.indentChar);
    });

    css.walkComments(comment => {
      // If this is a docblock style comment, then ensure postcss doesn't
      // automatically add a space on the left.
      if (comment.raws.content.match(/^(\/\*\*)/)) {
        comment.raws.left = '';
      }
      comment.raws.before = comment.raws.before.replace(/ /g, '') +
        getIndentation(comment, options.indentChar);
    });

    css.walkAtRules(atRule => {
      atRule.raws.before = atRule.raws.before.replace(/ /g, '') +
        getIndentation(atRule, options.indentChar);
      atRule.raws.after = atRule.raws.before.replace(/ /g, '') +
        getIndentation(atRule, options.indentChar);
    });
  }
});