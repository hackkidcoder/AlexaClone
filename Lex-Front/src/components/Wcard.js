import React from 'react'
import { useEffect, useState } from "react"
import { API_CLIENT } from "../shared/services/api-client";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../modules/alexa.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
}



export const Wcards = ({wurl}) => {
  
    const [cards, setCards] = useState([]); 
    let imgsrc="";

    useEffect(()=>{
        if(wurl){
        const promise = API_CLIENT.get(wurl);
        promise.then(result=>{
          if(result){
            console.log(result.data)
            setCards(result.data)
          }
        }).catch(err=>console.log('Network Err ', err));
      }
    },[wurl]);

    if(cards.length!==0){
         imgsrc='http://openweathermap.org/img/wn/'+cards.weather[0].icon+'@2x.png';
    }
    

    return(
    <>
   {cards.length!==0?
   <Card sx={{ width: 300 , minHeight:350 , backgroundColor:'lightBlue'}}>
   <CardContent>
     <Typography variant="h5" component="div">
     {cards.name} , {cards.sys.country}
     </Typography>
     <Typography sx={{ mb: 1.5 }} color="text.secondary">
    <p><img src={imgsrc} alt="err"/> {cards.weather[0].main}</p>
     </Typography>
     <Typography variant="body2">
    <p><h3 class='h3t'><i class="fa-solid fa-temperature-arrow-up"></i>{'   '}{'   '}{cards.main.temp_max}<i class="fa-solid fa-temperature-low"></i>{'(Max)'}</h3>  <h3><i class="fa-solid fa-temperature-arrow-down"></i>{'   '}{'   '}{cards.main.temp_min}<i class="fa-solid fa-temperature-low"></i>{'(Min)'}</h3></p>
       <br />
       {('Feels like :-')}<h1 class='ht'>{cards.main.temp}<i class="fa-solid fa-temperature-low">C</i></h1>
     </Typography>
   </CardContent>
 </Card>
      
      :<Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>}
      
    </>

    )
}