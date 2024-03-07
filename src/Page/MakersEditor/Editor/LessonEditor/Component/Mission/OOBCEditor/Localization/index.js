import formattedMessages from "./FormatMessages";

class Localization {
  constructor(props = {}) {
    this.locale = undefined;
    this.updateLocaleTo(props.locale);
  }
  updateLocaleTo = locale => {
    if (this.checkLocaleAvailable(locale)) {
      this.locale = locale;
    } else {
      this.locale = "default";
    }
  };
  checkLocaleAvailable(locale) {
    const availableLocales = this.getAvailableLocales();
    return availableLocales.includes(locale);
  }
  getAvailableLocales() {
    return Object.keys(formattedMessages);
  }

  formatWith({ id } = {}) {
    const formattedMessages = this.getFormattedMessages();
    return formattedMessages[id] || id;
  }
  formatWithId = id => {
    return this.formatWith({ id });
  };
  getFormattedMessages() {
    try {
      return formattedMessages[this.locale];
    } catch (err) {
      console.error(err);
      return {};
    }
  }
}

const singleton = new Localization();
export default singleton;
