import React, { useRef } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import "./index.scss";

function Base(props) {
  const { title, children, type } = props;
  return (
    <div className="makersEditor-Editor-body-fields__section">
      <div className="makersEditor-Editor-body-fields__section-title">
        {title}
      </div>
      <div className={`makersEditor-Editor-body-fields__section-body__${type}`}>
        {children}
      </div>
    </div>
  );
}

function Input(props) {
  const { id, placeholder, value, onChange, children, type } = props;
  return (
    <Base {...props} type="input">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value, id);
        }}
      />
      {children}
    </Base>
  );
}

function Textarea(props) {
  const { id, placeholder, value, onChange, children, type } = props;
  return (
    <Base {...props} type="textarea">
      <textarea
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value, id);
        }}
      />
      {children}
    </Base>
  );
}

function File(props) {
  const { id, value, onChange, courseId } = props;
  const fileInputRef = useRef();
  // let downloadUrl;
  return (
    <Base {...props} type="file">
      <input
        type="file"
        ref={fileInputRef}
        accept=".jpg, .jpeg, .png, .gif, .mp4"
        onChange={async (e) => {
          const selectedFile = e.target.files[0];
          if (!selectedFile) return;

          const uploadResponse = await request.courseThumbnailUpload(courseId);
          const uploadData = await uploadResponse.json();
          const putUrl = uploadData.url.uploadUrl;
          const downloadUrl = uploadData.url.downloadUrl;
          const putResponse = await fetch(putUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "image/jpeg",
            },
            body: selectedFile,
          });
          console.log("PUT response", putResponse);
          onChange(downloadUrl);
        }}
        hidden
      />
      {value && (
        <span>
          <img src={process.env.REACT_APP_GET_IMAGE + value} alt={value} />
          {/* {value} */}
        </span>
      )}
      <button
        onClick={() => {
          fileInputRef.current.click();
        }}
      >
        업로드
      </button>
    </Base>
  );
}

function NewLessonFile(props) {
  const { id, value, onChange } = props;
  const fileInputRef = useRef();
  // let downloadUrl;
  return (
    <Base {...props} type="file">
      <input
        type="file"
        ref={fileInputRef}
        accept=".jpg, .jpeg, .png, .gif, .mp4"
        onChange={async (e) => {
          const selectedFile = e.target.files[0];
          if (!selectedFile) return;

          const uploadResponse = await request.thumbnailUpload();
          const uploadData = await uploadResponse.json();
          const putUrl = uploadData.url.uploadUrl;
          const downloadUrl = uploadData.url.downloadUrl;
          const putResponse = await fetch(putUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "image/jpeg",
            },
            body: selectedFile,
          });
          console.log("PUT response", putResponse);
          onChange(downloadUrl);
        }}
        hidden
      />
      {value && (
        <span>
          <img src={process.env.REACT_APP_GET_IMAGE + value} alt={value} />
          {/* {value} */}
        </span>
      )}
      <button
        onClick={() => {
          fileInputRef.current.click();
        }}
      >
        업로드
      </button>
    </Base>
  );
}

function OnOff(props) {
  const { id, value: isOn, onChange } = props;

  return (
    <Base {...props} type="onoff">
      <div className={`onoff-wrapper onoff-wrapper-${isOn ? "on" : "off"}`}>
        <div className={`onoff onoff-${isOn ? "on" : "off"}`}>
          <div
            className="onoff_background"
            onClick={() => {
              onChange(!isOn, id);
            }}
          >
            <div className="onoff_thumb" />
          </div>
        </div>
        <div>{isOn ? "공개" : "비공개"}</div>
      </div>
    </Base>
  );
}

function Select(props) {
  const { id, value, options, onChange } = props;
  return (
    <Base {...props} type="select">
      <select
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value, id);
        }}
      >
        {options.map((option, id) => (
          <option key={id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Base>
  );
}

const Field = {
  Input,
  Textarea,
  File,
  NewLessonFile,
  OnOff,
  Select,
};

export default Field;
