import React from "react";
import Localization from "../../Localization";
import { CATEGORY, BLOCK } from "../../OOBC/type";
import OOBC from "../../OOBC";
import "./index.scss";

import editDefault from "../../Image/edit-default.svg";
import editTouched from "../../Image/edit-touched.svg";

export const BlockGroup = props => {
  const { block } = props;
  switch (block.type) {
    case CATEGORY.CALLBACK:
      return <></>;
    case CATEGORY.OPERATOR:
      if (block.data === "!") {
        return getLogicalNotBlockGroup(props);
      } else {
        return getOperatorBlockGroup(props);
      }
    default:
      return getDefaultBlockGroup(props);
  }
};

function getDefaultBlockGroup(props) {
  const {
    context,
    block,
    currentBlock,
    onClickBlock,
    onClickConstantBlockEdit
  } = props;
  const blockElement = <Block {...props} />;
  const childsElement =
    block.children &&
    block.children.map(child => (
      <BlockGroup
        key={child.id}
        context={context}
        block={child}
        currentBlock={currentBlock}
        onClickBlock={onClickBlock}
        onClickConstantBlockEdit={onClickConstantBlockEdit}
      />
    ));
  return (
    <>
      {blockElement}
      {childsElement}
    </>
  );
}
function getOperatorBlockGroup(props) {
  const {
    context,
    block,
    currentBlock,
    onClickBlock,
    onClickConstantBlockEdit
  } = props;
  const blockElement = <Block {...props} />;
  return (
    <>
      <BlockGroup
        context={context}
        block={block.children[0]}
        currentBlock={currentBlock}
        onClickBlock={onClickBlock}
        onClickConstantBlockEdit={onClickConstantBlockEdit}
      />
      {blockElement}
      <BlockGroup
        context={context}
        block={block.children[1]}
        currentBlock={currentBlock}
        onClickBlock={onClickBlock}
        onClickConstantBlockEdit={onClickConstantBlockEdit}
      />
    </>
  );
}
function getLogicalNotBlockGroup(props) {
  const {
    context,
    block,
    currentBlock,
    onClickBlock,
    onClickConstantBlockEdit
  } = props;
  const blockElement = <Block {...props} />;
  return (
    <>
      {blockElement}
      <BlockGroup
        context={context}
        block={block.children[0]}
        currentBlock={currentBlock}
        onClickBlock={onClickBlock}
        onClickConstantBlockEdit={onClickConstantBlockEdit}
      />
    </>
  );
}

export const Block = props => {
  const {
    context,
    block,
    currentBlock,
    disabled,
    onClickBlock,
    onClickConstantBlockEdit
  } = props;
  const current = block === currentBlock;
  const blockClassName = getClassNameFor(block);
  const backgroundElement = getBackgroundElementOf(block);
  const contentsElement = getContentElementOf(block, context);
  const showEditElement = isEditable(block) && block === currentBlock;
  return (
    <div
      id={`oobceditor_block-${block.id}`}
      className={`oobceditor_block oobceditor_block-${block.state.toLowerCase()} oobceditor_block-${blockClassName}${
        current ? " oobceditor_block-current" : ""
      }${disabled ? " oobceditor_block-disabled" : ""}`}
      onClick={e => {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        onClickBlock(block);
      }}
      onContextMenu={e => {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
      }}
      onTouchStart={e => {
        e.target.classList.add("oobceditor_block-touched");
      }}
      onTouchEnd={e => {
        e.target.classList.remove("oobceditor_block-touched");
      }}
    >
      {backgroundElement}
      {contentsElement}
      {showEditElement && (
        <EditElement
          block={block}
          onClickEdit={() => {
            onClickConstantBlockEdit(block);
          }}
        />
      )}
    </div>
  );
};

