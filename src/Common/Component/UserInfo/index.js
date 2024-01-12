import React, { useEffect } from "react";
import * as request from "../../Util/HTTPRequest";

export default function UserInfo({ children }) {
  const getMakersToken = () =>
    new URLSearchParams(window.location.search).get("makersToken");

  useEffect(() => {
    const makersToken = getMakersToken();

    if (makersToken) {
      localStorage.setItem("makersToken", makersToken);

      const userInfo = () => {
        request
          .getUserInfo()
          .then((res) => res.json())
          .then((json) => {
            localStorage.setItem(
              "userInfo",
              JSON.stringify(json.data.userInfo)
            );
          });
      };
      userInfo();
    }

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("makersToken");

    const newUrl =
      searchParams.size > 0
        ? `${window.location.pathname + "?" + searchParams}`
        : `${window.location.pathname}`;

    window.history.replaceState({}, null, newUrl);
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
}
