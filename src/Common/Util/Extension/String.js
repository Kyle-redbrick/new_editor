import { URL } from "../../Util/Constant";

if (!String.prototype.THUMBNAIL_ALI) {
  String.prototype.GET_IMAGE = function () {
    if (this.startsWith("http")) {
      return this;
    } else {
      return URL.GET_IMAGE + this;
    }
  };
}
