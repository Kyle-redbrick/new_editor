import React from "react";
import "./index.scss";

export default function SampleGameViewer(props) {
  const { sampleGameURL, screenMode } = props;
  return (
    <div className={`sampleGame_viewer_${screenMode}`}>
      <iframe
        id="makers__iframe"
        title="guide"
        src={
          sampleGameURL ? process.env.REACT_APP_GET_IMAGE + sampleGameURL : null
        }
        style={{ width: "100%" }}
        scrolling="no"
        allowFullScreen
        frameBorder="0"
      />
    </div>
  );
}
