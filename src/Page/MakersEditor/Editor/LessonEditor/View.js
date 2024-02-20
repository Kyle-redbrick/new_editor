import React from "react";
import TabMenu from "./Component/TabMenu";
import Information from "./Component/Information";
import Execution from "./Component/Execution";
import Introduce from "./Component/Introduce";
import Mission from "./Component/Mission";
import "./index.scss";

export default function View(props) {
  const {
    lessonId,
    menuIndex,
    setMenuIndex,
    lessonValues,
    setTitle,
    setLanguage,
    setIsVisible,
    setThumbnailURL,
  } = props;
  const menuList = {
    0: (
      <Information
        lessonId={lessonId}
        lessonValues={lessonValues}
        setTitle={setTitle}
        setThumbnailURL={setThumbnailURL}
        setIsVisible={setIsVisible}
        setLanguage={setLanguage}
      />
    ),
    1: (
      <Execution
        lessonId={lessonId}
        lessonValues={lessonValues}
        setTitle={setTitle}
        setThumbnailURL={setThumbnailURL}
        setIsVisible={setIsVisible}
        setLanguage={setLanguage}
      />
    ),
    2: (
      <Introduce
        lessonId={lessonId}
        lessonValues={lessonValues}
        setTitle={setTitle}
        setThumbnailURL={setThumbnailURL}
        setIsVisible={setIsVisible}
        setLanguage={setLanguage}
      />
    ),
    3: (
      <Mission
        lessonValues={lessonValues}
        lessonId={lessonId}
        setTitle={setTitle}
        setThumbnailURL={setThumbnailURL}
        setIsVisible={setIsVisible}
        setLanguage={setLanguage}
      />
    ),
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