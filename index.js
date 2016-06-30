const postcss = require('postcss');
const indentation = require('./libs/indentation.js');
const utils = require('./libs/utils.js');
const declarationColonSpaceAfter =
  require('./libs/declaration-colon-space-after');
const blockOpeningBraceSpaceBefore =
  require('./libs/block-opening-brace-space-before');
 
const fsu = postcss.plugin('fsu', function fsu(options) {
  return root => {
    if (options.modules.indexOf('indentation') > -1) {
      indentation(root, options.indentation);
    }

    if (options.modules.indexOf('declaration-colon-space-after') > -1) {
      declarationColonSpaceAfter(root);
    }

    if (options.modules.indexOf('block-opening-brace-space-before') > -1) {
      blockOpeningBraceSpaceBefore(root);
    }
  }
});

module.exports = fsu;