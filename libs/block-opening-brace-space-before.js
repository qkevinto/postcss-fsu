function blockOpeningBraceSpaceBefore(root) {
  root.walkRules(rule => {
    rule.raws.between = ' ';
  });
}

module.exports = blockOpeningBraceSpaceBefore;