const test = require('tape');
const postcss = require('postcss');
const fsu = require('../../index.js');
const loadFixtures = require('../loadFixtures.js');

const options = {
  modules: ['declaration-colon-space-after']
};

test('Add a space after declarations colon', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'no-space'))
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'no-space'));
  });
});

test('Remove extra spaces after declarations colon', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'many-spaces'))
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'many-spaces'));
  });
});

test('Replace tabs after declarations colon and replace with single space', t => {
  t.plan(1);

  postcss([
    fsu(options)
  ])
  .process(loadFixtures.test(__dirname, 'tabs'))
  .then(result => {
    t.equal(result.css, loadFixtures.expect(__dirname, 'tabs'));
  });
});