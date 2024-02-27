import React from "react";
import "./index.scss";

export default function TabMenu(props) {
  const { menuIndex, setMenuIndex } = props;

  const tabs = ["OOBC", "JS"];

  return (
    <div className="makersEditor-Editor-body-TabMenu">
      {tabs.map((tab, index) => (
        <p
          key={index}
          className={
            `makersEditor-Editor-body-TabMenu__tab` +
            `${menuIndex === index ? " selected" : ""}`
          }
          onClick={() => setMenuIndex(index)}
        >
          {tab}
        </p>
      ))}
    </div>
  );
}
