import { SOUND as TYPE } from "../Constant";

class Sound {
  constructor(props = {}) {
    this.type = props.type || "default";
  }

  configureWith(external = {}) {
    const { type } = external;
    switch (type) {
      case TYPE.TAPIOCA:
        this.type = TYPE.TAPIOCA;
        this.SoundManager = external.SoundManager;
        break;
      default:
        this.type = "default";
        break;
    }
  }

  playWithId(soundId) {
    switch (this.type) {
      case TYPE.TAPIOCA:
        this.SoundManager.play(soundId);
        break;
      default:
        break;
    }
  }
  stopWithId(soundId) {
    switch (this.type) {
      case TYPE.TAPIOCA:
        this.SoundManager.stop(soundId);
        break;
      default:
        break;
    }
  }
}

const singleton = new Sound();
export default singleton;
