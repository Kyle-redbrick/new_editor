import React from "react";
import "./index.scss";

export default function (props) {
  const { children, currentBlock, onScrollContext, onClickContext } = props;

  return (
    <div
      id="oobceditor_context"
      className={`oobceditor_context${
        currentBlock ? " oobceditor_context-selectorOn" : ""
      }`}
      onScroll={onScrollContext}
      onClick={onClickContext}
    >
      {children}
    </div>
  );
}
