import isEqual from 'lodash.isequal';

const getChangedRows = ({ getUniqueRowId, modifiedRows, originalRows, rowsToDelete }) => {
  const rowsPairs = modifiedRows.map(row => ({
    oldRow: originalRows.find(originalRow => getUniqueRowId(originalRow) === getUniqueRowId(row)),
    newRow: row,
  }));

  const rowsPairsWithChanges = rowsPairs.filter(
    ({ oldRow, newRow }) => !isEqual(oldRow, newRow)
  );

  return {
    rowsPairsWithChanges,
    rowsToDelete,
  };
};

export default getChangedRows;
