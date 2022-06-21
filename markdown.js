
const getAdditionsOrRemovals = diff => {
  const keys = Object.keys(diff[0] || []);
  const rows = diff.map(row => '|' + Object.values(row).join('|')).join('|\n');

  return diff.length === 0 ? '' : `
|${keys.join('|')}|
|${keys.map(_ => '---').join('|')}|
${rows}|
`;
}

const getChanges = diff => {
  const keys = Object.keys(diff[0]?.oldValue || []);
  const rows = diff.map(row => keys.map(key => {
    const content = row.oldValue[key] === row.newValue[key]
      ? row.oldValue[key]
      : '```diff \n-' + row.oldValue[key] + ' \n+' + row.newValue[key] + '\n```';

    return `<td>\n\n${content}\n\n</td>`;
  }).join(''));

  return diff.length === 0 ? '' : `
<table>
<thead>
  <tr>
    ${keys.map(key => `<th>${key}</th>`).join('')}
  </tr>
</thead>
${rows.map(row => `<tr>${row}</tr>`).join('')}
</table>
`;
}

const generateFileReport = (file, { additions, removals, changes }) => {
  return `
### ${file}
#### ${additions.length} added
${getAdditionsOrRemovals(additions)}  
#### ${removals.length} removed
${getAdditionsOrRemovals(removals)}  
#### ${changes.length} changed
${getChanges(changes)}
  `;
};

module.exports = { generateFileReport };
