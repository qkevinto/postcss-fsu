const test = require('tape');
const postcss = require('postcss');
const less = require('postcss-less');
const fsu = require('../../index.js');
const loadFixtures = require('../loadFixtures.js');

const options = {
  modules: ['indentation'],
  indent: {
    amount: 2,
    type: 'spaces'
  }
};

test('Indent nested rules', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'nested-rules'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'nested-rules'));
  });
});

test('Indent less mixins', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'less-mixins'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'less-mixins'));
  });
});

test('Indent less variables', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'less-variables'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'less-variables'));
  });
});

test('Indent declarations', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'declarations'))
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'declarations'));
  });
});

test('Indent single line comments', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'single-line-comments'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'single-line-comments'));
  });
});

test('Indent multiline comments', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'mutiline-comments'), {
    syntax: less
  })
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'mutiline-comments'));
  });
});

test('Indent @rules', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'at-rules'))
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'at-rules'));
  });
});