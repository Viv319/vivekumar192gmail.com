import axios from "axios";
// const backendUrl =`https://cuvette-final-evaluation-nov-batch-backend.vercel.app/api/v1/ticket`;
const backendUrl = `http://localhost:3001/api/v1/share`;

export const saveShareResponse = async ({
  contentstotalViews,
  totalStarts,
  completionRate,
  submitionStartTime,
  contents,
}) => {
  try {
    const reqUrl = `${backendUrl}/shareForm`;

    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const formId = localStorage.getItem("shareFormId");

    const result = await axios.post(reqUrl, {
      contentstotalViews,
      totalStarts,
      completionRate,

      submitionStartTime,
      contents,
      formId,
    });
    return result;
  } catch (error) {
    console.error("Error saving popups:", error);
  }
};

export const updateShareResponse = async ({
  contentstotalViews,
  totalStarts,
  completionRate,
  submitionStartTime,
  contents,
}) => {
  try {
    const id = localStorage.getItem("submissionId");
    const reqUrl = `${backendUrl}/shareFormUpdate/${id}`;

    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    // const formId = localStorage.getItem("shareFormId");

    await axios.patch(reqUrl, {
      contentstotalViews,
      totalStarts,
      completionRate,

      submitionStartTime,
      contents,
    });
    return "popup updated successfully";
  } catch (error) {
    console.error("Error saving popups:", error);
  }
};

export const getSahredFormResponse = async () => {
  try {
    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    // shared;
    const formId = localStorage.getItem("formId");

    // const reqUrl = `${backendUrl}/shareForm/${formId}`;
    const reqUrl = `${backendUrl}/getSharedForms/${formId}`;

    console.log("Request URL:", reqUrl);

    const response = await axios.get(reqUrl);

    if (response) {
      console.log(response);
      // console.log("sdfsd");
      return response;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const incrementViewCount = async () => {
  try {
    const formId = localStorage.getItem("shareFormId");

    const reqUrl = `${backendUrl}/incrementviews/${formId}`;
    await axios.patch(reqUrl);
  } catch (error) {
    console.error("Error incrementing view count:", error);
  }
};
