import React, { useState, useEffect } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import View from "./View";

export default function LessonEditor(props) {
  const {
    lessonId,
    reload,
    setReload,
    lessonValues,
    setLessonValues,
    menuIndex,
    setMenuIndex,
  } = props;
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [projectId, setProjectId] = useState("");
  const [missionTime, setMissionTime] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [runMethod, setRunMethod] = useState("");
  const [lessonTags, setLessonTags] = useState("");
  const [objective, setObjective] = useState([""]);
  const [lessonKeyCommands, setLessonKeyCommands] = useState("");
  const [template, setTemplate] = useState("");
  const [totalMissionNum, setTotalMissionNum] = useState(0);
  const [defaultTemplate, setDefaultTemplate] = useState("");

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
        setObjective(JSON.parse(lessonInfo.objective));
        setLessonTags(lessonInfo.lessonTags);
        setLessonKeyCommands(lessonInfo.lessonKeyCommands);
        setTemplate(lessonInfo.template || "");
        setDefaultTemplate(lessonInfo.template || "");
        setTotalMissionNum(lessonInfo.totalMissionNumber || 0);
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
      lessonTags: lessonTags,
      objective: objective,
      lessonKeyCommands: lessonKeyCommands,
      template: template,
      totalMissionNum: totalMissionNum,
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
    lessonTags,
    objective,
    lessonKeyCommands,
    template,
    totalMissionNum,
  ]);

  return (
    <View
      lessonId={lessonId}
      lessonValues={lessonValues}
      setTitle={setTitle}
      setThumbnailURL={setThumbnailURL}
      setIsVisible={setIsVisible}
      setLanguage={setLanguage}
      setObjective={setObjective}
      menuIndex={menuIndex}
      setMenuIndex={setMenuIndex}
      deleteLessonHandler={deleteLessonHandler}
      setProjectId={setProjectId}
      setRunMethod={setRunMethod}
      setDifficulty={setDifficulty}
      setMissionTime={setMissionTime}
      setLessonTags={setLessonTags}
      setLessonKeyCommands={setLessonKeyCommands}
      template={template}
      totalMissionNum={totalMissionNum}
      setTemplate={setTemplate}
      setTotalMissionNum={setTotalMissionNum}
      defaultTemplate={defaultTemplate}
    />
  );
}
