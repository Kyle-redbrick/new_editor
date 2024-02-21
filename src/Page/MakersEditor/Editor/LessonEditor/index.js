import React, { useState, useEffect } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import View from "./View";

export default function LessonEditor(props) {
  const { lessonId, reload, setReload, lessonValues, setLessonValues } = props;
  const [menuIndex, setMenuIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [projectId, setProjectId] = useState("");
  const [missionTime, setMissionTime] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [runMethod, setRunMethod] = useState("");

  const deleteLessonHandler = (lessonId) => {
    request
      .deleteLesson(lessonId)
      .then((res) => res.json())
      .then(() => {
        localStorage.removeItem("makersEditorSelectedElement");
        window.location.reload();
      });
  };

  useEffect(() => {
    request
      .getLesson(lessonId)
      .then((res) => res.json())
      .then((json) => {
        let lessonInfo = json.data.lessonInfo;
        setTitle(lessonInfo.title);
        setLanguage(lessonInfo.language);
        setThumbnailURL(lessonInfo.thumbnailURL);
        setIsVisible(lessonInfo.isVisible);
        setProjectId(lessonInfo.projectId);
        setRunMethod(lessonInfo.runMethod);
        setMissionTime(lessonInfo.missionTime);
        setDifficulty(lessonInfo.difficulty);
      });
  }, [lessonId, reload]);

  useEffect(() => {
    setLessonValues({
      title: title,
      language: language,
      thumbnailURL: thumbnailURL,
      isVisible: isVisible,
      projectId: projectId,
      runMethod: runMethod,
      missionTime: missionTime,
      difficulty: difficulty,
    });
  }, [
    title,
    language,
    thumbnailURL,
    isVisible,
    projectId,
    runMethod,
    difficulty,
    missionTime,
  ]);

  return (
    <View
      lessonId={lessonId}
      lessonValues={lessonValues}
      setTitle={setTitle}
      setThumbnailURL={setThumbnailURL}
      setIsVisible={setIsVisible}
      setLanguage={setLanguage}
      menuIndex={menuIndex}
      setMenuIndex={setMenuIndex}
      deleteLessonHandler={deleteLessonHandler}
      setProjectId={setProjectId}
      setRunMethod={setRunMethod}
      setDifficulty={setDifficulty}
      setMissionTime={setMissionTime}
    />
  );
}
