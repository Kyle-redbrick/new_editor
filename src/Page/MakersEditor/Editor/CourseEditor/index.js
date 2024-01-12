import React, { useState } from "react";
import Field from "../Field";
import "./index.scss";

export default function CourseEditor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [isVisible, setIsVisible] = useState(true);

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
      <div className="makersEditor-Editor-body__delete">코스 삭제</div>
    </div>
  );
}
