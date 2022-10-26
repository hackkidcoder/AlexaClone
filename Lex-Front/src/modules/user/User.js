import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { API_CLIENT } from '../../shared/services/api-client';
import { Link } from "react-router-dom";


export const User = ()=>{
    const [msg,setMsg] =useState('');
    const keyword = useRef('');
    const url = useRef('');
    const category = useRef('');
    const doRegister = async ()=>{
            const keyw = keyword.current.value;
            const urls= url.current.value;
            const categories = category.current.value;
    
            const userObject = {'keyword':keyw, 'url':urls, 'category':categories};
            console.log('UserObject is ', userObject);
            try{
            const result = await API_CLIENT.post(process.env.REACT_APP_ADMIN_URL, userObject);    
            setMsg(result.data.message);    
        }
            catch(err){
                console.log('Error in Registration Call ', err);
            }
        }

    return (
     <Container maxWidth="sm">
        <h1>ADMIN PANEL</h1>
        <h2>ADD KEYWORD</h2>
        <h4>{msg}</h4>
     <Box sx={{  height: '100vh' }} >
     <TextField inputRef = {keyword} id="outlined-basic" label="Keyword" variant="outlined" /><br/>
     <TextField inputRef = {url} id="outlined-basic" type="text" label="Url" variant="outlined" />
     <br/> 
     <TextField inputRef = {category} id="outlined-basic" type="text" label="Category" variant="outlined" />
     <br/>
     <br/> 
     <Button onClick = {doRegister} variant="contained">Add Keyword</Button>{' '}
    <Button variant="contained"> <Link to="/" >Home</Link></Button>
        </Box>
     </Container>
    )
}