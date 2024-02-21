import React, { useState } from "react";
import PopUp from "../../../../../../Common/Component/PopUp";
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
    deleteLessonHandler,
  } = props;
  const [isDeletePopUp, setIsDeletePopUp] = useState(false);

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
        <Field.LessonThumbnailFile
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
        onClick={() => {
          setIsDeletePopUp(!isDeletePopUp);
        }}
      >
        레슨 삭제
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
              deleteLessonHandler(lessonId);
              setIsDeletePopUp(!isDeletePopUp);
            }}
          />
        </div>
      )}
    </div>
  );
}
