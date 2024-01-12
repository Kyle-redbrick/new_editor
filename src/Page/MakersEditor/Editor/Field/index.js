import React, { useRef } from "react";
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
  const { id, value, onChange } = props;
  const fileInputRef = useRef();
  return (
    <Base {...props} type="file">
      <input
        type="file"
        ref={fileInputRef}
        accept=".jpg, .jpeg, .png, .gif, .mp4"
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          if (!selectedFile) return;
          //   uploadFile({ selectedFile }).then((res) => onChange(res));
        }}
        hidden
      />
      <button
        onClick={() => {
          fileInputRef.current.click();
        }}
      >
        업로드
      </button>
      {value && (
        <span>
          {value} <img src={value.GET_IMAGE()} alt={value} />
        </span>
      )}
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

const Field = {
  Input,
  Textarea,
  File,
  OnOff,
};

export default Field;
