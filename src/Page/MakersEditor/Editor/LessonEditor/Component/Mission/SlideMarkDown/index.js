import React, { useCallback } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import AssetLibrary from "../../../../../../../Common/Util/assetLibrary";
import CodeRenderer from "./codeRenderer";
import { CustomVideo, CustomImg, CustomIcon, CustomOOBC } from "./htmlParser2";
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
    <div className="dreamslide" ref={props.slideRef}>
      {props.markdown ? (
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            code: (props) => {
              return <CodeRenderer {...props} getSpriteIcon={getSpriteIcon} />;
            },
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
