import React, { useState, useEffect, useRef } from "react";
import SlideMarkDown from "../SlideMarkDown";
import Field from "../../../../Field";
import "./index.scss";

const SlideField = (props) => {
  const [shouldRerender, setShouldRerender] = useState(false);
  const editorId = useRef("slide_editor");
  const editorRef = useRef(null);

  useEffect(() => {
    setupEditor();
    setCode(props.value);
    const timer = setTimeout(forceRerenderSlide, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCode(props.value);
  }, [props.value]);

  const setupEditor = () => {
    editorRef.current = window.ace.edit(editorId.current, { wrap: true });
    editorRef.current.setFontSize(16);
    editorRef.current.on("change", onChange);
  };

  const setCode = (code) => {
    if (!editorRef.current) return;
    if (code !== editorRef.current.getValue()) {
      editorRef.current.setValue(code || "", 1);
    }
  };

  const onChange = (_, editor) => {
    const code = editor.getValue();
    if (props.onChange) {
      props.onChange(code, props.id);
    }
  };

  const forceRerenderSlide = () => {
    setShouldRerender(true);
    setShouldRerender(false);
  };

  return (
    <Field.Base {...props} type="slide">
      <div className="slide_viewer">
        <SlideMarkDown markdown={props.value} shouldRerender={shouldRerender} />
      </div>
      <div className="slide_editor_wrapper">
        <div id={editorId.current} className="slide_editor" />
      </div>
    </Field.Base>
  );
};

export default SlideField;
