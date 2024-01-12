import React from "react";
import BtnCourseAdd from "../../../Image/btn-course_add.svg";
import "./index.scss";

export default function ProjectList(props) {
  const { onChangeEditorType } = props;
  return (
    <div className="makersEditor-ProjectList">
      <div className="makersEditor-ProjectList-header">
        <div className="makersEditor-ProjectList-header__title">
          콘텐츠 에디터
        </div>
        <img src={BtnCourseAdd} alt="add" />
      </div>
      <div className="makersEditor-ProjectList-body">body</div>
    </div>
  );
}
