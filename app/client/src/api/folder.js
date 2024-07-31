import axios from "axios";
const backendUrl = `https://vivekumar192-server.vercel.app/api/v1/folder`;
// const backendUrl = `http://localhost:3001/api/v1/folder`;

export const createFolder = async ({ name }) => {
  try {
    const reqUrl = `${backendUrl}/createFolder`;

    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    // localStorage.setItem("folderId", );

    await axios.post(reqUrl, {
      name,
    });

    // console.log(response);
    return "folder created successfully";
  } catch (error) {
    console.log(error);
  }
};

export const getAllFolders = async () => {
  try {
    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const reqUrl = `${backendUrl}/getFolder`;
    const response = await axios.get(reqUrl);

    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFolderByUserId = async (userId) => {
  try {
    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const reqUrl = `${backendUrl}/getFolder/${userId}`;
    const response = await axios.get(reqUrl);

    if (response.data && response.data.folders) {
      console.log(response.data.folders);
      // console.log("sdfsd");
      return response.data.folders;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteFolder = async (folderId) => {
  try {
    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const reqUrl = `${backendUrl}/deleteFolder/${folderId}`;

    const response = await axios.delete(reqUrl);
    // console.log(response);
    console.log(response);
    return "Folder deleted successfully";
  } catch (error) {
    console.log(error);
  }
};
