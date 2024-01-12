import React from "react";
import CourseEditor from "./CourseEditor";
import LessonEditor from "./LessonEditor";
import "./index.scss";

export default function Editor(props) {
  // const { editorType, onChangeEditorType } = props;
  const editorType = "course";
  return (
    <div className="makersEditor-Editor">
      <div className="makersEditor-Editor-header">
        {editorType === "course" && (
          <div className="makersEditor-Editor-header__title">코스 수정하기</div>
        )}
        {editorType === "lesson" && (
          <div className="makersEditor-Editor-header__title">레슨 수정하기</div>
        )}
      </div>
      <div className="makersEditor-Editor-body">
        {editorType === "course" && <CourseEditor />}
        {editorType === "lesson" && <LessonEditor />}
      </div>
    </div>
  );
}
