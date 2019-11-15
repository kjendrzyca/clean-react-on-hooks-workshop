import { useState, useCallback, useEffect } from 'react';
import cloneDeep from 'lodash.clonedeep';

import getChangedRows from './getChangedRows';
import useAgGridCellEditModeInfo from './useAgGridCellEditModeInfo.hook';

const useEditModeLogic = ({
  onCancel = () => null,
  onSave = () => null,
  rowData,
  getUniqueRowId,
} = {}) => {
  const [clonedRowData, setClonedRowData] = useState([]);
  useEffect(() => {
    setClonedRowData(cloneDeep(rowData));
  }, [rowData]);

  const [modifiedRows, setModifiedRows] = useState([]);
  const [rowsToDelete, setRowsToDelete] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const setApi = useCallback(({ api }) => {
    setGridApi(api);
  }, []);

  const addModifiedRow = useCallback(modifiedRow => {
    setModifiedRows(modifiedRows => [
      ...modifiedRows.filter(
        row => getUniqueRowId(row) !== getUniqueRowId(modifiedRow)
      ),
      modifiedRow,
    ]);
  }, [getUniqueRowId]);

  const addDeletedRow = useCallback(deletedRow => {
    setRowsToDelete(rowsToDelete => [
      ...rowsToDelete,
      deletedRow,
    ]);
    setModifiedRows(modifiedRows => modifiedRows.filter(row => row.rowId !== deletedRow.rowId));
    setClonedRowData(clonedRowData => (
      clonedRowData.filter(
        rowData => getUniqueRowId(rowData) !== getUniqueRowId(deletedRow),
      )
    ));
  }, [getUniqueRowId]);


  const revertChangesAndCancel = useCallback(() => {
    setModifiedRows([]);
    setRowsToDelete([]);
    const clonedData = cloneDeep(rowData);
    gridApi.setRowData(clonedData);
    setClonedRowData(clonedData);
    onCancel();
  }, [gridApi, rowData, onCancel]);

  const findChangesAndSave = useCallback(() => {
    const rowsWithChanges = getChangedRows({
      getUniqueRowId,
      modifiedRows,
      rowsToDelete,
      originalRows: rowData,
    });
    setModifiedRows([]);
    setRowsToDelete([]);
    onSave(rowsWithChanges);
    return rowsWithChanges;
  }, [
    modifiedRows,
    rowsToDelete,
    rowData,
    getUniqueRowId,
    onSave,
  ]);

  const isInAgGridEditMode = useAgGridCellEditModeInfo(gridApi);

  return {
    gridApi,
    clonedRowData,
    setGridApi: setApi,
    addModifiedRow,
    addDeletedRow,

    isInAgGridEditMode,

    findChangesAndSave,
    revertChangesAndCancel,
  };
};

export default useEditModeLogic;
