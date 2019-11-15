import React, { useState, useCallback } from 'react';

import { Button } from 'ui-library';

const useEditModeButtons = ({
  onCancel = () => null,
  onEnter = () => null,
  onSave = () => null,
  cancelButtonDisabled = false,
  saveButtonDisabled = false,
  editButtonDisabled = false,
  isPermanentlyInEditMode = false,
} = {}) => {
  const [isInEditMode, setIsInEditMode] = useState(false);

  const setEditMode = useCallback(value => {
    if (!isPermanentlyInEditMode) {
      setIsInEditMode(value);
    }
  }, [isPermanentlyInEditMode]);

  const onLeaveCallback = useCallback(() => {
    setEditMode(false);
    onCancel();
  }, [setEditMode, onCancel]);

  const onEnterCallback = useCallback(() => {
    setEditMode(true);
    onEnter();
  }, [setEditMode, onEnter]);

  const onSaveCallback = useCallback(() => {
    setEditMode(false);
    onSave();
  }, [setEditMode, onSave]);

  const cancelButton = () => !isPermanentlyInEditMode
    ? (
      <Button size="lg" kind="secondary" onClick={onLeaveCallback} className="add-button" disabled={cancelButtonDisabled}>
        Cancel
      </Button>
    )
    : null;

  const editModeButtons = isInEditMode
    ? (
      <>
        {cancelButton()}
        <Button size="lg" onClick={onSaveCallback} className="add-button" disabled={saveButtonDisabled}>
          Save
        </Button>
      </>
    )
    : (
      <Button size="lg" onClick={onEnterCallback} className="add-button" disabled={editButtonDisabled}>
          Edit
      </Button>
    );

  return { isInEditMode, editModeButtons };
};

export default useEditModeButtons;
