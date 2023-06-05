const { globSync } = require('glob');
const { existsSync } = require('fs');

const [_, __, arg1, arg2] = process.argv;
const masterDir = arg1 + '/';
const branchDir = arg2 + '/';

const loadFile = path => existsSync(path)
  ? require(process.cwd() + '/' + path)
  : [];

const getFilename = path => path.replace(masterDir, '').replace(branchDir, '');

const resolveFiles = ([file, getFieldId]) => {
  const masterFiles = globSync(masterDir + file);
  const branchFiles = globSync(branchDir + file);
  const branchOnlyFiles = branchFiles.filter(bf => !masterFiles.some(mf => getFilename(bf) === getFilename(mf)));
  const allFiles = [...masterFiles, ...branchOnlyFiles].map(getFilename);

  return allFiles
    .map(file => [file, loadFile(masterDir + file), loadFile(branchDir + file), getFieldId]);
};

module.exports = { resolveFiles };
