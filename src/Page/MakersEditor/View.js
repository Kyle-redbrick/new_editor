import React, { useState } from "react";
import ProjectList from "./ProjectList";
import Editor from "./Editor";
import "./index.scss";

function View(props) {
  const { editorType, onChangeSelectedElement } = props;
  const [reload, setReload] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  return (
    <div className="makersEditor">
      <section>
        <ProjectList
          onChangeSelectedElement={onChangeSelectedElement}
          reload={reload}
          setReload={setReload}
          menuIndex={menuIndex}
          setMenuIndex={setMenuIndex}
        />
      </section>
      <section>
        <Editor
          editorType={editorType}
          onChangeSelectedElement={onChangeSelectedElement}
          reload={reload}
          setReload={setReload}
          menuIndex={menuIndex}
          setMenuIndex={setMenuIndex}
        />
      </section>
    </div>
  );
}
export default View;
