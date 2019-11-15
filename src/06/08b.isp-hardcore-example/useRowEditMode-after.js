import useEditModeButtons from './useEditModeButtons.hook';
import useEditModeLogic from './useEditModeLogic.hook';

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
  const {
    gridApi,
    clonedRowData,
    setGridApi,
    addModifiedRow,
    addDeletedRow,

    isInAgGridEditMode,

    findChangesAndSave,
    revertChangesAndCancel,
  } = useEditModeLogic({
    onCancel,
    onSave,
    rowData,
    getUniqueRowId,
  });

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
    setGridApi,
    addModifiedRow,
    addDeletedRow,
  };
};

export default useEditMode;
