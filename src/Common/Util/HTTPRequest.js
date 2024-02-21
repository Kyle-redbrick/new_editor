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

export const getNewCourse = (param) => {
  return fetchSaasRequest(URL.API_SAAS_SERVER + "course", "POST", param);
};

export const deleteCourse = (param) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `course?courseId=${param}`,
    "DELETE"
  );
};

export const deleteLesson = (param) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `lesson/force?lessonId=${param}`,
    "DELETE"
  );
};

export const getCourseInfo = (courseId) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `course/info?courseId=${courseId}`
  );
};

export const updateCourse = (courseId, courseValues) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `course?courseId=${courseId}`,
    "PUT",
    courseValues
  );
};

export const updateLesson = (lessonId, lessonValues) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `lesson?lessonId=${lessonId}`,
    "PUT",
    lessonValues
  );
};

export const connectCourseAndLecture = ({ courseId, lessonId, order }) => {
  const param = {
    courseId,
    lessonList: [{ id: lessonId, order: order + 1 }],
  };
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `course/register/lesson`,
    "POST",
    param
  );
};

export const courseThumbnailUpload = (courseId) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER +
      `course/thumbnail/upload?courseId=${courseId}&fileType=jpg&mimeType=image/jpeg`,
    "GET"
  );
};

export const lessonThumbnailUpload = (lessonId) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER +
      `lesson/thumbnail/upload?lessonId=${lessonId}&fileType=jpg&mimeType=image/jpeg`,
    "GET"
  );
};

export const thumbnailUpload = () => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER +
      `lesson/thumbnail/upload?fileType=jpg&mimeType=image/jpeg`,
    "GET"
  );
};

export const getLesson = (lessonId) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `lesson/info?lessonId=${lessonId}`
  );
};

export const addLesson = (param) => {
  param.description = "";
  param.locale = "ko";
  param.totalMissionNumber = 0;
  param.template = "";
  return fetchSaasRequest(URL.API_SAAS_SERVER + "lesson", "POST", param);
};

export const getSampleGameURL = (pId) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `project/sampleGame/url?projectId=${pId}`
  );
};

export const getProjectInfo = (pId) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return fetchSaasRequest(
    URL.API_SAAS_SERVER +
      `project/info?projectId=${pId}&projectType=${
        userInfo.role || "EDUCATOR"
      }`,
    "GET"
  );
};
