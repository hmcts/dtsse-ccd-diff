#!/usr/bin/env node

const { generateFileReport } = require('./markdown');
const { getDiff } = require('./diff');
const { resolveFiles } = require('./fs');

const fileFieldId = {
  '**/AuthorisationCaseState.json': field => `${field.CaseStateID}:${field.AccessProfile || field.UserRole}`,
  '**/AuthorisationCaseType.json': field => field.AccessProfile || field.UserRole,
  '**/CaseField.json': field => field.ID,
  '**/CaseRoles.json': field => field.ID,
  '**/SearchInputFields.json': field => field.CaseFieldID,
  '**/SearchResultFields.json': field => field.CaseFieldID,
  'State.json': field => field.ID,
  'State/State.json': field => field.ID,
  '**/WorkBasketInputFields.json': field => field.CaseFieldID,
  '**/WorkBasketResultFields.json': field => field.CaseFieldID,
  '**/AuthorisationCaseEvent.json': field => `${field.CaseEventID}:${field.AccessProfile || field.UserRole}`,
  'AuthorisationCaseField/*.json': field => `${field.CaseFieldID}:${field.AccessProfile || field.UserRole}`,
  'CaseEvent/*.json': field => field.ID,
  'ComplexTypes/*.json': field => `${field.ID}:${field.ListElementCode}`,
  'CaseEventToFields/*.json': field => `${field.CaseFieldID}:${field.CaseEventID}`,
  'CaseTypeTab/*.json': field => `${field.TabID}:${field.CaseFieldID}:${field.AccessProfile || field.UserRole}`,
  'FixedLists/*.json': field => `${field.ID}:${field.ListElementCode}`
};

const output = Object
  .entries(fileFieldId)
  .flatMap(resolveFiles)
  .map(getDiff)
  .filter(diff => diff.additions.length + diff.removals.length + diff.changes.length > 0)
  .map(generateFileReport)
  .join('');

const githubCommentMaxLength = 65400;

if (output === '') {
  console.log('No change');
} else if (output.length > githubCommentMaxLength) {
  const trimmedOutput = output.slice(0, githubCommentMaxLength - 40) + '...Output too long for GitHub PR';
  console.log(trimmedOutput);
} else {
  console.log(output);
}