function getBackgroundElementOf(block) {
  if (block.category === CATEGORY.CALLBACK) return null;

  let backgroundSrcKey = getBackgroundSrcKeyOf(block);
  if (isStretchableBlock(block)) {
    return (
      <div className="oobceditor_block_background">
        <img
          className="oobceditor_block_background_img oobceditor_block_background_img-left"
          src={require(`../../Image/BlockBackground/block_${backgroundSrcKey}-left.png`)}
          alt="background-left"
        />
        <div
          className="oobceditor_block_background_img oobceditor_block_background_img-center"
          style={{
            backgroundImage: `url(${require(`../../Image/BlockBackground/block_${backgroundSrcKey}-center.png`)})`
          }}
        />
        <img
          className="oobceditor_block_background_img oobceditor_block_background_img-right"
          src={require(`../../Image/BlockBackground/block_${backgroundSrcKey}-right.png`)}
          alt="background-right"
        />
      </div>
    );
  } else {
    const extension = backgroundSrcKey === "empty" ? "svg" : "png";
    const backgroundImg = block.backgroundImg || require(`../../Image/BlockBackground/block_${backgroundSrcKey}.${extension}`);
    return (
      <div className="oobceditor_block_background">
        <img
          className="oobceditor_block_background_img"
          src={backgroundImg}
          alt="background"
        />
      </div>
    );
  }
}
function getBackgroundSrcKeyOf(block) {
  const category = block.category;
  let backgroundSrcKey = category
    ? category[0].toLowerCase() + category.slice(1)
    : "empty";

  if (category === CATEGORY.ACTION) {
    const onActions = [
      "onOverlap",
      "onOverlapOnce",
      "onKey",
      "onKeyUp",
      "onTouch",
      "onTouchUp",
      "onOut",
      "onFrame",
      "onTouch",
      "onTouchUp",
      "onSignal",
      "onSwipe",
      "onShake",
      "speak"
    ];
    if (onActions.includes(block.data)) {
      backgroundSrcKey = "onAction";
    }
  }

  return backgroundSrcKey;
}
function isStretchableBlock(block) {
  return [
    CATEGORY.GAMEOBJECT,
    CATEGORY.PROPERTY,
    CATEGORY.CONSTANT,
    CATEGORY.VARIABLE,
    CATEGORY.UTIL,
    CATEGORY.ACTION
  ].includes(block.category);
}

function getContentElementOf(block, context) {
  let contents;
  switch (block.category) {
    case CATEGORY.GAMEOBJECT:
      contents = getContentOfGameObject(block, context);
      break;
    case CATEGORY.PROPERTY:
      contents = getContentOfPropety(block);
      break;
    case CATEGORY.ACTION:
      contents = getContentOfAction(block);
      break;
    case CATEGORY.CONSTANT:
      contents = getContentOfConstant(block);
      break;
    default:
      contents = getDefaultContentElementOf(block);
      break;
  }
  return <div className="oobceditor_block_contents">{contents}</div>;
}
function getDefaultContentElementOf(block) {
  const displayData = block.data;
  return <div className="oobceditor_block_contents_title">{displayData}</div>;
}

function getContentOfGameObject(gameObject, context) {
  const className = getClassNameFor(gameObject);

  let content;
  switch (gameObject.type) {
    case BLOCK.TEXT:
      content = getContentOfText(gameObject);
      break;
    case BLOCK.SOUND:
      content = getContentOfSound(gameObject);
      break;
    default:
      content = getContentOfDefaultGameObject(gameObject, context);
      break;
  }

  return (
    <div
      className={`oobceditor_block_contents_sprite oobceditor_block_contents_sprite-${className}`}
    >
      {content}
    </div>
  );
}
function getContentOfDefaultGameObject(gameObject, context) {
  const gameObjectName = gameObject.data;
  let thumbnailSrc = gameObject.thumbnailSrc;
  if (!thumbnailSrc) {
    const gameObjectsInfo =
      context && context.getGameObjectInfoWithName(gameObjectName);
    thumbnailSrc = gameObjectsInfo && gameObjectsInfo.thumbnailSrc;
  }
  const copyId = getGameObjectCopyId(gameObject);
  return (
    <>
      <img
        className="oobceditor_block_contents_sprite_img"
        src={thumbnailSrc}
        alt={gameObjectName}
      />
      {copyId && (
        <div className="oobceditor_block_contents_sprite_copyId">{copyId}</div>
      )}
    </>
  );
}
function getContentOfText(text) {
  return (
    <>
      <img
        className="oobceditor_block_contents_sprite_img"
        src={require("../../Image/GameObject/block_sprite_text.png")}
        alt={text.data}
      />
      <div className="oobceditor_block_contents_sprite_title">{text.data}</div>
    </>
  );
}
function getContentOfSound(sound) {
  return (
    <>
      <img
        className="oobceditor_block_contents_sprite_img"
        src={require("../../Image/GameObject/block_sprite_sound.png")}
        alt={sound.data}
      />
      <div className="oobceditor_block_contents_sprite_title">{sound.data}</div>
    </>
  );
}

