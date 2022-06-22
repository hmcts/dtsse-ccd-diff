const { glob } = require("glob");

const getFilename = path => path.substring(path.lastIndexOf('/') + 1);

const resolveFiles = (masterDir, branchDir) => ([file, getFieldId]) => {
  const masterFiles = glob(masterDir + file, { sync: true });
  const branchFiles = glob(branchDir + file, { sync: true });

  return masterFiles.map(f => [f, branchFiles.find(bf => getFilename(bf) === getFilename(f)), getFieldId]);
}

module.exports = { getFilename, resolveFiles };
