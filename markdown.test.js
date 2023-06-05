const assert = require('node:assert');
const { describe, it } = require('node:test');
const { generateFileReport } = require('./markdown');

describe('generateFileReport', () => {
  it('returns the correct markdown', () => {

    const diff = [
      {
        oldValue: { a: 1, b: 2 },
        newValue: { a: 1, b: 3 },
      },
      {
        oldValue: { a: 3, b: 4 },
        newValue: { a: 3, b: 4 },
      },
    ];

    const expected = '\n### test.js\n<table>\n<thead>\n  <tr>\n    <th>b</th>\n  </tr>\n</thead>\n<tr><td>\n\n```diff\n+3\n```\n\n</td></tr><tr><td>\n\n```diff\n+4\n```\n\n</td></tr>\n<tr><td>\n\n```diff\n-2\n```\n\n</td></tr><tr><td>\n\n```diff\n-4\n```\n\n</td></tr><tr><td>\n\n```diff\n-3\n```\n\n</td></tr>\n<tr><td>\n\n1\n\n</td><td>\n\n```diff \n-2 \n+3\n```\n\n</td></tr><tr><td>\n\n3\n\n</td><td>\n\n4\n\n</td></tr>\n</table>\n';

    const actual = generateFileReport({
      file: 'test.js',
      additions: [{ b: 3 }, { b: 4 }],
      removals: [{ b: 2 }, { b: 4 }, { a: 3 }],
      changes: diff,
    });

    assert.strictEqual(actual, expected);
  });
});
