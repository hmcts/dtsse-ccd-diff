const { glob } = require('glob');

const [_, __, arg1, arg2] = process.argv;
const masterDir = process.cwd() + '/' + arg1 + '/';
const branchDir = process.cwd() + '/' + arg2 + '/';

const getFilename = path => path.replace(masterDir, '').replace(branchDir, '');

const resolveFiles = ([file, getFieldId]) => {
  const masterFiles = glob.sync(masterDir + file);
  const branchFiles = glob.sync(branchDir + file);

  return masterFiles.map(f => [f, branchFiles.find(bf => getFilename(bf) === getFilename(f)), getFieldId]);
};

module.exports = { getFilename, resolveFiles };
