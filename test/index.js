const test = require('tape');
const postcss = require('postcss');
const less = require('postcss-less');
const indent = require('../index.js');
const fs = require('fs');
const path = require('path');

function testFixture(test) {
  return fs.readFileSync(
    path.join(__dirname, 'fixtures', test, 'test.css'), 'utf-8');
}

function expectFixture(test) {
  return fs.readFileSync(
    path.join(__dirname, 'fixtures', test, 'expect.css'), 'utf-8'); 
}

test('Indent nested rules', t => {
  t.plan(1);

  postcss([
    indent({
      amount: 2,
      type: 'spaces'
    })
  ])
  .process(testFixture('nested-rules'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, expectFixture('nested-rules'));
  });
});

test('Indent less mixins', t => {
  t.plan(1);

  postcss([
    indent({
      amount: 2,
      type: 'spaces'
    })
  ])
  .process(testFixture('less-mixins'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, expectFixture('less-mixins'));
  });
});

test('Indent less variables', t => {
  t.plan(1);

  postcss([
    indent({
      amount: 2,
      type: 'spaces'
    })
  ])
  .process(testFixture('less-variables'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, expectFixture('less-variables'));
  });
});

test('Indent declarations', t => {
  t.plan(1);

  postcss([
    indent({
      amount: 2,
      type: 'spaces'
    })
  ])
  .process(testFixture('declarations'))
  .then(result => {
    t.equal(result.css, expectFixture('declarations'));
  });
});

test('Indent comments', t => {
  t.plan(1);

  postcss([
    indent({
      amount: 2,
      type: 'spaces'
    })
  ])
  .process(testFixture('comments'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, expectFixture('comments'));
  });
});

test('Indent @rules', t => {
  t.plan(1);

  postcss([
    indent({
      amount: 2,
      type: 'spaces'
    })
  ])
  .process(testFixture('at-rules'))
  .then(result => {
    t.equal(result.css, expectFixture('at-rules'));
  });
});