function getContentOfPropety(property) {
  const formatMessageId =
    "ID_OOBC_BLOCK_PROPERTY_" + property.data.toUpperCase();
  const localizedProperty = Localization.formatWithId(formatMessageId);
  return (
    <div className="oobceditor_block_contents_title">{localizedProperty}</div>
  );
}

function getContentOfAction(action) {
  const actionName = action.data;
  const formatMessageId = "ID_OOBC_BLOCK_ACTION_" + actionName.toUpperCase();
  const localizedAction = Localization.formatWithId(formatMessageId);
  let actionImgSrc;
  try {
    actionImgSrc = require(`../../Image/Action/action_${actionName}.svg`);
  } catch {}
  return (
    <>
      {actionImgSrc && (
        <img
          className="oobceditor_block_contents_img"
          src={actionImgSrc}
          alt={actionName}
        />
      )}
      <div
        className={`oobceditor_block_contents_title${
          actionImgSrc ? " oobceditor_block_contents_title-action" : ""
        }`}
      >
        {localizedAction}
      </div>
    </>
  );
}

function getContentOfConstant(constant) {
  let content;
  switch (constant.type) {
    case BLOCK.NUMBERBLOCK:
      content = getContentOfNumber(constant);
      break;
    case BLOCK.STRINGBLOCK:
      content = getContentOfString(constant);
      break;
    case BLOCK.SCENE:
      content = getContentOfScene(constant);
      break;
    case BLOCK.ANIMATION:
      content = getContentOfAnimation(constant);
      break;
    case BLOCK.DIRECTION:
      content = getContentOfDirection(constant);
      break;
    case BLOCK.KEY:
      content = getContentOfKey(constant);
      break;
    case BLOCK.POSITION:
      content = getContentOfPosition(constant);
      break;
    case BLOCK.RANDOM:
      content = getContentOfRandom(constant);
      break;
    case BLOCK.TOUCH:
      content = getContentOfTouch(constant);
      break;
    case BLOCK.TIME:
      content = getContentOfTime(constant);
      break;
    default:
      content = getContentOfDefaultConstant(constant);
      break;
  }
  return content;
}
function getContentOfDefaultConstant(constant) {
  const displayConstant = constant.data;
  return (
    <div className="oobceditor_block_contents_title">{displayConstant}</div>
  );
}
function getContentOfString(string) {
  let displayString = string.data;
  if (displayString === null) {
    displayString = Localization.formatWithId("ID_OOBC_BLOCK_STRING_DEFAULT");
  }
  return <div className="oobceditor_block_contents_title">{displayString}</div>;
}
function getContentOfNumber(number) {
  let displayNumber = number.data;
  if (displayNumber === null) {
    displayNumber = Localization.formatWithId("ID_OOBC_BLOCK_NUMBER_DEFAULT");
  }
  return <div className="oobceditor_block_contents_title">{displayNumber}</div>;
}
function getContentOfScene(scene) {
  let displayScene = Localization.locale === "zh" ? "画面" : "scene";
  displayScene += scene.data.split("scene")[1];
  return <div className="oobceditor_block_contents_title">{displayScene}</div>;
}
function getContentOfAnimation(animation) {
  let animationName = animation.data;
  if (Localization.locale === "zh") {
    animationName = zhAnimationNames[animationName] || animationName;
  }
  return <div className="oobceditor_block_contents_title">{animationName}</div>;
}
const zhAnimationNames = {
  attack: "攻击",
  back_attack: "背面_攻击",
  back_fly: "背面_飞行",
  back_fly_idle: "背面_飞行_空闲",
  back_idle: "背面_空闲",
  back_move: "背面_移动",
  back_run: "背面_奔跑",
  back_walk: "背面_走路",
  blue: "蓝色",
  death: "阵亡",
  error: "错误",
  fail: "失败",
  fail_b: "失败_b",
  falling: "掉落",
  fly: "飞行",
  front_attack: "正面_攻击",
  front_fly: "正面_飞行",
  front_fly_idle: "正面_飞行_空闲",
  front_idle: "正面_空闲",
  fx: "特效",
  happy: "开心",
  heart: "爱心",
  hit: "撞击",
  idle: "空闲",
  jump: "跳跃",
  left_fly: "向左飞行",
  left_hit: "左_撞击",
  left_victory: "左_胜利",
  move: "移动",
  open: "打开",
  purple: "紫色",
  red: "红色",
  right_fly: "向右飞行",
  right_hit: "右_撞击",
  right_victory: "右_胜利",
  run: "奔跑",
  run_sad: "奔跑_伤心",
  save: "救助",
  seat: "坐下",
  shoot: "发射",
  side_attack: "侧面_攻击",
  side_fly: "侧面_飞行",
  side_fly_idle: "侧面_飞行_空闲",
  side_flyattack: "侧向飞行",
  side_idle: "侧面_空闲",
  side_jump: "侧面_跳跃",
  side_move: "侧面_移动",
  side_run: "侧向奔跑",
  side_walk: "侧面_走路",
  skill: "技能",
  skill_a: "技能_a",
  skill_b: "技能_b",
  skill_c: "技能_c",
  skyblue: "天蓝色",
  stop_a: "停止_a",
  stop_b: "停止_b",
  tap: "轻拍",
  up: "上",
  victory: "胜利",
  walk: "走路",
  walk2: "走路2",
  white: "白色"
};
function getContentOfDirection(direction) {
  let directionName = direction.data;
  let directionImgSrc;
  try {
    directionImgSrc = require(`../../Image/Direction/direction_${directionName}.svg`);
  } catch (err) {}
  if (Localization.locale === "zh") {
    directionName = { up: "上", down: "下", left: "左", right: "右" }[
      directionName
    ];
  }
  return (
    <>
      <img
        className="oobceditor_block_contents_img"
        src={directionImgSrc}
        alt={directionName}
      />
      <div className="oobceditor_block_contents_title oobceditor_block_contents_title-direction">
        {directionName}
      </div>
    </>
  );
}
function getContentOfKey(key) {
  return <div className="oobceditor_block_contents_title">{key.data || "key"}</div>;
}
function getContentOfPosition(position) {
  const { x, y } = position.data;
  const displayPosition = `X:${x} Y:${y}`;
  return (
    <div className="oobceditor_block_contents_title">{displayPosition}</div>
  );
}
function getContentOfRandom(random) {
  let displayRandom = Localization.formatWithId(
    "ID_OOBC_BLOCK_CONSTANT_RANDOM"
  );
  return <div className="oobceditor_block_contents_title">{displayRandom}</div>;
}
function getContentOfTouch(touch) {
  let displayTouch = Localization.formatWithId("ID_OOBC_BLOCK_CONSTANT_TOUCH");
  return <div className="oobceditor_block_contents_title">{displayTouch}</div>;
}
function getContentOfTime(time) {
  let displayTime = Localization.formatWithId("ID_OOBC_BLOCK_CONSTANT_TIME");
  return <div className="oobceditor_block_contents_title">{displayTime}</div>;
}

