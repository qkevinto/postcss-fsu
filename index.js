const postcss = require('postcss');
const indentation = require('./libs/indentation.js');
const utils = require('./libs/utils.js');
 
const fsu = postcss.plugin('fsu', function fsu(options) {
  return root => {
    if (options.modules.indexOf('indentation') > -1) {
      indentation(root, options.indentation);
    }
  }
});

module.exports = fsu;