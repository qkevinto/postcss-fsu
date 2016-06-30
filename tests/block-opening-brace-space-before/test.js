const test = require('tape');
const postcss = require('postcss');
const fsu = require('../../index.js');
const loadFixtures = require('../loadFixtures.js');

const options = {
  modules: ['block-opening-brace-space-before']
};

test('Add a space before {', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'no-space'))
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'no-space'));
  });
});

test('Remove extra spaces before {', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'many-spaces'))
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'many-spaces'));
  });
});