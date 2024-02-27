import React, { useState, useEffect } from "react";
import TabMenu from "../../../Component/TabMenu";
import PopUp from "../../../../Common/Component/PopUp";
import AddCommand from "../../../../Image/btn-objective_add.svg";
import DeleteCommand from "../../../../Image/btn-objective_delete.svg";
import * as request from "../../../../Common/Util/HTTPRequest";
import "./index.scss";

const CommandItem = ({
  id,
  onChange,
  onRemove,
  command,
  order,
  isDeletePopUp,
  setIsDeletePopUp,
  deletedId,
  setDeletedId,
  deletedIds,
  setDeletedIds,
}) => {
  return (
    <div className="makersEditor-Editor-body-Content__command">
      <div className="makersEditor-Editor-body-Content__command-order">
        <p>{order}</p>
      </div>
      <div className="makersEditor-Editor-body-Content__command-content">
        <input
          type="text"
          placeholder="명령어를 입력해주세요."
          onChange={(e) => onChange(id, "commandName", e.target.value)}
          value={command.commandName}
        />
        <textarea
          placeholder="설명을 입력해주세요."
          onChange={(e) => onChange(id, "description", e.target.value)}
          value={command.description}
        />
      </div>
      <div className="makersEditor-Editor-body-Content__command-button">
        <img
          src={DeleteCommand}
          alt="delete-command"
          onClick={() => {
            setDeletedId(id);
            setIsDeletePopUp(!isDeletePopUp);
          }}
        />
      </div>
    </div>
  );
};

export default function CommandDictionary(props) {
  const [isDeletePopUp, setIsDeletePopUp] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const {
    commandList,
    setCommandList,
    menuIndex,
    setMenuIndex,
    deletedIds,
    setDeletedIds,
  } = props;

  const handleAddItem = () => {
    const newSubId = Date.now();
    setCommandList([
      ...commandList,
      { subId: newSubId, commandName: "", description: "" },
    ]);
  };

  const handleChange = (identifier, key, value) => {
    setCommandList(
      commandList.map((command) =>
        command.id === identifier || command.subId === identifier
          ? { ...command, [key]: value }
          : command
      )
    );
  };

  const handleRemove = (identifier) => {
    setCommandList(
      commandList.filter(
        (command) => command.id !== identifier && command.subId !== identifier
      )
    );
  };

  useEffect(() => {
    request
      .getCommandList(menuIndex)
      .then((res) => res.json())
      .then((json) => {
        setCommandList(
          json.map((command) => ({ ...command, subId: Date.now() }))
        );
      });
  }, [menuIndex]);

  return (
    <>
      <div className="makersEditor-Editor-body-Content">
        <TabMenu menuIndex={menuIndex} setMenuIndex={setMenuIndex} />
        <div className="makersEditor-Editor-body-Content-title">
          {menuIndex ? "JS" : "OOBC"} 블록
        </div>
        {commandList.length > 0 &&
          commandList.map((command, index) => (
            <CommandItem
              key={command.id || command.subId} // id가 없는 항목에 대해서는 subId를 key로 사용
              id={command.id || command.subId} // id가 있으면 id를, 없으면 subId를 id prop으로 전달
              command={command}
              order={index + 1}
              onChange={handleChange}
              onRemove={handleRemove}
              isDeletePopUp={isDeletePopUp}
              setIsDeletePopUp={setIsDeletePopUp}
              deletedId={deletedId}
              setDeletedId={setDeletedId}
              deletedIds={deletedIds}
              setDeletedIds={setDeletedIds}
            />
          ))}
        <div className="makersEditor-Editor-body-Content-add">
          <div
            className="makersEditor-Editor-body-Content-add__img-wrapper"
            onClick={handleAddItem}
          >
            <img src={AddCommand} alt="add-command" />
            <p>추가</p>
          </div>
        </div>
      </div>
      {isDeletePopUp && (
        <div className="makersEditor-Editor-popup__delete">
          <PopUp
            commandDictionary={true}
            button1="취소"
            button2="삭제"
            content={`삭제하면 되돌릴 수 없습니다.
            레슨에 사용된 명령어가 있따면
            레슨 내에서 정보가 삭제됩니다.
            정말 삭제하시겠습니까?`}
            onClickButton1={() => setIsDeletePopUp(!isDeletePopUp)}
            onClickButton2={() => {
              handleRemove(deletedId);
              if (typeof deletedId !== "number") {
                setDeletedIds([...deletedIds, deletedId]);
              }
              setIsDeletePopUp(!isDeletePopUp);
            }}
          />
        </div>
      )}
    </>
  );
}
