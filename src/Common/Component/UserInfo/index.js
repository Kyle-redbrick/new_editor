import React, { useState, useEffect } from "react";
import * as request from "../../Util/HTTPRequest";

export default function UserInfo({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const getMakersToken = () =>
    new URLSearchParams(window.location.search).get("makersToken") ||
    localStorage.getItem("makersToken");

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
            setIsLoading(true);
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
  return <React.Fragment>{isLoading && children}</React.Fragment>;
}
