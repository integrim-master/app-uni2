import React, { createContext, useContext, useRef } from "react";
import ActionSheet from "react-native-actions-sheet";

const ActionSheetContext = createContext();

export const useActionSheet = () => useContext(ActionSheetContext);

export const ActionSheetProvider = ({ children }) => {
  const actionSheetRef = useRef(null);
  const [sheetContent, setSheetContent] = React.useState(null);

  const showActionSheet = (content) => {
    setSheetContent(content);
    actionSheetRef.current?.show();
  };

  const hideActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheetContext.Provider value={{ showActionSheet, hideActionSheet }}>
      {children}

      {/* Render dinámico del contenido */}
      <ActionSheet ref={actionSheetRef}>
        {sheetContent}
      </ActionSheet>
    </ActionSheetContext.Provider>
  );
};
