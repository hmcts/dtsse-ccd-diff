
const [_, __, arg1, arg2] = process.argv;
const masterDir = __dirname + '/' + arg1 + '/';
const branchDir = __dirname + '/' + arg2 + '/';

const fileFieldId = {
  'AuthorisationCaseState.json': field => `${field.CaseStateID}:${field.UserRole}`,
  'CaseField.json': field => field.ID
}

const groupBy = (values, getId) => values.reduce((result, value) => {
  result[getId(value)] = value;

  return result;
}, {});

const diffObject = (obj1, obj2) => {
  return Object
    .keys(obj1)
    .filter(key => obj1[key] !== obj2[key])
    .map(key => `${key} changed from ${obj1[key]} to ${obj2[key]}`)
};

const getAdditionsOrRemovals = diff => {
  const keys = Object.keys(diff[0] || []);
  const rows = diff.map(row => '|' + Object.values(row).join('|')).join('\n');

  return diff.length === 0 ? '' : `
|${keys.join('|')}
${rows}
`;
}

const generateFileReport = (file, { additions, removals, changes }) => {
  return `
# ${file}
## Additions
${getAdditionsOrRemovals(additions)}  
## Removals
${getAdditionsOrRemovals(removals)}  
## Changes
  `;
};

//```diff
// - text in red
// + text in green

for (const [file, getFieldId] of Object.entries(fileFieldId)) {
  const masterContent = require(masterDir + file);
  const branchContent = require(branchDir + file);

  const masterFields = groupBy(masterContent, getFieldId);
  const branchFields = groupBy(branchContent, getFieldId);
  const masterFieldKeys = Object.keys(masterFields);
  const branchFieldKeys = Object.keys(branchFields);

  const additions = branchFieldKeys.filter(key => !masterFields[key]).map(key => branchFields[key]);
  const removals = masterFieldKeys.filter(key => !branchFields[key]).map(key => masterFields[key]);
  const changes = masterFieldKeys
    .filter(key => branchFields[key])
    .map(key => [key, diffObject(masterFields[key], branchFields[key])])
    .filter(([key, changes]) => changes.length > 0)
    .map(([key, changes]) => key + ' changed: \n' + changes.join('\n'));

  console.log(generateFileReport(file, { additions, changes, removals }));
}

