const fs = require('fs');
const path = require('path');

function test(dirname, test) {
  return fs.readFileSync(
    path.join(dirname, 'fixtures', test, 'test.css'), 'utf-8');
}

function expect(dirname, test) {
  return fs.readFileSync(
    path.join(dirname, 'fixtures', test, 'expect.css'), 'utf-8'); 
}

module.exports = {
  test: test,
  expect: expect
}