import React from "react";
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

const getBlockProcessingInstruction = (options) => ({
  shouldProcessNode: (node) => {
    return node.name === "oobc";
  },
  processNode: (node) => {
    const { getSpriteIcon } = options || {};
    const { type, data, data2 } = node.attribs;
    const block = OOBC.Block.fromJSON({
      constructor: type,
      state: OOBC.TYPE.STATE.PROTOTYPE,
      data,
    });

    switch (type) {
      case "Sprite":
      case "Screen":
        if (getSpriteIcon) {
          block.thumbnailSrc = getSpriteIcon(data);
        }
        break;
      case "Position":
        block.data = { x: data, y: data2 };
        break;
      default:
        break;
    }

    if (block.type === "Block") {
      block.backgroundImg = emptyBlockImg;
    }

    return (
      <span className="inline_oobc">
        <Block block={block} />
      </span>
    );
  },
});

const iconProcessingInstruction = {
  shouldProcessNode: (node) => {
    return node.name === "icon";
  },
  processNode: (node, children) => {
    const { type } = node.attribs;
    const src = iconSrcMap[type];
    return <img className="inline_icon" src={src} alt={type} />;
  },
};

const videoProcessingInstruction = {
  shouldProcessNode: (node) => {
    return node.name === "video";
  },
  // eslint-disable-next-line react/display-name
  processNode: (node, children) => {
    const { src, poster, loop, muted, autoplay, ...otherAttribs } =
      node.attribs;
    return (
      <video
        {...otherAttribs}
        className="media_video"
        src={src && src.GET_IMAGE()}
        poster={poster && poster.GET_IMAGE()}
        // src={src && src.toDreamclassS3URL()}
        // poster={poster && poster.toDreamclassS3URL()}
        loop={loop === "true" || false}
        muted={muted === "true" || true}
        autoPlay={autoplay === "true" || false}
        controlsList="nodownload"
        disablePictureInPicture
        playsInline
      />
    );
  },
};

const imgProcessingInstruction = {
  shouldProcessNode: (node) => {
    return node.name === "img";
  },
  // eslint-disable-next-line react/display-name
  processNode: (node, children) => {
    let src = node.attribs.src;
    if (src && !src.startsWith("http")) {
      src = src.THUMBNAIL_ALI();
      // src = src.toDreamclassS3URL();
    }
    return (
      <img
        {...node.attribs}
        className="media_img"
        src={src}
        alt={node.attribs.src}
      />
    );
  },
};

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

const defaultProcessingIntructions = {
  shouldProcessNode: () => true,
  processNode: processNodeDefinitions.processDefaultNode,
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