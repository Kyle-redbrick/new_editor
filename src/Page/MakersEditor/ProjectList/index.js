import React, { useEffect, useState, useRef } from "react";
import BtnCourseAdd from "../../../Image/btn-course_add.svg";
import BtnLessonAdd from "../../../Image/btn-lesson_add.svg";
import ArrowDown from "../../../Image/arrow_down.svg";
import ArrowUp from "../../../Image/arrow_up.svg";
import ArrowRight from "../../../Image/arrow-right-s-line.svg";
import * as request from "../../../Common/Util/HTTPRequest";
import "./index.scss";

export default function ProjectList(props) {
  const prevSelectedElementRef = useRef();
  const prevUnfoldedRef = useRef();
  const makersToken = localStorage.getItem("makersToken");
  const { onChangeSelectedElement, reload, setReload } = props;
  const [courses, setCourses] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [unfolded, setUnfolded] = useState({ courseIds: [] });

  const getCoursesInfo = () => {
    request
      .getSaasAllCourse()
      .then((res) => res.json())
      .then((json) => setCourses(json.courseList))
      .catch((err) => setCourses([]));
  };

  const addCourseHandler = () => {
    const param = {
      locale: "ko",
      title: "새로운 코스가 생성되었습니다.",
      thumbnailURL: "/course/default/FBC2AC.svg",
      description: "test",
    };
    request
      .getNewCourse(param)
      .then((res) => res.json())
      .then(() => setReload(!reload));
  };

  const saveSelectedElement = () => {
    if (selectedElement) {
      const element = selectedElement.selectedElement || null;
      if (element) {
        const type = element.type;
        const id = element.id;
        if (type === "addLesson") {
          localStorage.setItem(
            "makersEditorSelectedElement",
            JSON.stringify({ type, id, courseId: element.courseId })
          );
        } else {
          localStorage.setItem(
            "makersEditorSelectedElement",
            JSON.stringify({ type, id })
          );
        }
      }
    } else {
      localStorage.removeItem("makersEditorSelectedElement");
    }
  };

  const isElementSelected = (type, data) => {
    return (
      selectedElement &&
      type === selectedElement.type &&
      selectedElement.id === (data.id || data.lesson.id)
    );
  };

  const unfoldedCourseIds = () => {
    return unfolded.courseIds;
  };

  const isElementFolded = (type, data) => {
    switch (type) {
      case "course":
        return !unfoldedCourseIds().includes(data.id);
      default:
        return true;
    }
  };

  const createElement = (type, data) => {
    return {
      type,
      data,
      isSelected: isElementSelected(type, data),
      isFolded: isElementFolded(type, data),
    };
  };

  const list = () => {
    const list = [];

    if (courses.length < 1) return [];

    for (let course of courses) {
      const courseElement = createElement("course", course);
      list.push(courseElement);
      if (courseElement.isFolded) continue;
      for (let lecture of course.courseLessonMappings || []) {
        const lectureElement = createElement("lecture", lecture);
        list.push(lectureElement);
      }

      const moreLecture = createElement("lecture", {
        lesson: { id: 1, title: "레슨 추가", courseId: course.id },
      });
      list.push(moreLecture);
    }

    return list;
  };

  const onChangeSelectedElementEditor = () => {
    if (onChangeSelectedElement) {
      onChangeSelectedElement(selectedElement);
    }
    saveSelectedElement();
  };

  const saveUnfolded = () => {
    localStorage.setItem("makersEditorUnfolded", JSON.stringify(unfolded));
  };
  const onChangeUnfolded = () => {
    saveUnfolded();
  };

  const onClickRefresh = () => {
    getCoursesInfo();
  };

  const onClickCouseAdd = () => {
    const param = {
      locale: "ko",
      title: "새로운 코스가 생성되었습니다.",
      thumbnailURL: "https://google.com",
      description: "test",
    };
    request
      .getNewCourse(param)
      .then((res) => res.json())
      .then((json) => console.log("json", json))
      .then(this.onClickRefresh());
  };

  const onClickElement = (element) => {
    if (element === selectedElement) {
      setSelectedElement(null);
    } else if (
      element.data &&
      element.data.lesson &&
      element.data.lesson.title &&
      element.data.lesson.title === "레슨 추가"
    ) {
      setSelectedElement({
        selectedElement: {
          type: "addLesson",
          courseId: element.data.lesson.courseId,
        },
      });
    } else {
      setSelectedElement({
        selectedElement: {
          type: element.type,
          id: element.data.id || element.data.lesson.id,
          data: element.data,
        },
      });
    }
  };

  const onClickElementFold = (element) => {
    switch (element.type) {
      case "course":
        const courseIds = unfoldedCourseIds();
        const courseIdIndex = courseIds.indexOf(element.data.id);
        if (courseIdIndex >= 0) {
          courseIds.splice(courseIdIndex, 1);
        } else {
          courseIds.push(element.data.id);
        }
        setUnfolded({
          ...unfolded,
          courseIds,
        });
        saveUnfolded();
        break;
      default:
        break;
    }
  };

  // 펼쳐진 코스, 레슨 정보 가져오기
  const loadUnfolded = () => {
    let unfoldedEditor;
    try {
      unfoldedEditor = JSON.parse(
        localStorage.getItem("makersEditorUnfolded")
      ) || { courseIds: [] };
    } catch (err) {
      unfoldedEditor = { courseIds: [] };
    }
    setUnfolded(unfoldedEditor);
  };

  // 선택된 항목 불러오기
  const loadSelectedElement = () => {
    let selectedElementEditor;
    try {
      selectedElementEditor = JSON.parse(
        localStorage.getItem("makersEditorSelectedElement")
      );
    } catch (err) {
      selectedElementEditor = null;
    }
    setSelectedElement(selectedElementEditor);
  };

  useEffect(() => {
    prevSelectedElementRef.current = selectedElement;
    prevUnfoldedRef.current = unfolded;
  }, []);

  useEffect(() => {
    if (prevSelectedElementRef.current !== selectedElement) {
      onChangeSelectedElementEditor();
    }
    if (JSON.stringify(prevUnfoldedRef.current) !== JSON.stringify(unfolded)) {
      onChangeUnfolded();
    }

    prevSelectedElementRef.current = selectedElement;
    prevUnfoldedRef.current = unfolded;
  }, [selectedElement, unfolded]);

  useEffect(() => {
    getCoursesInfo();
    loadUnfolded();
    loadSelectedElement();
  }, [makersToken]);

  useEffect(() => {
    getCoursesInfo();
  }, [reload]);
  return (
    <div className="makersEditor-ProjectList">
      <div className="makersEditor-ProjectList-header">
        <div className="makersEditor-ProjectList-header__title">
          콘텐츠 에디터
        </div>
        <img src={BtnCourseAdd} alt="add" onClick={addCourseHandler} />
      </div>
      <div className="makersEditor-ProjectList-body">
        <List
          list={list()}
          onClickElement={onClickElement}
          onClickElementFold={onClickElementFold}
          // onClickElementAdd={onClickElementAdd}
          // onClickElementDelete={onClickElementDelete}
        />
      </div>
      <div className="makersEditor-ProjectList-dictionary">
        <div
          className="makersEditor-ProjectList-dictionary-wrapper"
          onClick={() => {
            setSelectedElement({
              selectedElement: {
                type: "commandDictionary",
              },
            });
          }}
        >
          <p className="makersEditor-ProjectList-dictionary-wrapper__title">
            명령어 사전
          </p>
          <img alt="dictionary" src={ArrowRight} />
        </div>
      </div>
    </div>
  );
}

