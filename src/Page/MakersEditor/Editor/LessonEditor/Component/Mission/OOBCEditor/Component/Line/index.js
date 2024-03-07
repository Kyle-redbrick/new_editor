import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "../../../../../../../../../Common/Util/customHTML5toTouch";
import "./index.scss";

import anchorDefault from "../../Image/anchor-default.svg";
import anchorTouched from "../../Image/anchor-touched.svg";
import lineFold from "../../Image/line_fold.png";

export const LineGroup = (props) => {
  return (
    <div className="oobceditor_lines">
      <DndProvider options={HTML5toTouch}>
        {props.children}
        <EndLine onDragLineOverEnd={props.onDragLineOverEnd} />
      </DndProvider>
    </div>
  );
};

function EndLine(props) {
  const { onDragLineOverEnd } = props;
  const [, dropRef] = useDrop({
    accept: "line",
    hover(item, monitor) {
      const dragLine = item.line;
      onDragLineOverEnd(dragLine);
    },
  });
  return (
    <div
      ref={dropRef}
      id="oobceditor_line-end"
      className="oobceditor_line oobceditor_line-end"
    />
  );
}

export const Line = (props) => {
  const {
    line,
    currentLine,
    onClickLine,
    onLineContextMenu,
    onClickFoldLine,
    onTouchLineStart,
    onTouchLineMove,
    onTouchLineEnd,
    onDragLine,
    onDragLineBegin,
    onDragLineEnd,
  } = props;
  const isCurrent = line === currentLine;

  const [{ opacity }, dragRef, previewRef] = useDrag({
    item: { type: "line", line },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.5 : 1,
      };
    },
    begin: (monitor) => {
      onDragLineBegin(line);
    },
    end: (item, monitor) => {
      onDragLineEnd(item.line);
    },
  });

  const [, dropRef] = useDrop({
    accept: "line",
    hover(item, monitor) {
      const dragLine = item.line;
      const hoverLine = line;
      const dragOffset = monitor.getClientOffset();
      onDragLine(dragLine, hoverLine, dragOffset);
    },
  });

  const lineRef = dropRef(previewRef(useRef()));
  const anchorRef = dragRef(useRef());

  const lineStyle = { opacity };
  const numberStyle = { marginRight: line.getDepth() * 60 };

  const id = `oobceditor_line-${line.id}`;
  const number = line.lineNum !== null ? line.lineNum + 1 : null;

  return (
    <div
      id={id}
      ref={lineRef}
      style={lineStyle}
      className={`oobceditor_line${
        isCurrent ? " oobceditor_line-current" : ""
      }${line.isDisabled() ? " oobceditor_line-disabled" : ""}`}
      onTouchStart={(e) => {
        if (e.target.id !== id) return;
        const touch = e.touches[0];
        const position = { x: touch.clientX, y: touch.clientY };
        onTouchLineStart(line, position);
      }}
      onTouchMove={(e) => {
        if (e.target.id !== id) return;
        const touch = e.touches[0];
        const position = { x: touch.clientX, y: touch.clientY };
        onTouchLineMove(position);
      }}
      onTouchEnd={(e) => {
        onTouchLineEnd(line);
      }}
      onClick={(e) => {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        onClickLine(line);
      }}
      onContextMenu={(e) => {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        const position = { x: e.clientX, y: e.clientY };
        onLineContextMenu(line, position);
      }}
    >
      {/* line number */}
      <div className="oobceditor_line_number" style={numberStyle}>
        {number}
      </div>
      {/* anchor */}
      <img
        className="oobceditor_line_anchor"
        src={isCurrent ? anchorDefault : anchorTouched}
        ref={anchorRef}
        alt="anchor"
      />
      {/* blocks */}
      <div className="oobceditor_line_blocks">{props.children}</div>
      {/* fold */}
      {line.isFoldable() && (
        <img
          className={`oobceditor_line_fold${
            line.folded ? " oobceditor_line_fold-folded" : ""
          }`}
          src={lineFold}
          alt="fold"
          onClick={(e) => {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
            onClickFoldLine(line);
          }}
        />
      )}
    </div>
  );
};
