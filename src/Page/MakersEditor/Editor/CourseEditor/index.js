import React, { useState, useEffect } from "react";
import Field from "../Field";
import PopUp from "../../../../Common/Component/PopUp";
import * as request from "../../../../Common/Util/HTTPRequest";
import "./index.scss";

export default function CourseEditor(props) {
  const { courseId, reload, setReload, courseValues, setCourseValues } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isDeletePopUp, setIsDeletePopUp] = useState(false);
  const deleteCourseHandler = () => {
    request
      .deleteCourse(courseId)
      .then((res) => res.json())
      .then(() => {
        localStorage.removeItem("makersEditorSelectedElement");
        window.location.reload();
      });
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setCourseValues({
        title: title,
        description: description,
        thumbnailURL: thumbnailURL,
        isVisible: isVisible,
      });
    }, 1000);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [title, description, thumbnailURL, isVisible]);

  useEffect(() => {
    request
      .getCourseInfo(courseId)
      .then((res) => res.json())
      .then((json) => {
        let courseInfo = json.data.courseInfo;
        setTitle(courseInfo.title);
        setDescription(courseInfo.description);
        setThumbnailURL(courseInfo.thumbnailURL);
        setIsVisible(courseInfo.isVisible);
      });
  }, [courseId, reload]);

  return (
    <div className="makersEditor-Editor-body-fields">
      <div className="makersEditor-Editor-body-fields__field">
        <Field.Input
          type="input"
          title="코스명"
          placeholder="코스명을 입력해주세요."
          value={title}
          onChange={setTitle}
        />
      </div>
      <div className="makersEditor-Editor-body-fields__field">
        <Field.Textarea
          type="textarea"
          title="실행 방법"
          placeholder="코스 소개를 입력해주세요."
          value={description}
          onChange={setDescription}
        />
      </div>
      <div className="makersEditor-Editor-body-fields__field">
        <Field.File
          type="file"
          title="썸네일"
          value={thumbnailURL}
          onChange={setThumbnailURL}
          courseId={courseId}
        />
      </div>
      <div className="makersEditor-Editor-body-fields__field">
        <Field.OnOff
          type="onoff"
          title="코스 공개"
          value={isVisible}
          onChange={setIsVisible}
        />
      </div>
      <div className="makersEditor-Editor-body__horizontal" />
      <div
        className="makersEditor-Editor-body__delete"
        onClick={() => setIsDeletePopUp(!isDeletePopUp)}
      >
        코스 삭제
      </div>

      {isDeletePopUp && (
        <div className="makersEditor-Editor-popup__delete">
          <PopUp
            button1="취소"
            button2="삭제"
            content={`삭제하면 되돌릴 수 없습니다.
            정말 삭제하시겠습니까?`}
            onClickButton1={() => setIsDeletePopUp(!isDeletePopUp)}
            onClickButton2={() => {
              deleteCourseHandler();
              setIsDeletePopUp(!isDeletePopUp);
            }}
          />
        </div>
      )}
    </div>
  );
}