function List(props) {
  const {
    list = [],
    onClickElement,
    onClickElementFold,
    onClickElementAdd,
    onClickElementDelete,
  } = props;
  return (
    <div className="makersEditor-ProjectList-body-list">
      {list.map((element, index) => (
        <Element
          key={index}
          element={element}
          onClick={onClickElement}
          onClickFold={onClickElementFold}
          onClickAdd={onClickElementAdd}
          onClickDelete={onClickElementDelete}
        />
      ))}
    </div>
  );
}

function Element(props) {
  const { element, onClick, onClickFold, onClickAdd, onClickDelete } = props;
  const makersEditorUnfolded = JSON.parse(
    localStorage.getItem("makersEditorUnfolded")
  );
  const isSelected = makersEditorUnfolded?.courseIds.includes(element.data.id);
  if (!element) return null;

  let isFoldable, isAddable, isDeletable;
  switch (element.type) {
    case "course":
      isFoldable = true;
      isAddable = true;
      isDeletable = false;
      break;
    case "lecture":
      isFoldable = true;
      isAddable = true;
      isDeletable = true;
      break;
    default:
      isFoldable = false;
      isAddable = false;
      isDeletable = true;
      break;
  }

  let iconURL, title;
  switch (element.type) {
    case "course":
      const course = element.data;
      title = course.title;
      break;
    case "lecture":
      const lecture = element.data;
      title = lecture.lesson.title;
      break;
    default:
      title = null;
      break;
  }
  return (
    <div
      className={`makersEditor-ProjectList-body-list__${element.type}${
        isSelected ? " selected" : ""
      }`}
    >
      {title && (
        <div
          className="makersEditor-ProjectList-body-list__title"
          style={{ display: "flex", alignItems: "center", marginRight: "4px" }}
          onClick={(e) => {
            e.stopPropagation();
            onClick(element);
          }}
        >
          {title === "레슨 추가" && <img src={BtnLessonAdd} alt="lessonAdd" />}
          <span>{title.length < 24 ? title : title.slice(0, 24) + "..."}</span>
          {isFoldable && element.type === "course" && (
            <img
              src={!element.isFolded ? ArrowUp : ArrowDown}
              alt="dropdown"
              onClick={(e) => {
                e.stopPropagation();
                onClickFold(element);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
