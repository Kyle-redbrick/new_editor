import React from "react";
import Localization from "../../Localization";
import OOBC from "../../OOBC";
import { Block, AddVarBlock } from "../Block";
import "./index.scss";

export const MODE = {
  FLOAT: "float",
  BOTTOM: "bottom"
};
export const defaultMode = MODE.BOTTOM;

export default function (props) {
  const {
    mode = defaultMode,
    context,
    currentBlock,
    selectorInfo,
    onClickPrototypeBlock,
    onClickAddGlobalVar,
    onClickSelectorCategory,
  } = props;

  const isOn = !!currentBlock;
  const selectorStyle = { ...getSelectorRect({ mode,block: currentBlock }) };

  return (
    <div
      className={`oobceditor_selector oobceditor_selector-${isOn ? "on" : "off"} oobceditor_selector-${mode}`}
      style={selectorStyle}
    >
      {selectorInfo && (
        <>
          <div className="oobceditor_selector_categories">
            {selectorInfo.categories.map(category => (
              <Category
                key={category}
                category={category}
                isCurrent={category === selectorInfo.currentCategory}
                onClick={() => {
                  onClickSelectorCategory(category);
                }}
              />
            ))}
          </div>
          <div className="oobceditor_selector_prototypes">
            <div className="oobceditor_selector_prototypes_inner">
              {selectorInfo.currentCategory === OOBC.TYPE.CATEGORY.VARIABLE && (
                <AddVarBlock onClickBlock={onClickAddGlobalVar} />
              )}
              {selectorInfo.currentCategory &&
                selectorInfo.prototypeBlocksOf[
                  selectorInfo.currentCategory
                ].map((prototypeBlock, index) => (
                  <Block
                    key={index}
                    context={context}
                    block={prototypeBlock}
                    disabled={selectorInfo.disabledPrototypeBlocks.includes(
                      prototypeBlock
                    )}
                    onClickBlock={onClickPrototypeBlock}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function getSelectorRect(option) {
  const rect = {};

  switch (option.mode) {
    case MODE.FLOAT:
      if(!option.block) {
        break;
      }

      const contextElement = document.getElementById("oobceditor_context");
      const blockElement = document.getElementById("oobceditor_block-" + option.block.id);
      if(!contextElement || !blockElement) {
        break;
      }

      const contextRect = contextElement.getBoundingClientRect();
      const blockRect = blockElement.getBoundingClientRect();
      rect.left = blockRect.left - contextRect.left;
      rect.top = blockRect.top - contextRect.top + blockRect.height + 12;
      rect.height = blockRect.height * 4.5;
      rect.width = rect.height * 2.5;
      break;

    case MODE.BOTTOM:
    default:
      rect.bottom = 0;
      rect.left = 0;
      rect.width = "calc(100% - 24px)";
      rect.height = "50%";
      break;
  }

  return rect;
}

function Category(props) {
  const { category, isCurrent, onClick } = props;
  const formatMessageId = `ID_OOBC_BLOCK_CATEGORY_${category.toUpperCase()}`;
  const formattedCategory = Localization.formatWithId(formatMessageId);
  return (
    <div
      id={`oobceditor_selector_category-${category}`}
      className={`oobceditor_selector_category${
        isCurrent ? " oobceditor_selector_category-current" : ""
      }`}
      onClick={onClick}
    >
      {formattedCategory}
    </div>
  );
}
