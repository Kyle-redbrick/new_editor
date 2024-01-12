import React, { useState } from "react";
import View from "./View";

export default function Container() {
  const [selectedElement, setSelectedElement] = useState(null);
  const onChangeSelectedElement = (element) => setSelectedElement(element);
  return (
    <View
      editorType={selectedElement}
      onChangeSelectedElement={onChangeSelectedElement}
    />
  );
}
