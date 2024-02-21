import React, { useState, useEffect } from "react";
import Field from "../../../Field";
import SampleGameViewer from "../SampleGameViewer";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import "./index.scss";

export default function Execution(props) {
  const [sampleGameURL, setSampleGameURL] = useState("");
  const [sampleGameReload, setSampleGameReload] = useState(false);
  const [screenMode, setScreenMode] = useState("HORIZONTAL");
  const { lessonValues, setProjectId, setRunMethod } = props;

  useEffect(() => {
    request
      .getProjectInfo(lessonValues.projectId)
      .then((res) => res.json())
      .then((json) => {
        if (
          json.data &&
          json.data.projectInfo &&
          json.data.projectInfo.sampleGameURL
        ) {
          setSampleGameURL(json.data.projectInfo.sampleGameURL);
          setScreenMode(json.data.projectInfo.screenMode);
        }
      });
  }, [sampleGameReload]);

  return (
    <div className="makersEditor-Editor-body-Content-body">
      <div className="makersEditor-Editor-body-Content-body-projectId">
        <div className="makersEditor-Editor-body-Content-body-projectId-fields">
          <div className="makersEditor-Editor-body--Content-body-projectId-fields__field">
            <Field.Input
              type="input"
              title="실행 프로젝트"
              placeholder="프로젝트 id를 입력해주세요."
              value={lessonValues.projectId || ""}
              onChange={setProjectId}
            />
          </div>
        </div>
        <div className="makersEditor-Editor-body-Content-body-projectId__button">
          <button onClick={() => setSampleGameReload(!sampleGameReload)}>
            확인
          </button>
        </div>
      </div>
      <div className="makersEditor-Editor-body-Content-body-sampleGame">
        <SampleGameViewer
          sampleGameURL={sampleGameURL}
          screenMode={screenMode}
        />
      </div>
      <div className="makersEditor-Editor-body-Content-body-runMethod">
        <div className="makersEditor-Editor-body-Content-body-runMethod-fields">
          <div className="makersEditor-Editor-body--Content-body-runMethod-fields__field">
            <Field.Textarea
              type="textarea"
              title="실행 방법"
              placeholder="실행 방법을 입력해주세요."
              value={lessonValues.runMethod || ""}
              onChange={setRunMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
