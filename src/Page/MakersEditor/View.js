import React from "react";
import ProjectList from "./ProjectList";
import Editor from "./Editor";
import "./index.scss";

function View(props) {
  const { editorType, onChangeSelectedElement } = props;
  return (
    <div className="makersEditor">
      <section>
        <ProjectList onChangeSelectedElement={onChangeSelectedElement} />
      </section>
      <section>
        <Editor
          editorType={editorType}
          onChangeSelectedElement={onChangeSelectedElement}
        />
      </section>
    </div>
  );
}
export default View;
