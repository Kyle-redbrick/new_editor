import React, { useState } from "react";
import View from "./View";

export default function Container() {
  const [editorType, setEditorType] = useState(null);
  const onChangeEditorType = (element) => setEditorType(element);
  return (
    <View editorType={editorType} onChangeEditorType={onChangeEditorType} />
  );
}