function getClassNameFor(block) {
  const loweredFirst = block.type[0].toLowerCase() + block.type.slice(1);
  return loweredFirst;
}
function getGameObjectCopyId(gameObject) {
  const gameObjectName = gameObject.data;
  const regexExp = /(?!\()-?\d+(?=\))/g
  const matches = gameObjectName.match(regexExp);

  if(matches) {
    return parseInt(matches[0]);
  } else {
    return null;
  }
}

function isEditable(block) {
  return [BLOCK.NUMBERBLOCK, BLOCK.STRINGBLOCK, BLOCK.KEY, BLOCK.POSITION].includes(
    block.type
  );
}
function EditElement(props) {
  const { block, onClickEdit } = props;
  return (
    <div
      className="oobceditor_block_edit"
      onClick={e => {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        onClickEdit(block);
      }}
    >
      <img
        className="oobceditor_block_edit_img"
        src={editDefault}
        alt="edit"
        onTouchStart={e => {
          e.target.src = editTouched;
        }}
        onTouchEnd={e => {
          e.target.src = editDefault;
        }}
      />
    </div>
  );
}

export const AddVarBlock = props => {
  const block = new OOBC.Variable({
    state: OOBC.TYPE.STATE.PROTOTYPE,
    data: "+"
  });
  return <Block block={block} onClickBlock={props.onClickBlock} />;
};
