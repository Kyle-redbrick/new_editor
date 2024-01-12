import React, { useEffect, useState } from "react";
import BtnCourseAdd from "../../../Image/btn-course_add.svg";
import * as request from "../../../Common/Util/HTTPRequest";
import "./index.scss";

export default function ProjectList(props) {
  const { onChangeEditorType } = props;
  const makersToken = localStorage.getItem("makersToken");
  const [courses, setCourses] = useState([]);

  // 코스 정보 불러오기
  const getCoursesInfo = () => {
    request
      .getSaasAllCourse()
      .then((res) => res.json())
      .then((json) => setCourses(json.courseList))
      .catch((err) => setCourses([]));
  };

  useEffect(() => {
    getCoursesInfo();
  }, [makersToken]);

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
