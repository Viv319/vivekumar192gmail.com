// api/popup.js
import axios from "axios";
// const backendUrl =`https://cuvette-final-evaluation-nov-batch-backend.vercel.app/api/v1/ticket`;
const backendUrl = `http://localhost:3001/api/v1/popup`;

export const savePopups = async ({ name, contents }) => {
  try {
    const reqUrl = `${backendUrl}/save`;

    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const folderId = localStorage.getItem("folderId");

    await axios.post(reqUrl, { name, contents, folderId });
    return "popup created successfully";
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
