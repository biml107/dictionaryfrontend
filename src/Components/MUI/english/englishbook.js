import{ useEffect, useState,useContext } from 'react';
import { Typography,
  } from '@mui/material';
 
import { LayoutPageContext } from '../layout';
import Englishentenceitem from './englishsentenceitem';
import { BASE_API_URL } from '../../../constants'; 
import axios from 'axios';

const EnglishBook = () =>{
const{
      selectedChapter
    } = useContext(LayoutPageContext);
    
    //states related to EnglishBook component
    const[chapterSentences,setChapterSentences]= useState([]);
  

    useEffect(()=>{

        console.log("getenglishchaptersentences api called",selectedChapter);
        const fetchChapter= async()=>{
          try{
            const sentencesResponse= await axios.get(`${BASE_API_URL}/user/getenglishchaptersentences?chapterId=${selectedChapter.chapter_id}`,{withCredentials:true});
            
           //if axios get status code other than 200-299 if throw error which goes to catch block
            //const data = await sentencesResponse.json();
                  console.log("api cll data english book sentences",sentencesResponse.data.data);
                 
                 setChapterSentences(sentencesResponse.data.data);
          }
          catch(err){
            console.log("English chapter Sentences fetch api failed",err)
          }
        
        }
        if(selectedChapter && selectedChapter.chapter_id)
        {
          console.log("called functin fetch english chpter sentences",selectedChapter);
          fetchChapter();
        }
        
    
      },[selectedChapter]);
useEffect(()=>{
    console.log("On every render of englishbook component");
})
     

      return(
        <>
            <Typography variant="body1" component="div" sx={{ textAlign: 'justify', lineHeight: 1.8 }}>
             {

                    chapterSentences.map((sentence, index) => (
                        <Englishentenceitem key={index} index={index} sentence={sentence} />
                    ))
             }

            </Typography>
        </>
      );
}

export default EnglishBook;