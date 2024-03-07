import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import AssetLibrary from "../../../../../../../Common/Util/assetLibrary";
import "./index.scss";

const SlideMarkDown = (props) => {
  const getSpriteIcon = useCallback((spriteId) => {
    if (!spriteId) return null;

    let icon;

    if (spriteId.startsWith("textbox")) {
      icon = AssetLibrary.textboxThumb;
    } else {
      const name = spriteId.split("(")[0];
      const asset = AssetLibrary.getAssetByName(name);
      icon = asset && asset.thumb;
    }

    return icon;
  }, []);

  return (
    <div>
      {props.markdown ? (
        <ReactMarkdown skipHtml={false}>{props.markdown}</ReactMarkdown>
      ) : (
        <div>슬라이드 내용이 없습니다.</div>
      )}
    </div>
  );
};

export default SlideMarkDown;
