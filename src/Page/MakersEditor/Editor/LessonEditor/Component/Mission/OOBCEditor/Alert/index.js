import React from "react";
import { ALERT as TYPE } from "../Constant";

class Alert {
  constructor(props = {}) {
    this.type = props.type || "default";
  }

  configureWith(external = {}) {
    const { type } = external;
    switch (type) {
      case TYPE.TAPIOCA:
        this.type = TYPE.TAPIOCA;
        this.PopUp = external.PopUp;
        this.showPopUp = external.showPopUp;
        break;
      default:
        this.type = "default";
        break;
    }
  }

  alert(props) {
    // const { title, message, buttonName, buttonAction } = props;
    switch (this.type) {
      case TYPE.TAPIOCA:
        this.alertByTapioca(props);
        break;
      default:
        this.alertByDefault(props);
        break;
    }
  }
  alertByTapioca(props) {
    const { title, message, buttonName, buttonAction } = props;
    const { PopUp, showPopUp } = this;
    showPopUp(
      <PopUp.OneButton
        title={title}
        subtitle={message}
        buttonName={buttonName}
        buttonAction={buttonAction}
      />
    );
  }
  alertByDefault(props) {
    const { title, message } = props;
    window.alert(title + "\n" + message);
  }

  confirm(props) {
    // const {
    //   title,
    //   message,
    //   confirmButtonName,
    //   confirmButtonAction,
    //   cancelButtonName,
    //   cancelButtonAction
    // } = props;
    switch (this.type) {
      case TYPE.TAPIOCA:
        this.confirmByTapioca(props);
        break;
      default:
        this.confirmByDefault(props);
        break;
    }
  }
  confirmByTapioca(props) {
    const {
      title,
      message,
      confirmButtonName,
      confirmButtonAction,
      cancelButtonName,
      cancelButtonAction
    } = props;
    const { PopUp, showPopUp } = this;
    showPopUp(
      <PopUp.TwoButton
        title={title}
        subtitle={message}
        confirmButtonName={confirmButtonName}
        confirmAction={confirmButtonAction}
        cancelButtonName={cancelButtonName}
        cancelAction={cancelButtonAction}
      />
    );
  }
  confirmByDefault(props) {
    const { title, message, confirmButtonAction, cancelButtonAction } = props;
    const confirm = window.confirm(title + "\n" + message);
    if (confirm) {
      if (confirmButtonAction) confirmButtonAction();
    } else {
      if (cancelButtonAction) cancelButtonAction();
    }
  }

  prompt(props) {
    // const {
    //   title,
    //   message,
    //   defaultInput,
    //   placeholder,
    //   confirmButtonName,
    //   confirmButtonAction,
    //   cancelButtonName,
    //   cancelButtonAction
    // } = props;
    switch (this.type) {
      case TYPE.TAPIOCA:
        this.promptByTapioca(props);
        break;
      default:
        this.promptByDefault(props);
        break;
    }
  }
  promptByTapioca(props) {
    const {
      title,
      message,
      defaultInput,
      placeholder,
      confirmButtonName,
      confirmButtonAction,
      cancelButtonName,
      cancelButtonAction
    } = props;
    const { PopUp, showPopUp } = this;
    showPopUp(
      <PopUp.OneInput
        title={title}
        subtitle={message}
        defaultInput={defaultInput}
        placeholder={placeholder}
        buttonName={confirmButtonName}
        buttonAction={confirmButtonAction}
        cancelButtonName={cancelButtonName}
        cancelAction={cancelButtonAction}
      />
    );
  }
  promptByDefault(props) {
    const {
      title,
      message,
      defaultInput,
      confirmButtonAction,
      cancelButtonAction
    } = props;
    const input = prompt(title + "\n" + message, defaultInput);
    if (input) {
      if (confirmButtonAction) confirmButtonAction(input);
    } else {
      if (cancelButtonAction) cancelButtonAction();
    }
  }
}

const singleton = new Alert();
export default singleton;
