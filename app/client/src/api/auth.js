import axios from 'axios';
// const backendUrl =`https://cuvette-final-evaluation-nov-batch-backend.vercel.app/api/v1/auth`;
const backendUrl =`http://localhost:3001/api/v1/auth`;

export const registerUser = async ({email,password, name})=>{
    try{
        const reqUrl = `${backendUrl}/register`;
        const response = await axios.post(reqUrl,{
            email,
            password,
            name,
        });
        console.log(response)
        return true;
    }catch(error){
        console.log(error);
    }
}

export const loginUser = async ({email,password})=>{
    try{
        const reqUrl = `${backendUrl}/login`;
        const response = await axios.post(reqUrl,{
            email,
            password
        });
        if(response.data?.token){
            localStorage.setItem("token", JSON.stringify(response.data?.token));
            localStorage.setItem("name", JSON.stringify(response.data?.name));
            localStorage.setItem(
                "userId",
                JSON.stringify(response.data?.userId)
            );
        }
        return true;
        
    }catch(error){
        console.log(error);
    }
}

export const updateUser = async ({email, name, password})=>{
    try{
        
        const token = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = token;
        
        const userId = localStorage.getItem('userId');

        const usernameId = userId ? userId.replace(/"/g, '') : '';

            // yaha par mujhe id fetch karna hai tabhi data fetch ho paega;
            // const reqUrl = `${backendUrl}/update/${id}`;
            const reqUrl =`${backendUrl}/update/${usernameId}`;

            console.log(reqUrl);

            const responseUser = await axios.patch(reqUrl,{
                name, email, password
            });
            
            console.log(responseUser)
            return true;
                
    }
    catch(error){
        console.log(error);
    }
}

// export const findUserById = async ({id}) =>{
//     try{
//         const reqUrl = `${backendUrl}/getUser/${id}`;
//         const token = JSON.parse(localStorage.getItem('token'));
//         axios.defaults.headers.common['Authorization'] = token;
        
//         const response = await axios.get(reqUrl);
//         return true;
        
//     }catch(error){
//         console.log(error);
//     }
    
// }