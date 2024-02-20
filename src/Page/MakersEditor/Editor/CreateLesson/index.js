import React, { useState, useEffect } from "react";
import Field from "../Field";
import * as request from "../../../../Common/Util/HTTPRequest";
import "./index.scss";

export default function CreateLesson(props) {
  const { createLessonValues, setCreateLessonValues, reload, setReload } =
    props;
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("JS");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setCreateLessonValues({
        title: title,
        language: language,
        thumbnailURL: thumbnailURL,
        // isVisible: isVisible,
      });
    }, 1000);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [title, language, thumbnailURL, isVisible]);

  return (
    <div className="makersEditor-Editor-body-fields">
      <div className="makersEditor-Editor-body-fields__field">
        <Field.Input
          type="input"
          title="레슨명"
          placeholder="레슨명을 입력해주세요."
          value={title}
          onChange={setTitle}
        />
      </div>
      <div className="makersEditor-Editor-body-fields__field">
        <Field.Select
          type="select"
          title="언어"
          value={language}
          onChange={setLanguage}
          options={[
            { label: "JS", value: "JS" },
            { label: "OOBC", value: "OOBC" },
            { label: "PYTHON", value: "PYTHON" },
          ]}
          // courseId={courseId}
        />
      </div>
      <div className="makersEditor-Editor-body-fields__field">
        <Field.NewLessonFile
          type="file"
          title="썸네일"
          value={thumbnailURL}
          onChange={setThumbnailURL}
          // courseId={courseId}
        />
      </div>
      <div className="makersEditor-Editor-body-fields__field">
        <Field.OnOff
          type="onoff"
          title="레슨 공개"
          value={isVisible}
          onChange={setIsVisible}
        />
      </div>
      <div className="makersEditor-Editor-body__horizontal" />
      {/* <div
        className="makersEditor-Editor-body__delete"
        // onClick={deleteCourseHandler}ㅊ
      >
        레슨 삭제
      </div> */}
      {/* <div className="makersEditor-Editor-body-footer">
        <button onClick={courseSaveHandler}>저장</button>
      </div> */}
    </div>
  );
}
