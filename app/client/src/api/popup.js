// api/popup.js
import axios from "axios";
const backendUrl = `https://vivekumar192-server.vercel.app/api/v1/popup`;
// const backendUrl = `http://localhost:3001/api/v1/popup`;

export const savePopups = async ({ name, contents }) => {
  try {
    const reqUrl = `${backendUrl}/save`;

    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const folderId = localStorage.getItem("folderId");

    const result = await axios.post(reqUrl, { name, contents, folderId });

    localStorage.setItem("formId", result.data._id);
    return result;
  } catch (error) {
    console.error("Error saving popups:", error);
  }
};

export const getFormByUserId = async (userId) => {
  try {
    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const reqUrl = `${backendUrl}/getForm/${userId}`;
    const response = await axios.get(reqUrl);

    if (response.data && response.data.popups) {
      console.log(response.data.popups);
      // console.log("sdfsd");
      return response.data.popups;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getFormByFolderId = async (folderId) => {
  try {
    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const reqUrl = `${backendUrl}/getFormWthFolderId/${folderId}`;
    const response = await axios.get(reqUrl);

    if (response.data && response.data.popups) {
      console.log(response.data.popups);
      // console.log("sdfsd");
      return response.data.popups;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteForm = async (formId) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const reqUrl = `${backendUrl}/form/${formId}`;

    const response = await axios.delete(reqUrl);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const updatePopups = async ({ theme }) => {
  try {
    const id = localStorage.getItem("formId");
    const reqUrl = `${backendUrl}/updateForm/${id}`;

    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const result = await axios.patch(reqUrl, { theme });

    return "popup theme updated successfully", result;
  } catch (error) {
    console.error("Error saving popups:", error);
  }
};

export const fetchPopupByFormId = async () => {
  try {
    const id = localStorage.getItem("shareFormId");
    const reqUrl = `${backendUrl}/getByFormId/${id}`;

    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUrlView = async () => {
  try {
    const formId = localStorage.getItem("shareFormId");
    const userformId = formId ? formId.replace(/"/g, "") : "";

    const reqUrl = `${backendUrl}/updateView/${userformId}`;

    const response = await axios.patch(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const viewUrlView = async () => {
  try {
    const formId = localStorage.getItem("shareFormId");
    const userformId = formId ? formId.replace(/"/g, "") : "";

    const reqUrl = `${backendUrl}/viewView/${userformId}`;

    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUrlStats = async () => {
  try {
    const formId = localStorage.getItem("shareFormId");
    const userformId = formId ? formId.replace(/"/g, "") : "";

    const reqUrl = `${backendUrl}/updateStat/${userformId}`;

    const response = await axios.patch(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const viewUrlStats = async () => {
  try {
    const formId = localStorage.getItem("shareFormId");
    const userformId = formId ? formId.replace(/"/g, "") : "";

    const reqUrl = `${backendUrl}/viewStat/${userformId}`;

    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCompletionRate = async () => {
  try {
    const formId = localStorage.getItem("shareFormId");
    const userformId = formId ? formId.replace(/"/g, "") : "";

    const reqUrl = `${backendUrl}/updateCompletionRate/${userformId}`;

    const response = await axios.patch(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const viewCompletionRate = async () => {
  try {
    const formId = localStorage.getItem("shareFormId");
    const userformId = formId ? formId.replace(/"/g, "") : "";

    const reqUrl = `${backendUrl}/viewCompletionRate/${userformId}`;

    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
