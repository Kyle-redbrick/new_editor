import React from "react";
import "./index.scss";

export default function PopUp(props) {
  const {
    button1,
    button2,
    onClickButton1,
    onClickButton2,
    content,
    commandDictionary,
  } = props;
  return (
    <div
      className={
        commandDictionary ? "PopUp-container-command" : "PopUp-container"
      }
    >
      <div className="PopUp-container-body">{content}</div>
      <div className="PopUp-container-footer">
        <div
          className="PopUp-container-footer__button"
          onClick={onClickButton1}
        >
          {button1}
        </div>
        <div
          className="PopUp-container-footer__button"
          onClick={onClickButton2}
        >
          {button2}
        </div>
      </div>
    </div>
  );
}
