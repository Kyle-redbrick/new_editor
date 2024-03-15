import React, { useState, useEffect, useRef } from "react";

import Clipboard from "../../../../../../../Common/Util/Clipboard";

import lockImg from "../../../../../../../Image/course-content--lock.svg";
import dropdownIconUp from "../../../../../../../Image/dropdown-up.svg";
import dropdownIconDown from "../../../../../../../Image/dropdown-down.svg";
import copyIcon from "../../../../../../../Image/slide_code_copy.svg";

import Context from "../OOBCEditor/Component/Context";
import { LineGroup, Line } from "../OOBCEditor/Component/Line";
import { BlockGroup } from "../OOBCEditor/Component/Block";
import OOBC from "../OOBCEditor/OOBC";

const CodeRenderer = (props) => {
  const [isFolded, setIsFolded] = useState(true);
  const [isShow, setIsShow] = useState(true);

  const onClickDrop = () => setIsFolded(!isFolded);
  const onClickCopy = () => Clipboard.copy(props.children || "");

  const spriteId = props.node.meta;
  const id = spriteId + "_" + props.node.position.start.line;
  const icon = props.getSpriteIcon ? props.getSpriteIcon(spriteId) : null;

  return (
    <div id={"codeblock-" + id} className="codeblock">
      <div className="codeblock_header">
        <img className="codeblock_header_icon" src={icon} alt={spriteId} />
        <div className="codeblock_header_spriteId">{spriteId}</div>
        <img
          className="codeblock_header_dropdown"
          src={isFolded ? dropdownIconDown : dropdownIconUp}
          alt="dropdown"
          onClick={onClickDrop}
        />
      </div>
      {!isFolded && (
        <div className="codeblock_body">
          {isShow ? (
            <Code
              id={id}
              isShow={isShow}
              language={props.language}
              code={props.children || ""}
              getSpriteIcon={props.getSpriteIcon}
            />
          ) : (
            <div className="not_show_codeblock">
              <img src={lockImg} alt="" />
            </div>
          )}
          {props.language !== "oobc" && (
            <div className="codeblock_body_copy" onClick={onClickCopy}>
              <img src={copyIcon} alt="copy" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function Code(props) {
  const { language } = props;
  switch (language) {
    case "oobc":
      return <OOBCCode {...props} />;
    default:
      return <DefaultCode {...props} />;
  }
}

function OOBCCode(props) {
  const { code, getSpriteIcon } = props;
  try {
    const contextJSON = JSON.parse(code);
    const context = OOBC.Context.fromJSON(contextJSON);

    if (getSpriteIcon) {
      OOBC.Context.traverse(context, {
        onBlock: (block) => {
          if (block instanceof OOBC.GameObject) {
            block.thumbnailSrc = getSpriteIcon(block.data);
          }
        },
      });
    }

    return (
      <div className="codeblock_oobc oobceditor">
        <Context>
          <LineGroup>
            {context.getDisplayLines().map((line) => (
              <Line key={line.id} line={line}>
                <BlockGroup context={context} block={line.block} />
              </Line>
            ))}
          </LineGroup>
        </Context>
      </div>
    );
  } catch (err) {
    console.warn(err);
    return null;
  }
}

const DefaultCode = ({ id, code }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = window.ace.edit(editorRef.current);
    editor.session.setMode(`ace/mode/javascript-wiz`);
    editor.getSession().setUseWorker(false);
    editor.setTheme("ace/theme/wizschool");
    editor.setOptions({ maxLines: Infinity });
    editor.setFontSize(18);
    editor.setValue(code, 1);
    editor.setReadOnly(true);
  }, [code]);

  return (
    <div
      id={"codeblock_code-" + id}
      ref={editorRef}
      className="codeblock_code"
    />
  );
};

export default CodeRenderer;
