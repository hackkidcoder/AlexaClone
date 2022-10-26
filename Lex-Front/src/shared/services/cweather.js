import {API_CLIENT} from './api-client';
 export const  weather=(url)=>{
    const result = API_CLIENT.get(url); 
    if(result){
        console.log(result);
    }
    
    return result;
   
       
}