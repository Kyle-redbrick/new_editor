import React from "react";
import TabMenu from "./Component/TabMenu";
import Information from "./Component/Information";
import Execution from "./Component/Execution";
import Introduce from "./Component/Introduce";
import Mission from "./Component/Mission";
import "./index.scss";

export default function View(props) {
  const { menuIndex, setMenuIndex } = props;
  const menuList = {
    0: <Information />,
    1: <Execution />,
    2: <Introduce />,
    3: <Mission />,
  };
  return (
    <>
      <TabMenu menuIndex={menuIndex} setMenuIndex={setMenuIndex} />
      <div className="makersEditor-Editor-body-Content">
        {menuList[menuIndex]}
      </div>
    </>
  );
}
