import axios from "axios";
// const backendUrl =`https://cuvette-final-evaluation-nov-batch-backend.vercel.app/api/v1/ticket`;
const backendUrl = `http://localhost:3001/api/v1/form`;

export const createForm = async ({
  name,
  text,
  imageUrl,
  videoUrl,
  gifUrl,
  inputText,
  inputEmail,
  inputPhone,
  inputDate,
  inputRating,
  inputButton,
  currentFolderId,
}) => {
  try {
    const reqUrl = `${backendUrl}/createForm`;

    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const folderId = JSON.parse(localStorage.getItem("folderId"));

    const response = await axios.post(reqUrl, {
      name,
      text,
      imageUrl,
      videoUrl,
      gifUrl,
      inputText,
      inputEmail,
      inputPhone,
      inputDate,
      inputRating,
      inputButton,
      currentFolderId: folderId,
    });

    console.log(response);
    return "form created successfully";
  } catch (error) {
    console.log(error);
  }
};

export const updateTicket = async (jobId) => {
  try {
    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const reqUrl = `${backendUrl}/update/${jobId}`;
    const response = axios.get(reqUrl);

    console.log(response.data);
    return (await response).data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTickets = async () => {
  try {
    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const reqUrl = `${backendUrl}/getAllTickets`;
    const response = axios.get(reqUrl);

    return (await response)?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTicketByUserId = async (userId) => {
  try {
    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    // console.log(userId);
    const reqUrl = `${backendUrl}/getTicket/${userId}`;
    // console.log('Request URL:', reqUrl);
    const response = await axios.get(reqUrl);

    if (response.data && response.data.tickets) {
      return response.data.tickets;
    } else {
      // Return an empty array if no tickets are found
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

// const updateTicketByTicketId = async (ticketId)=>{
//     try{
//         // this is fro authorization purposes
//         const token = JSON.parse(localStorage.getItem('token'));
//         axios.defaults.headers.common['Authorization'] = token;

//         const reqUrl = `${backendUrl}/updateByUserId/${ticketId}`;
//         const response = await axios.put(reqUrl);

//         console.log(response)
//         return ( response).data.tickets;

//     }catch(error){
//         console.log(error);
//     }
// }

export const updateTicketStatus = async (ticketId, updatedFields) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const reqUrl = `${backendUrl}/updateTicket/${ticketId}`;
    const response = await axios.patch(reqUrl, updatedFields);

    console.log(response);
    return response.data.tickets;
  } catch (error) {
    console.log(error);
  }
};

const deleteTicket = async (ticketId) => {
  try {
    // this is fro authorization purposes
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    const reqUrl = `${backendUrl}/delete/${ticketId}`;
    const response = axios.delete(reqUrl);

    console.log(response);
    return "ticket deleted successfully";
  } catch (error) {
    console.log(error);
  }
};
