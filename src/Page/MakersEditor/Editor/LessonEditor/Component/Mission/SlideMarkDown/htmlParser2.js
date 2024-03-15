import React, { useCallback } from "react";
import AssetLibrary from "../../../../../../../Common/Util/assetLibrary";
import HtmlToReact from "html-to-react";
// import HtmlParser from "react-markdown/plugins/html-parser";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import { visit } from "unist-util-visit";

// import AssetLibrary from "../../../Page/Builder/utils/assetLibrary";
import OOBC from "../OOBCEditor/OOBC";
import { Block } from "../OOBCEditor/Component/Block";

import playImg from "../../../../../../../Image/btn-play.svg";
import emptyBlockImg from "../../../../../../../Image/slide_block_empty.svg";

export const CustomOOBC = ({ type, data, data2 }) => {
  let block = OOBC.Block.fromJSON({
    constructor: type,
    data,
    state: OOBC.TYPE.STATE.PROTOTYPE,
  });

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

  switch (type) {
    case "Sprite":
    case "Screen":
      block.thumbnailSrc = getSpriteIcon(data);

      break;
    case "Position":
      block.data = { x: data, y: data2 };
      break;
    default:
      break;
  }

  if (type === "Block") {
    block.backgroundImg = emptyBlockImg;
  }

  return (
    <span className="inline_oobc">
      <Block block={block} />
    </span>
  );
};

export const CustomImg = ({ src, ...otherAttribs }) => {
  const processedSrc =
    src && src.startsWith("http")
      ? `${src}`
      : `${process.env.REACT_APP_GET_IMAGE}${src}`;
  return (
    <img
      {...otherAttribs}
      className="media_img"
      src={processedSrc}
      alt={otherAttribs.alt || "Image"}
    />
  );
};

export const CustomVideo = ({
  src,
  poster,
  loop,
  muted,
  autoplay,
  ...otherAttribs
}) => {
  const processedSrc =
    src && src.startsWith("http")
      ? `${src}`
      : `${process.env.REACT_APP_GET_IMAGE}${src}`;
  return (
    <video
      {...otherAttribs}
      className="media_video"
      src={processedSrc}
      poster={poster && poster.GET_IMAGE()}
      loop={loop === "true"}
      muted={muted === "true"}
      //   autoPlay={autoplay === "true"}
      autoPlay={true}
      controlsList="nodownload"
      disablePictureInPicture
      playsInline
    />
  );
};

const iconSrcMap = {
  play: playImg,
};

export const CustomIcon = ({ type, ...otherAttribs }) => {
  const src = iconSrcMap[type] || "";
  if (otherAttribs && otherAttribs.children) {
    return (
      <>
        <img className="inline_icon" src={src} alt={type} />
        {otherAttribs.children}
      </>
    );
  } else {
    return (
      <img {...otherAttribs} className="inline_icon" src={src} alt={type} />
    );
  }
};
