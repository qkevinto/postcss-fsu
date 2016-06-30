const test = require('tape');
const postcss = require('postcss');
const less = require('postcss-less');
const fsu = require('../index.js');
const fs = require('fs');
const path = require('path');

const indentOptions = {
  modules: ['indentation'],
  indent: {
    amount: 2,
    type: 'spaces'
  }
}

function testFixture(module, test) {
  return fs.readFileSync(
    path.join(__dirname, 'fixtures', module, test, 'test.css'), 'utf-8');
}

function expectFixture(module, test) {
  return fs.readFileSync(
    path.join(__dirname, 'fixtures', module, test, 'expect.css'), 'utf-8'); 
}

test('Indent nested rules', t => {
  t.plan(1);

  postcss([
    fsu(indentOptions)
  ])
  .process(testFixture('indentation', 'nested-rules'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, expectFixture('indentation', 'nested-rules'));
  });
});

test('Indent less mixins', t => {
  t.plan(1);

  postcss([
    fsu(indentOptions)
  ])
  .process(testFixture('indentation', 'less-mixins'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, expectFixture('indentation', 'less-mixins'));
  });
});

test('Indent less variables', t => {
  t.plan(1);

  postcss([
    fsu(indentOptions)
  ])
  .process(testFixture('indentation', 'less-variables'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, expectFixture('indentation', 'less-variables'));
  });
});

test('Indent declarations', t => {
  t.plan(1);

  postcss([
    fsu(indentOptions)
  ])
  .process(testFixture('indentation', 'declarations'))
  .then(result => {
    t.equal(result.css, expectFixture('indentation', 'declarations'));
  });
});

test('Indent single line comments', t => {
  t.plan(1);

  postcss([
    fsu(indentOptions)
  ])
  .process(testFixture('indentation', 'single-line-comments'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, expectFixture('indentation', 'single-line-comments'));
  });
});

test('Indent multiline comments', t => {
  t.plan(1);

  postcss([
    fsu(indentOptions)
  ])
  .process(testFixture('indentation', 'mutiline-comments'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, expectFixture('indentation', 'mutiline-comments'));
  });
});

test('Indent @rules', t => {
  t.plan(1);

  postcss([
    fsu(indentOptions)
  ])
  .process(testFixture('indentation', 'at-rules'))
  .then(result => {
    t.equal(result.css, expectFixture('indentation', 'at-rules'));
  });
});