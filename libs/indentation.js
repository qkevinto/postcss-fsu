const postcss = require('postcss');
const utils = require('./utils.js');
 
function indentation(root, options) {
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

  root.walkRules(rule => {
    rule.raws.before = rule.raws.before.replace(/ /g, '') +
      utils.getIndentation(rule, options.indentChar, options.amount);

    if (!rule.ruleWithoutBody) {
      rule.raws.after = rule.raws.after.replace(/ /g, '') +
        utils.getIndentation(rule, options.indentChar, options.amount);
    }
  });

  root.walkDecls(decls => {
    decls.raws.before = decls.raws.before.replace(/ /g, '') +
      utils.getIndentation(decls, options.indentChar, options.amount);
  });

  root.walkComments(comment => {
    comment.raws.before = comment.raws.before.replace(/ /g, '') +
      utils.getIndentation(comment, options.indentChar, options.amount);

    // If this is a docblock style comment, 
    if (comment.raws.content.match(/^((\/\*\*)|(\/\*\n))/)) {
      comment.raws.left = '';
      comment.raws.right = '\n ' +
        utils.getIndentation(comment, options.indentChar, options.amount);

      var docBlockLines = comment.text.split('\n').map((line, index) => {
        if (index !== 0 || !comment.raws.content.match(/^(\/\*\*)/)) {
          return utils.getIndentation(
            comment, options.indentChar, options.amount) + ' ' + line.trim();
        } else {
          return line;
        }
      });

      if (!comment.raws.content.match(/^(\/\*\*)/)) {
        docBlockLines[0] = '\n' + docBlockLines[0];
      }

      comment.text = docBlockLines.join('\n');
    }
  });

  root.walkAtRules(atRule => {
    atRule.raws.before = atRule.raws.before.replace(/ /g, '') +
      utils.getIndentation(atRule, options.indentChar, options.amount);
    atRule.raws.after = atRule.raws.before.replace(/ /g, '') +
      utils.getIndentation(atRule, options.indentChar, options.amount);
  });
}

module.exports = indentation;