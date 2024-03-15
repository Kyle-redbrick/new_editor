import React, { useState, useEffect } from "react";
import Field from "../../../Field";
import ArrowUp from "../../../../../../Image/arrow_up.svg";
import ArrowDown from "../../../../../../Image/arrow_down.svg";
import DeleteIcon from "../../../../../../Image/btn-trash.svg";
import PlusIcon from "../../../../../../Image/btn-plus.svg";
import SlideField from "./SlideField";
import AssetLibrary from "../../../../../../Common/Util/assetLibrary";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import "./index.scss";

function createEmptyMission() {
  return {
    title: "",
    slide: "",
    pId: "",
    state: "",
    conditions: [],
  };
}
function createEmptyTemplate() {
  return {
    missions: [createEmptyMission()],
  };
}

export default function Mission(props) {
  useEffect(() => {
    let parsed;
    try {
      parsed = JSON.parse(props.defaultTemplate) || createEmptyTemplate();
    } catch (err) {
      parsed = createEmptyTemplate();
    }
    setMissions(parsed.missions || []);
  }, [props.defaultTemplate]);

  const [isSelected, setIsSelected] = useState(false);
  const [missions, setMissions] = useState([]);
  const [currentMissionIndex, setCurrentMissionIndex] = useState(-1);
  const currentMission = missions[currentMissionIndex];
  const currentMissionNum = currentMissionIndex + 1;
  const maxMissionIndex = missions.length - 1;
  const maxMissionNum = maxMissionIndex + 1;

  useEffect(() => {
    if (missions.length > 0) {
      if (currentMissionIndex < 0) {
        setCurrentMissionIndex(0);
      }
    } else {
      setCurrentMissionIndex(-1);
    }
    if (props.setTotalMissionNum) {
      props.setTotalMissionNum(missions.length);
    }
  }, [missions]);

  const isPrevEnabled = currentMissionNum > 1;
  const isNextEnabled = currentMissionNum < maxMissionNum;
  const isDeleteEnabled = !!currentMission;

  const onClickPrev = () => {
    const prevMissionIndex = currentMissionIndex - 1;
    if (prevMissionIndex >= 0) {
      setCurrentMissionIndex(prevMissionIndex);
    }
  };

  const onClickNext = () => {
    const nextMissionIndex = currentMissionIndex + 1;
    if (nextMissionIndex <= maxMissionIndex) {
      setCurrentMissionIndex(nextMissionIndex);
    }
  };

  const onClickDelete = () => {
    const confirmed = window.confirm(
      "미션을 삭제할까요? (저장하기 전까지 복구할 수 있어요.)"
    );
    if (confirmed) {
      const _missions = [...missions];
      _missions.splice(currentMissionIndex, 1);
      if (currentMissionIndex > 0) {
        setCurrentMissionIndex(currentMissionIndex - 1);
      } else {
        if (_missions.length <= 0) {
          setCurrentMissionIndex(-1);
        }
      }
      setMissions(_missions);
    }
  };

  const onClickAdd = () => {
    const _missions = [...missions];
    _missions.splice(currentMissionIndex + 1, 0, createEmptyMission());
    setMissions(_missions);
    setCurrentMissionIndex(currentMissionIndex + 1);
  };

  const [title, setTitle] = useState("");
  const [pId, setPId] = useState("");
  const [state, setState] = useState("");
  const [mediaURL, setMediaURL] = useState("");
  const [slide, setSlide] = useState("");
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    if (currentMission) {
      setTitle(currentMission.title || "");
      setPId(currentMission.pId || "");
      setSlide(currentMission.slide || "");
      setState(currentMission.state || "");
      setConditions(currentMission.conditions || []);
    } else {
      setTitle("");
      setPId("");
      setSlide("");
      setState("");
      setConditions([]);
    }
    setMediaURL("");
  }, [currentMission]);

  useEffect(() => {
    if (currentMission) {
      currentMission.title = title;
      currentMission.pId = pId;
      currentMission.state = state;
      currentMission.slide = slide;
      currentMission.conditions = conditions;
    }
  }, [title, pId, state, slide, conditions]);

  useEffect(() => {
    if (state) {
      try {
        const parsedState = JSON.parse(state);
        AssetLibrary.loadAssetsFromScene(parsedState.scene, () => {
          // props.setProject({ state: parsedState });
        });
      } catch (err) {}
    }
  }, [state]);

  const onClickLoadDevelopingProject = () => {
    request
      .getSaasDevelopingProject(pId)
      .then((res) => res.json())
      .then((developingProject) =>
        setState(developingProject.data.projectInfo.state)
      )
      .catch(() => window.alert("유효하지 않은 프로젝트입니다."));
  };

  useEffect(() => {
    const parsed = { missions };
    const template = JSON.stringify(parsed);
    props.setTemplate(template);
  }, [missions, title, pId, state, slide, conditions]);

  return (
    <>
      <div className="makersEditor-Editor-body-Content-menu">
        <div className="makersEditor-Editor-body-Content-menu-arrows">
          <p
            className={`makersEditor-Editor-body-Content-menu-arrows__arrow${
              isPrevEnabled ? "" : " disabled"
            }`}
            onClick={onClickPrev}
          >
            {`< 이전`}
          </p>
          <div
            className={`makersEditor-Editor-body-Content-menu-arrows__dropdown${
              isSelected ? " selected" : ""
            }`}
            onClick={() => setIsSelected(!isSelected)}
          >
            <span>{currentMissionNum}단계</span>
            <img src={isSelected ? ArrowUp : ArrowDown} alt="arrow" />
          </div>
          <p
            className={`makersEditor-Editor-body-Content-menu-arrows__arrow${
              isNextEnabled ? "" : " disabled"
            }`}
            onClick={onClickNext}
          >
            {`다음 >`}
          </p>
          {isSelected && (
            <div className="makersEditor-Editor-body-Content-menu-dropdown">
              {missions.map((_, idx) => (
                <div
                  key={idx}
                  className={`makersEditor-Editor-body-Content-menu-dropdown__steps${
                    currentMissionIndex === idx ? " isSelected" : ""
                  }`}
                  onClick={() => {
                    setCurrentMissionIndex(idx);
                    setIsSelected(!isSelected);
                  }}
                >
                  {idx + 1}단계
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="makersEditor-Editor-body-Content-menu-modify">
          <div
            className="makersEditor-Editor-body-Content-menu-modify__delete"
            onClick={onClickDelete}
          >
            <img alt="delete-icon" src={DeleteIcon} />
            <span>삭제</span>
          </div>
          <div className="makersEditor-Editor-body-Content-menu-modify__divider" />
          <div
            className="makersEditor-Editor-body-Content-menu-modify__add"
            onClick={onClickAdd}
          >
            <img alt="plus-icon" src={PlusIcon} />
            <span>미션 추가</span>
          </div>
        </div>
      </div>
      <div className="makersEditor-Editor-body-Content-state">
        <div className="makersEditor-Editor-body-Content-state__part">
          <div>
            <Field.Input
              type="input"
              title="미션 제목"
              placeholder="미션 제목을 입력해주세요."
              value={title}
              onChange={setTitle}
            />
          </div>
        </div>
        <div className="makersEditor-Editor-body-Content-state__part">
          <div>
            <Field.Input
              type="input"
              title="미션 설명"
              placeholder="미션 설명을 입력해주세요. <= BE data 추가해야할듯"
              disabled={true}

              // value={title}
              // onChange={setTitle}
            />
          </div>
        </div>
        <div className="makersEditor-Editor-body-Content-state__part">
          <div>
            <Field.Input
              type="input"
              title="템플릿 PID"
              placeholder="템플릿 PID를 입력해주세요."
              value={pId}
              onChange={setPId}
            />
          </div>
          <div className="button-wrapper">
            <button
              className="black-btn"
              onClick={onClickLoadDevelopingProject}
            >
              프로젝트 불러오기
            </button>
          </div>
        </div>
        <div className="makersEditor-Editor-body-Content-state__part">
          <Field.Textarea
            type="textarea"
            title="템플릿 State"
            placeholder="템플릿 PID를 입력 후 프로젝트 불러오기를 눌러주세요."
            value={state}
            onChange={setState}
            disabled={true}
          />
        </div>
        <div className="makersEditor-Editor-body-Content-state__part">
          <SlideField
            id="slide"
            title="슬라이드"
            value={slide}
            onChange={setSlide}
          />
        </div>
      </div>
    </>
  );
}
