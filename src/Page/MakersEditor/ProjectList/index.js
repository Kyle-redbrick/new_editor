import React from "react";
import "./index.scss";
import BtnCourseAdd from "../../../Image/btn-course_add.svg";

export default function ProjectList() {
  return (
    <div className="makersEditor-ProjectList">
      <div className="makersEditor-ProjectList-header">
        <div className="makersEditor-ProjectList-header__title">
          콘텐츠 에디터
        </div>
        <img src={BtnCourseAdd} alt="add" />
      </div>
    </div>
  );
}
