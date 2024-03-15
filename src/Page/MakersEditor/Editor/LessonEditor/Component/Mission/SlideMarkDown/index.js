import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import AssetLibrary from "../../../../../../../Common/Util/assetLibrary";
import CodeRenderer from "./codeRenderer";
import { htmlParserWith } from "./htmlParser";
import {
  addBaseToVideoSrc,
  CustomVideo,
  CustomImg,
  CustomIcon,
  CustomOOBC,
} from "./htmlParser2";
import "./index.scss";
import rehypeParse from "rehype-parse";

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
    <div className="dreamslide" ref={props.slideRef}>
      {props.markdown ? (
        <ReactMarkdown
          // skipHtml={false}
          // rehypePlugins={[rehypeRaw]}  // 얘가 되는 것
          rehypePlugins={[rehypeRaw]}
          // rehypePlugins={[htmlParserWith]}
          // rehypePlugins={[htmlParserWith({ getSpriteIcon: getSpriteIcon })]}
          components={{
            code: (props) => (
              <CodeRenderer {...props} getSpriteIcon={getSpriteIcon} />
            ),
            video: CustomVideo,
            icon: CustomIcon,
            img: CustomImg,
            oobc: CustomOOBC,
          }}
        >
          {props.markdown}
        </ReactMarkdown>
      ) : (
        <div>슬라이드 내용이 없습니다.</div>
      )}
    </div>
  );
};

export default SlideMarkDown;
