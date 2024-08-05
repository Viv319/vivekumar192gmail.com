import axios from "axios";
const backendUrl = `https://vivekumar192-server.vercel.app/api/v1/share`;
// const backendUrl = `http://localhost:3001/api/v1/share`;

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
    const oldid = localStorage.getItem("submissionId");

    const id = oldid ? oldid.replace(/"/g, "") : "";

    const reqUrl = `${backendUrl}/shareFormUpdate/${id}`;

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

export const getSahredFormResponse = async (formId) => {
  try {
    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    // shared;
    const formId = localStorage.getItem("shareFormId");

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

export const getFormResponse = async (formId) => {
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

// export const incrementViewCount = async () => {
//   try {
//     const formId = localStorage.getItem("shareFormId");

//     const reqUrl = `${backendUrl}/incrementviews/${formId}`;
//     await axios.patch(reqUrl);
//   } catch (error) {
//     console.error("Error incrementing view count:", error);
//   }
// };

export const incrementViewCount = async (formId) => {
  try {
    const response = await axios.patch(
      `${backendUrl}/incrementViewCount/${formId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error incrementing view count:", error);
    throw error;
  }
};
