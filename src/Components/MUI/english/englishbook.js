import{ useEffect, useState,useContext } from 'react';
import { Typography, IconButton, Collapse, Box ,Tooltip,Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,TextField
  } from '@mui/material';
 
import { LayoutPageContext } from '../layout';
import Englishentenceitem from './englishsentenceitem';
import { BASE_API_URL } from '../../../constants'; 
import axios from 'axios';

const EnglishBook = () =>{
const{
      selectedChapter
    } = useContext(LayoutPageContext);
    const toggleExpand = (index) => {
        setExpandedIndexes((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
      };
    //states related to EnglishBook component
    const[chapterSentences,setChapterSentences]= useState([]);
    const [expandedIndexes, setExpandedIndexes] = useState({});

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

            //     chapterSentences.map((sentence,index)=> (
            //         <span style={{ display: 'inline' }}>
            //             {sentence.value}{' '}
            //             <IconButton
            //             onClick={() => toggleExpand(index)}
            //             size="small"
            //             aria-label="expand"
            //             color="info"
            //             sx={{
            //                 fontSize: 'inherit',
            //                 padding: 0,
            //                 marginLeft: 0,
            //                 verticalAlign: 'middle',
            //             }}
            //          >
            //           <ExpandMoreOutlinedIcon
            //     fontSize="inherit"
            //     sx={{
            //       transform: expandedIndexes[index] ? 'rotate(180deg)' : 'rotate(0deg)',
            //       transition: 'transform 0.3s',
            //     }}
            //   />
            //             </IconButton>




            //         </span>

            //     ))
             }

            </Typography>
        </>
      );
}

export default EnglishBook;