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
    setObjective,
    setProjectId,
    setRunMethod,
    setDifficulty,
    setMissionTime,
    deleteLessonHandler,
    setLessonTags,
    setLessonKeyCommands,
    template,
    setTemplate,
    totalMissionNum,
    setTotalMissionNum,
    defaultTemplate,
  } = props;
  const menuList = {
    0: (
      <Information
        deleteLessonHandler={deleteLessonHandler}
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
        setProjectId={setProjectId}
        setRunMethod={setRunMethod}
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
        setDifficulty={setDifficulty}
        setMissionTime={setMissionTime}
        setLessonTags={setLessonTags}
        setObjective={setObjective}
        setLessonKeyCommands={setLessonKeyCommands}
      />
    ),
    3: (
      <Mission
        defaultTemplate={defaultTemplate}
        setTotalMissionNum={setTotalMissionNum}
        setTemplate={setTemplate}
        lessonValues={lessonValues}
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
