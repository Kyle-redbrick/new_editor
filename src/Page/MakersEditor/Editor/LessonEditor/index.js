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
      });
  }, [lessonId, reload]);

  useEffect(() => {
    setLessonValues({
      title: title,
      language: language,
      thumbnailURL: thumbnailURL,
      isVisible: isVisible,
    });
  }, [title, language, thumbnailURL, isVisible]);

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
    />
  );
}
