import { useState, useCallback, useEffect } from 'react';
import cloneDeep from 'lodash.clonedeep';

import getChangedRows from './getChangedRows';
import useEditModeButtons from './useEditModeButtons.hook';
import useAgGridCellEditModeInfo from './useAgGridCellEditModeInfo.hook';

const useEditMode = ({
  onCancel = () => null,
  onEnter = () => null,
  onSave = () => null,
  rowData,
  getUniqueRowId,
  saveButtonDisabled,
  editButtonDisabled,
  isPermanentlyInEditMode,
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
  }, [
    modifiedRows,
    rowsToDelete,
    rowData,
    getUniqueRowId,
    onSave,
  ]);

  const isInAgGridEditMode = useAgGridCellEditModeInfo(gridApi);

  const { isInEditMode, editModeButtons } = useEditModeButtons({
    onCancel: revertChangesAndCancel,
    onEnter,
    onSave: findChangesAndSave,
    cancelButtonDisabled: isInAgGridEditMode,
    saveButtonDisabled: isInAgGridEditMode || saveButtonDisabled,
    editButtonDisabled,
    isPermanentlyInEditMode,
  });
  return {
    gridApi,
    isInEditMode,
    editModeButtons,
    clonedRowData,
    setGridApi: setApi,
    addModifiedRow,
    addDeletedRow,
  };
};

export default useEditMode;
