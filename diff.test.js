const { getDiff } = require('./diff');
const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('getDiff', () => {
  it('returns the correct diff', () => {
    const filename = 'test.js';
    const masterDef = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ];
    const branchDef = [
      { a: 1, b: 2 },
      { a: 5, b: 4 },
    ];
    const getFieldId = item => item.a;

    const expected = {
      file: filename,
      changes: [],
      additions: [{ b: 4, a: 5  }],
      removals: [{ b: 4, a: 3 }]
    };

    const actual = getDiff([filename, masterDef, branchDef, getFieldId]);

    assert.deepEqual(actual, expected);
  });

  it('handles blacklisted keys correctly', () => {
    const filename = 'test.js';
    const masterDef = [
      { a: 1, b: 2, LiveFrom: '2022-01-01', SecurityClassification: 'Restricted' },
      { a: 3, b: 4, LiveFrom: '2022-01-01', SecurityClassification: 'Restricted' },
    ];
    const branchDef = [
      { a: 1, b: 2, LiveFrom: '2022-01-01', SecurityClassification: 'Restricted' },
      { a: 5, b: 4, LiveFrom: '2022-01-01', SecurityClassification: 'Restricted' },
    ];
    const getFieldId = item => item.a;

    const expected = {
      file: filename,
      changes: [],
      additions: [{ b: 4, a: 5  }],
      removals: [{ b: 4, a: 3 }]
    };

    const actual = getDiff([filename, masterDef, branchDef, getFieldId]);

    assert.deepEqual(actual, expected);
  });
});
