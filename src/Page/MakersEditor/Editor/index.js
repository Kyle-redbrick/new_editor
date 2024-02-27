import React, { useState, useEffect } from "react";
import CourseEditor from "./CourseEditor";
import LessonEditor from "./LessonEditor";
import PopUp from "../../../Common/Component/PopUp";
import CreateLesson from "./CreateLesson";
import CommandDictionary from "./CommandDictionary";
import * as request from "../../../Common/Util/HTTPRequest";
import "./index.scss";

export default function Editor(props) {
  const { editorType, reload, setReload } = props;
  const [menuIndex, setMenuIndex] = useState(0);

  const [type, setType] = useState("");
  const [deletedIds, setDeletedIds] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [courseValues, setCourseValues] = useState("");
  const [lessonValues, setLessonValues] = useState("");
  const [createLessonValues, setCreateLessonValues] = useState("");
  const [courseSavePopUp, setCourseSavePopUp] = useState(false);
  const [lessonSavePopUp, setLessonSavePopUp] = useState(false);
  const [createLessonSavePopUp, setCreateLessonSavePopUp] = useState(false);
  const [commandDictionarySavePopUp, setCommandDictionarySavePopUp] =
    useState(false);
  const [commandList, setCommandList] = useState([]);

  useEffect(() => {
    if (editorType && editorType.selectedElement) {
      const newType = editorType.selectedElement.type;
      setType(newType);
      if (newType === "course") {
        setCourseId(editorType.selectedElement.id);
      } else if (newType === "lecture") {
        setLessonId(editorType.selectedElement.id);
      } else if (newType === "commandDictionary") {
        setCourseId("");
        setLessonId("");
      } else {
        setCourseId("");
        setLessonId("");
      }
    }
  }, [editorType]);

  const commandDictionarySaveHandler = () => {
    const newCommandList = commandList.map((command) => {
      const newItem = {
        commandName: command.commandName,
        description: command.description,
      };
      if (command.id !== undefined) {
        newItem.id = command.id;
      }
      return newItem;
    });

    request
      .updateCommandList({
        menuIndex,
        params: { commandList: newCommandList, deletedIds },
      })
      .then((res) => res.json())
      .then((json) => {
        if (json.commandName && json.commandName.length > 0) {
          alert(`${json.commandName} 명령어가 중복되었습니다.`);
        }
      });
  };

  const courseSaveHandler = () => {
    request.updateCourse(courseId, courseValues).then((res) => {
      res.json();
      setReload(!reload);
    });
  };

  const lessonSaveHandler = () => {
    if (typeof lessonValues.lessonKeyCommands === "string") {
      const keyCommands = lessonValues.lessonKeyCommands
        .split(",")
        .map(function (keyCommand) {
          return keyCommand.trim();
        });
      lessonValues.keyCommands = keyCommands;
    }

    if (typeof lessonValues.lessonTags === "string") {
      const tags = lessonValues.lessonTags.split(",").map(function (tag) {
        return tag.trim();
      });
      lessonValues.tags = tags;
    }
    delete lessonValues.lessonTags;
    delete lessonValues.lessonKeyCommands;
    request.updateLesson(lessonId, lessonValues).then((res) => {
      res.json();
      setType("");
      setReload(!reload);
    });
  };

  const createLessonSaveHandler = async ({ goToModifyPage }) => {
    const courseId = JSON.parse(
      localStorage.getItem("makersEditorSelectedElement")
    ).courseId;

    let newLessonOrder;
    await request
      .getCourseInfo(courseId)
      .then((res) => res.json())
      .then(
        (json) =>
          (newLessonOrder = json.data.courseInfo.courseLessonMappings.length)
      );

    request
      .addLesson(createLessonValues)
      .then((res) => res.json())
      .then((json) => {
        request
          .connectCourseAndLecture({
            courseId,
            lessonId: json.data.lessonInfo.id,
            order: newLessonOrder,
          })
          .then((res) => res.json())
          .then(() => {
            localStorage.setItem(
              "makersEditorSelectedElement",
              JSON.stringify({ type: "lecture", id: json.data.lessonInfo.id })
            );
            if (goToModifyPage) {
              setType("lecture");
              setLessonId(json.data.lessonInfo.id);
            } else {
              setType("");
            }
            setReload(!reload);
          });
      });
  };

  return (
    <div className="makersEditor-Editor">
      <div className="makersEditor-Editor-header">
        {type === "course" && (
          <div className="makersEditor-Editor-header__title">코스 수정하기</div>
        )}
        {type === "lecture" && (
          <div className="makersEditor-Editor-header__title">레슨 수정하기</div>
        )}
        {type === "addLesson" && (
          <div className="makersEditor-Editor-header__title">레슨 생성하기</div>
        )}
        {type === "commandDictionary" && (
          <div className="makersEditor-Editor-header__title">명령어 사전</div>
        )}
      </div>
      <div className="makersEditor-Editor-body">
        {type === "course" && (
          <CourseEditor
            courseId={courseId}
            reload={reload}
            setReload={setReload}
            setCourseValues={setCourseValues}
          />
        )}
        {type === "lecture" && (
          <LessonEditor
            lessonId={lessonId}
            reload={reload}
            setReload={setReload}
            lessonValues={lessonValues}
            setLessonValues={setLessonValues}
          />
        )}
        {type === "addLesson" && (
          <CreateLesson
            reload={reload}
            setReload={setReload}
            createLessonValues={createLessonValues}
            setCreateLessonValues={setCreateLessonValues}
          />
        )}
        {type === "commandDictionary" && (
          <CommandDictionary
            commandList={commandList}
            setCommandList={setCommandList}
            menuIndex={menuIndex}
            setMenuIndex={setMenuIndex}
            deletedIds={deletedIds}
            setDeletedIds={setDeletedIds}
          />
        )}
      </div>
      <div className="makersEditor-Editor-footer">
        {type === "course" && (
          <button onClick={() => setCourseSavePopUp(!courseSavePopUp)}>
            저장
          </button>
        )}
        {type === "lecture" && (
          <button onClick={() => setLessonSavePopUp(!lessonSavePopUp)}>
            저장
          </button>
        )}
        {type === "addLesson" && (
          <button
            onClick={() => setCreateLessonSavePopUp(!createLessonSavePopUp)}
          >
            레슨 생성
          </button>
        )}
        {type === "commandDictionary" && (
          <button
            onClick={() =>
              setCommandDictionarySavePopUp(!commandDictionarySavePopUp)
            }
          >
            저장
          </button>
        )}
      </div>
      {courseSavePopUp && (
        <div className="makersEditor-Editor-popup">
          <PopUp
            button1="취소"
            button2="저장"
            content={`저장하면 되돌릴 수 없습니다.
            정말 수정사항을 저장하시겠습니까?`}
            onClickButton1={() => setCourseSavePopUp(!courseSavePopUp)}
            onClickButton2={() => {
              courseSaveHandler();
              setCourseSavePopUp(!courseSavePopUp);
            }}
          />
        </div>
      )}
      {lessonSavePopUp && (
        <div className="makersEditor-Editor-popup">
          <PopUp
            button1="취소"
            button2="저장"
            content={`저장하면 되돌릴 수 없습니다.
            정말 수정사항을 저장하시겠습니까?`}
            onClickButton1={() => setLessonSavePopUp(!lessonSavePopUp)}
            onClickButton2={() => {
              lessonSaveHandler();
              setLessonSavePopUp(!lessonSavePopUp);
            }}
          />
        </div>
      )}
      {createLessonSavePopUp && (
        <div className="makersEditor-Editor-popup">
          <PopUp
            button1="취소"
            button2="네"
            content={`레슨이 생성되었습니다.
            레슨을 수정하러 가시겠습니까?`}
            onClickButton1={() => {
              createLessonSaveHandler({ goToModifyPage: false });
              setCreateLessonSavePopUp(!createLessonSavePopUp);
            }}
            onClickButton2={() => {
              createLessonSaveHandler({ goToModifyPage: true });
              setCreateLessonSavePopUp(!createLessonSavePopUp);
            }}
          />
        </div>
      )}
      {commandDictionarySavePopUp && (
        <div className="makersEditor-Editor-popup">
          <PopUp
            button1="취소"
            button2="저장"
            content={`저장하면 되돌릴 수 없습니다.
            정말 수정사항을 저장하시겠습니까?`}
            onClickButton1={() => {
              setCommandDictionarySavePopUp(!commandDictionarySavePopUp);
            }}
            onClickButton2={() => {
              commandDictionarySaveHandler();
              setCommandDictionarySavePopUp(!commandDictionarySavePopUp);
            }}
          />
        </div>
      )}
    </div>
  );
}
