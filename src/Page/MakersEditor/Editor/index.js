import React, { useState } from "react";
import CourseEditor from "./CourseEditor";
import LessonEditor from "./LessonEditor";
import * as request from "../../../Common/Util/HTTPRequest";
import "./index.scss";

export default function Editor(props) {
  const { editorType, reload, setReload } = props;
  const [courseValues, setCourseValues] = useState("");
  let type, courseId, lessonId;

  if (editorType && editorType.selectedElement) {
    type = editorType.selectedElement.type;
    if (type === "course") {
      courseId = editorType.selectedElement.id;
    } else {
      lessonId = editorType.selectedElement.id;
    }
  }

  const courseSaveHandler = () => {
    request.updateCourse(courseId, courseValues).then((res) => {
      res.json();
      setReload(!reload);
    });
  };

  return (
    <div className="makersEditor-Editor">
      <div className="makersEditor-Editor-header">
        {type === "course" && (
          <div className="makersEditor-Editor-header__title">코스 수정하기</div>
        )}
        {type === "lesson" && (
          <div className="makersEditor-Editor-header__title">레슨 수정하기</div>
        )}
      </div>
      <div className="makersEditor-Editor-body">
        {type === "course" && (
          <CourseEditor
            courseId={courseId}
            reload={reload}
            setReload={setReload}
            setCourseValues={setCourseValues}
          />
        )}
        {type === "lesson" && <LessonEditor lessonId={lessonId} />}
      </div>
      <div className="makersEditor-Editor-footer">
        {type === "course" && <button onClick={courseSaveHandler}>저장</button>}
      </div>
    </div>
  );
}
