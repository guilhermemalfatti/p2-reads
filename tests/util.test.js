const defineColor = require('../src/util');

test('Define color green', () => {
  expect(defineColor(3)).toBe('green');
});

test('Define color yellow', () => {
  expect(defineColor(1)).toBe('yellow');
});

test('Define color red', () => {
  expect(defineColor(-3)).toBe('red');
});