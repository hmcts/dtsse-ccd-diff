const assert = require('node:assert');
const { describe, it } = require('node:test');

process.argv = ['node', 'fs.test.js', '.', '.github/workflows'];

const { resolveFiles } = require('./fs');

describe('resolveFiles', () => {
  it('returns files in the base branch', () => {
    const file = 'fs.js';
    const getFieldId = item => item.a;

    const actual = resolveFiles([file, getFieldId]);

    assert.match(actual[0][0], /.*fs.js/);
    assert.notDeepEqual(actual[0][1], []);
    assert.deepEqual(actual[0][2], []);
  });

  it('returns files in the target branch', () => {
    const file = 'renovate.json';
    const getFieldId = item => item.a;

    const actual = resolveFiles([file, getFieldId]);

    assert.match(actual[0][0], /.*renovate.json/);
    assert.deepEqual(actual[0][1], []);
    assert.notDeepEqual(actual[0][2], []);
  });
});
