import React from 'react'
import { useEffect, useState } from "react"
import { API_CLIENT } from "../shared/services/api-client";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
}

export const Cards = ({nurl}) => {
  
    const [cards, setCards] = useState([]); 

    useEffect(()=>{
        if(nurl){
        const promise = API_CLIENT.get(nurl);
        promise.then(result=>{
          if(result){
            setCards(result.data.articles)
          }
        }).catch(err=>console.log('Network Err ', err));
      }
    },[nurl]);


    return(
    <>
    <Grid container spacing={1}>
   {cards.length!==0?cards.map((card,index)=>
   <Box sx={{ width:300,margin:"2rem"}}> <Grid item xs={8}><item>
   <Card sx={{ width: 300 , minHeight:350 ,maxHeight:400}}>
   <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="news">
            N
          </Avatar>
        }
        title={card.title}
        subheader={card.publishedAt}
      />
    
    <CardMedia
        component="img"
        height="200"
        image={card.urlToImage}
        alt={card.source.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={card.url} size="small">Learn More</Button>
      </CardActions>
      </Card>
      </item>
      </Grid>
      
      </Box>
      
      ):<Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>}
    </Grid>
    </>

    )
}