import {API_CLIENT} from './api-client';
 export const  Finder=async(keyword)=>{

    const userObject={'keyword':keyword};
    const result = await API_CLIENT.post(process.env.REACT_APP_FIND_URL, userObject); 
    if(result){
        console.log(result);
    }
    
    return result;
   
       
}