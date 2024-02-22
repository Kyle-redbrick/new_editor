import React, { useEffect } from "react";
import Field from "../../../Field";
import AddObjective from "../../../../../../Image/btn-objective_add.svg";
import DeleteObjective from "../../../../../../Image/btn-objective_delete.svg";
import "./index.scss";

export default function Introduce(props) {
  const {
    lessonValues,
    lessonId,
    setDifficulty,
    setObjective,
    setMissionTime,
    setLessonTags,
    setLessonKeyCommands,
  } = props;

  const addObjective = () => {
    try {
      setObjective([...lessonValues.objective, ""]);
    } catch {
      setObjective([""]);
    }
  };

  const removeObjective = (index) => {
    setObjective(
      lessonValues.objective.filter((objective, idx) => index !== idx)
    );
  };

  const handleInputChange = (index, newText) => {
    const newObjective = [...lessonValues.objective];
    newObjective[index] = newText;
    setObjective(newObjective);
  };

  return (
    <div className="makersEditor-Editor-body-fields">
      <div className="makersEditor-Editor-body-fields__field">
        <Field.Input
          type="input"
          title="난이도"
          placeholder="난이도를 입력해주세요."
          value={lessonValues.difficulty || ""}
          onChange={setDifficulty}
        />
      </div>
      <div className="makersEditor-Editor-body-fields__field">
        <Field.Input
          type="input"
          title="미션 시간"
          placeholder="숫자를 입력해주세요. (분)"
          value={lessonValues.missionTime || ""}
          onChange={setMissionTime}
        />
      </div>
      <div className="makersEditor-Editor-body-fields__field">
        <Field.Input
          type="input"
          title="태그"
          placeholder="' , '로 태그를 구분하여 입력해주세요. (최대 10개)"
          value={lessonValues.lessonTags || ""}
          onChange={setLessonTags}
        />
      </div>
      <div className="makersEditor-Editor-body-fields__field">
        <Field.Input
          type="input"
          title="명령어"
          placeholder="명령어를 입력해주세요."
          value={lessonValues.lessonKeyCommands || ""}
          onChange={setLessonKeyCommands}
        />
      </div>
      <div className="makersEditor-Editor-body-objectives">
        <div className="makersEditor-Editor-body-objectives-title">
          학습 목표
        </div>
        {lessonValues.objective &&
          lessonValues.objective.length &&
          lessonValues.objective.map((objective, index) => (
            <div
              key={index}
              className="makersEditor-Editor-body-objectives__objective"
            >
              <span>{index + 1}</span>
              <input
                type="text"
                value={objective}
                placeholder="학습 목표를 입력해주세요."
                onChange={(e) => handleInputChange(index, e.target.value)}
              />

              <img
                src={DeleteObjective}
                alt="delete-objective"
                onClick={() => removeObjective(index)}
              />
            </div>
          ))}
        <div
          className="makersEditor-Editor-body-objectives-add"
          onClick={addObjective}
        >
          <img src={AddObjective} alt="add-objective" />
          <span>학습 목표 추가</span>
        </div>
      </div>
    </div>
  );
}
