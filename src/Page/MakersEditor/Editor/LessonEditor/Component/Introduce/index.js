import React from "react";
import Field from "../../../Field";
import "./index.scss";

export default function Introduce(props) {
  const { lessonValues, lessonId, setDifficulty, setMissionTime } = props;
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
    </div>
  );
}
