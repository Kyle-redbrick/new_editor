import React, { useState } from "react";
import ProjectList from "./ProjectList";
import Editor from "./Editor";
import "./index.scss";

function View(props) {
  const { editorType, onChangeSelectedElement } = props;
  const [reload, setReload] = useState(false);
  return (
    <div className="makersEditor">
      <section>
        <ProjectList
          onChangeSelectedElement={onChangeSelectedElement}
          reload={reload}
          setReload={setReload}
        />
      </section>
      <section>
        <Editor
          editorType={editorType}
          onChangeSelectedElement={onChangeSelectedElement}
          reload={reload}
          setReload={setReload}
        />
      </section>
    </div>
  );
}
export default View;
