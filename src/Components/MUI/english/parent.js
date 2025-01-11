import React, { useEffect, useState,useContext } from 'react';
import { Typography, IconButton, Popover, Dialog, DialogTitle, DialogContent,Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { LayoutPageContext } from '../layout';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { BASE_API_URL } from '../../../constants'; 
import axios from 'axios';
import Trial from './trial';
const paragraphText = `This is the first sentence. Here is another sentence? And finally the last sentence! This is the first sentence. Here is another sentence? And finally the last sentence! This is the first sentence. Here is another sentence? And finally the last sentence! This is the first sentence. Here is another sentence? And finally the last sentence!`;

const InteractiveParagraph = () => {
  const [expandedSentence, setExpandedSentence] = useState(null);
  const [wordDetails, setWordDetails] = useState({ word: '', open: false });
  const [anchorEl, setAnchorEl] = useState(null);
  const[chapterSentences,setChapterSentences]= useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState({});
 

  const{
    selectedChapter
  } = useContext(LayoutPageContext);
//const [selectedChapter,setselectedChapter]= useState({chapter_id:120});
  const toggleExpand = (index) => {
    setExpandedIndexes(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleExpandClick = (index) => {
    setExpandedSentence(expandedSentence === index ? null : index);
  };

  const handleWordClick = (event, word) => {
    setAnchorEl(event.currentTarget);
    setWordDetails({ word, open: true });
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setWordDetails({ ...wordDetails, open: false });
  };
  useEffect(()=>{
    console.log("every reder body component");
  })

  useEffect(()=>{

    console.log("calledcssd",selectedChapter);
    const fetchChapter= async()=>{
      try{
        const sentencesResponse= await axios.get(`${BASE_API_URL}/user/getBook?chapterId=${selectedChapter.chapter_id}`,{withCredentials:true});
        

        if(sentencesResponse.status!==200)
        {
          throw new Error("Api request failed");
        }
        //const data = await sentencesResponse.json();
              console.log("api cll data sentences",sentencesResponse.data);
             // setDropdownData(data.data)
             setChapterSentences(sentencesResponse.data.data);

      }
      catch(err){
        console.log("Sentences fetch api failed",err)
      }
    
    }
    if(selectedChapter && selectedChapter.chapter_id)
    {
      console.log("called functin fetchchpter",selectedChapter);
      fetchChapter();
    }
    

  },[selectedChapter])

  useEffect(()=>{
          if(chapterSentences)
            {
            console.log("csent",chapterSentences)
            }
  },[chapterSentences])

  const sentences = paragraphText.match(/[^\.!\?]+[\.!\?]+/g);

  return (

    <>
    <Box>
      
{chapterSentences&&(
   <Typography variant="body1" component="div" sx={{ textAlign: 'justify', lineHeight: 1.8 }}>
   {chapterSentences.map((sentence, index) => (
     <span key={index} style={{ display: 'inline' }}>
       {sentence.value}{' '}
       <IconButton
         onClick={() => toggleExpand(index)}
         size="small"
         aria-label="expand"
         color="info"
         sx={{
           fontSize: 'inherit',
           padding: 0,
           marginLeft: 0,
           verticalAlign: 'middle',
         }}
       >
         <ExpandMoreOutlinedIcon fontSize="inherit" 
         sx={{
          transform: expandedIndexes[index] ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s',
        }}
         />
       </IconButton>
       {expandedIndexes[index] && (
         <Typography variant="body2" color="text.secondary" component="span" sx={{ display: 'block', marginTop: 1 }}>
           Additional information about this sentence.
         </Typography>
       )}
     </span>
   ))}
 </Typography>
 
)
}
      
    </Box>
     

    <Trial></Trial>
    </>
  );
};

export default React.memo(InteractiveParagraph);
//export default InteractiveParagraph;