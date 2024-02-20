import React from "react";
import Field from "../../../Field";
import "./index.scss";

export default function Information(props) {
  const {
    lessonValues,
    setThumbnailURL,
    setTitle,
    setLanguage,
    setIsVisible,
    lessonId,
  } = props;

  return (
    <div className="makersEditor-Editor-body-fields">
      <div className="makersEditor-Editor-body-fields__field">
        <Field.Input
          type="input"
          title="레슨명"
          placeholder="레슨명을 입력해주세요."
          value={lessonValues.title || ""}
          onChange={setTitle}
        />
      </div>
      <div className="makersEditor-Editor-body-fields__field">
        <Field.File
          type="file"
          title="썸네일"
          value={lessonValues.thumbnailURL || ""}
          onChange={setThumbnailURL}
          lessonId={lessonId}
        />
      </div>
      <div className="makersEditor-Editor-body-fields__field">
        <Field.OnOff
          type="onoff"
          title="레슨 공개"
          value={lessonValues.isVisible || ""}
          onChange={setIsVisible}
        />
      </div>
      <div className="makersEditor-Editor-body__horizontal" />
      <div
        className="makersEditor-Editor-body__delete"
        // onClick={deleteCourseHandler}
      >
        레슨 삭제
      </div>
      {/* <div className="makersEditor-Editor-body-footer">
    <button onClick={courseSaveHandler}>저장</button>
  </div> */}
    </div>
  );
}
