import { URL } from "./Constant";

export const fetchSaasRequest = (url, method, param) => {
  let headers = {
    "Content-Type": "application/json; charset=utf-8",
  };
  if (localStorage.getItem("makersToken")) {
    headers["Authorization"] = `Bearer ${localStorage.getItem("makersToken")}`;
  }

  const requestInfo = {
    method: method,
    headers: headers,
  };

  if (param) requestInfo["body"] = JSON.stringify(param);

  return new Promise((resolve, reject) => {
    fetch(url, requestInfo)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};

export const getUserInfo = () => {
  return fetchSaasRequest(URL.API_SAAS_SERVER + "user/info", "GET");
};

export const getSaasAllCourse = () => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER +
      "course/list/available?offset=0&limit=100&classification=created",
    "GET"
  );
};
