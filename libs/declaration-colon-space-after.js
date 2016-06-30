function declarationColonSpaceAfter(root) {
  root.walkDecls(decls => {
    decls.raws.between = decls.raws.between.trim() + ' ';
  });
}

module.exports = declarationColonSpaceAfter;