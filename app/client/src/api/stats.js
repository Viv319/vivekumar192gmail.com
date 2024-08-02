import axios from "axios";
const backendUrl = `https://vivekumar192-server.vercel.app/api/v1/stats`;
// const backendUrl = `http://localhost:3001/api/v1/stats`;

export const saveStats = async () => {
  try {
    const formId = localStorage.getItem("shareFormId");
    const reqUrl = `${backendUrl}/save`;
    const response = await axios.post(reqUrl, {
      formId,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
