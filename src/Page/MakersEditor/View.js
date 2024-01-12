import React from "react";
import ProjectList from "./ProjectList";
import Editor from "./Editor";
import "./index.scss";

function View(props) {
  const { editorType, onChangeEditorType } = props;
  return (
    <div className="makersEditor">
      <section>
        <ProjectList />
      </section>
      <section>
        <Editor
          editorType={editorType}
          onChangeEditorType={onChangeEditorType}
        />
      </section>
    </div>
  );
}
export default View;
