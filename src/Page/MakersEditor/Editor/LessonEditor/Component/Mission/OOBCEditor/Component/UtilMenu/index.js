import React from "react";
import "./index.scss";

import zoomInImg from "../../Image/zoom_in.png";
import zoomOutImg from "../../Image/zoom_out.png";

export default function (props) {
  const { isMinZoom, isMaxZoom, onClickZoomIn, onClickZoomOut } = props;
  return (
    <div className="oobceditor_utils">
      <div
        className={`oobceditor_util oobceditor_util-zoom_in${
          isMaxZoom ? " oobceditor_util-disabled" : ""
        }`}
        onClick={onClickZoomIn}
      >
        <img src={zoomInImg} alt="zoomIn" />
      </div>
      <div
        className={`oobceditor_util oobceditor_util-zoom_out${
          isMinZoom ? " oobceditor_util-disabled" : ""
        }`}
        onClick={onClickZoomOut}
      >
        <img src={zoomOutImg} alt="zoomOut" />
      </div>
    </div>
  );
}
