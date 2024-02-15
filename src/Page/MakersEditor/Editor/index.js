import React, { useState } from "react";
import CourseEditor from "./CourseEditor";
import LessonEditor from "./LessonEditor";
import PopUp from "../../../Common/Component/PopUp";
import * as request from "../../../Common/Util/HTTPRequest";
import "./index.scss";

export default function Editor(props) {
  const { editorType, reload, setReload } = props;
  const [courseValues, setCourseValues] = useState("");
  const [courseSavePopUp, setcourseSavePopUp] = useState(false);

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
        {type === "lecture" && (
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
        {type === "lecture" && (
          <LessonEditor
            lessonId={lessonId}
            reload={reload}
            setReload={setReload}
          />
        )}
      </div>
      <div className="makersEditor-Editor-footer">
        {type === "course" && (
          <button onClick={() => setcourseSavePopUp(!courseSavePopUp)}>
            저장
          </button>
        )}
      </div>
      {courseSavePopUp && (
        <div className="makersEditor-Editor-popup">
          <PopUp
            button1="취소"
            button2="저장"
            content={`저장하면 되돌릴 수 없습니다.
            정말 수정사항을 저장하시겠습니까?`}
            onClickButton1={() => setcourseSavePopUp(!courseSavePopUp)}
            onClickButton2={() => {
              courseSaveHandler();
              setcourseSavePopUp(!courseSavePopUp);
            }}
          />
        </div>
      )}
    </div>
  );
}
