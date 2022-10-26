import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import React, { useEffect } from "react";
import { useState } from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import { Finder } from "../shared/services/Urlfinder";
import { Meaning } from "../shared/services/Meaning";
import "./lightbox.css";
import {Cards} from "../components/Ncard";
import { Wcards } from "../components/Wcard";
import "./alexa.css";
import moving from "../assets/images/moving.gif";
import stops from "../assets/images/stop.png"
import start from "../assets/images/start.png"
import reset from "../assets/images/reset.png"
import {useSpeechSynthesis} from "react-speech-kit";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




export const Alex = () => {
  let nsurl="";
  let nwurl="";
  let nmurl="";
  const [hideLightbox, setHideLightbox] = useState(true);
  const [message, setMessage] = useState("");
  const [track, setTrack] = useState("");
  const [wurl, setWurl] = useState("");
  const [murl, setMurl] = useState("");
  const [nurl, setNurl] = useState("");
  const [durl, setDurl] = useState("");

  const [necard,setNecard]=useState(true);
  const [wecard,setWecard]=useState(true);

  const [nword,setNword]=useState(null);
  const [wword, setWword] = useState(null);
  const [sword, setSword] = useState(null);
  const [mword, setMword] = useState(null);
  const [word, setWord] = useState("");


 

  const resetCom = () => {
    setMessage("");
    setTrack("");
    resetTranscript();
    setWurl("");
    setWord(null);
    setMword("");
    setHideLightbox(true);
    setNecard(true);
    nmurl="";
    setWecard(true);
  };
  const commands = [
    {
      command: "open *",
      callback: (site) => window.open("https://" + site + ".com"),
    },
    {
      command: "hello *",
      callback: () => setWord("Hi Buddy ! Hope you have a nice day"),
    },
    {
      command: "show *",
      callback: () => {
        if (transcript.includes("news")) {
          setNecard(false);
          const indexf = transcript.lastIndexOf("news of");
          const indexu = indexf + 8;
          const words = transcript.substring(indexu);
          setNword(words);
          
  
          const promise = Finder("news");
  
          promise.then((result) => {
            setNurl(result.data.url);
          });

        }
        if (transcript.includes("weather")) {
          setWecard(false);
          const indexf = transcript.lastIndexOf("weather of");
          const indexu = indexf + 11;
          const words = transcript.substring(indexu);
          setWword(words);
          
          const promise = Finder("cweather");
  
          promise.then((result) => {
            setWurl(result.data.url);
          });

        }

        if (transcript.includes("meaning")) {
          
        const indexf = transcript.lastIndexOf("meaning of");
        const indexu = indexf + 11;
        const words = transcript.substring(indexu);
        setMword(words);
        

        const promise = Finder("meaning");

        promise.then((result) => {
          setDurl(result.data.url);
        });

        }
      },
    },

    {
      command: "play *",
      callback: () => {
        setHideLightbox(false);
        if (transcript.includes("song")) {
          const mindexf = transcript.lastIndexOf("song");
          const mindexu = mindexf + 5;
          const word = transcript.substring(mindexu);
          setSword(word);
          const promise = Finder("music");

          promise.then((result) => {
            setMurl(result.data.url);
           
          });
 
        }
  
      },
    },

  ];
  
  
  //Music Url
  if(sword!==null){
  const omurl = murl;
  nmurl = omurl.replace("${}", sword);
  const promises = Meaning(nmurl);
  promises.then((result) => {
    setTrack(result.data.results[0].previewUrl);
  });
}

  //Dictionary Url
  if(mword!==null){
  const odurl = durl;
  const ndurl = odurl.replace("${}", mword);
  
  
  const promise = Meaning(ndurl);
  promise.then((result) => {
    
    setMessage(result.data[1].text);
  });
  }

  //Weather Url
  if(wword!==null){
  const owurl = wurl;
  nwurl = owurl.replace("${}", wword);
  

  }
  
  //news url

    if(nword!==null){
    const onurl = nurl;
    nsurl = onurl.replace("${}", nword);
      
    }

  //Changing font
  let head="Now Playing :"+sword;

  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    
    <div class="parent">
      <Box sx={{ flexGrow: 1 }}> 
    <AppBar position="static">
    <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Welcome To Lex
          </Typography>
          <Link to="/user" >Admin Panel</Link>
    </Toolbar>
      </AppBar>
     </Box>
    
    
    
    
    <img src={listening?moving:stops}/>
      <button onClick={SpeechRecognition.startListening} ><img src={start}/></button>
      <button onClick={resetCom}><img src={reset}/></button>
      <p class="tran">{transcript}</p>
      <br></br>
      <p class="mess">{message?"Definition-: "+message:<></>}{word}</p>
      <br></br>
      <div class="div2">
     {!necard?<Cards nurl={nsurl}/>:null}
     {!wecard?<Wcards wurl={nwurl}/>:null}
      </div>
      <div  className={`lightbox ${hideLightbox ? "hide-lightbox" : ""}`}>
        <AudioPlayer className="child1"
          // style={{ width: "300px" }}
          style={{ borderRadius: "3rem" , width:'500px'}}
          // layout="horizontal"
          autoPlay
          src={track}
          
          header={head}
          footer="Playing Song"
          hasDefaultKeyBindings
        />
      </div>  
      
    </div>
    
  );
};


