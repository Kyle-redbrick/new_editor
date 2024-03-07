import React from "react";
import Localization from "../../Localization";
import "./index.scss";

export default function (props) {
  const { contextMenuInfo, onClickLineContextMenu } = props;
  const { line, contextMenuIds = [], style } = contextMenuInfo || {};
  return (
    <div
      style={style}
      className={`oobceditor_contextmenus oobceditor_contextmenus-${
        contextMenuInfo ? "on" : "off"
      }`}
    >
      {contextMenuIds.map(contextMenuId => (
        <ContextMenu
          key={contextMenuId}
          contextMenuId={contextMenuId}
          onClickLineContextMenu={contextMenuId => {
            onClickLineContextMenu(line, contextMenuId);
          }}
        />
      ))}
    </div>
  );
}

function ContextMenu(props) {
  const { contextMenuId, onClickLineContextMenu } = props;
  const formatMessageId = `ID_OOBC_CONTEXTMENU_${contextMenuId.toUpperCase()}`;
  const title = Localization.formatWithId(formatMessageId);
  const icon = require(`../../Image/ContextMenu/${contextMenuId}.png`);
  return (
    <div
      key={contextMenuId}
      className={`oobceditor_contextmenu oobceditor_contextmenu-${contextMenuId}`}
      onClick={() => {
        onClickLineContextMenu(contextMenuId);
      }}
    >
      <img src={icon} alt={contextMenuId} />
      {title}
    </div>
  );
}
