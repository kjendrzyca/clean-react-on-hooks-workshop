import { useEffect, useState } from 'react';

const CELL_EDITING_STARTED_EVENT_NAME = 'cellEditingStarted';
const CELL_EDITING_STOPPED_EVENT_NAME = 'cellEditingStopped';
const useAgGridCellEditModeInfo = gridApi => {
  const [isInAgGridEditMode, setIsInAgGridEditMode] = useState(false);

  useEffect(() => {
    if (gridApi) {
      const eventListener = gridApi.addEventListener(CELL_EDITING_STARTED_EVENT_NAME, () => {
        setIsInAgGridEditMode(true);
      });
      return () => {
        gridApi.removeEventListener(CELL_EDITING_STARTED_EVENT_NAME, eventListener);
      };
    }
  }, [gridApi]);

  useEffect(() => {
    if (gridApi) {
      const eventListener = gridApi.addEventListener(CELL_EDITING_STOPPED_EVENT_NAME, () => {
        setIsInAgGridEditMode(false);
      });
      return () => {
        gridApi.removeEventListener(CELL_EDITING_STOPPED_EVENT_NAME, eventListener);
      };
    }
  }, [gridApi]);

  return isInAgGridEditMode;
};

export default useAgGridCellEditModeInfo;
