import { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Collapse,
  Tooltip,
  
} from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { BASE_API_URL } from '../../../constants'; 
import axios from 'axios';
import AddHindiTranslate from './addhinditranslate';
import HindiTranslateView from './hinditranslateview';
const Englishentenceitem = ({ index, sentence }) => {


    const [isExpanded, setIsExpanded] = useState(false);
    const [addTranslateDialogOpen, setAddTranslateDialogOpen] = useState(false);
    
     
    const [translates,setTranslates]=useState([]);

useEffect(()=>{
  setIsExpanded(false);
setTranslates([]);

},[sentence])
     const reloadTranslate=async({englishSentenceId})=>{
      
      try{

        const hindiTranslatesResponse= await axios.get(`${BASE_API_URL}/user/gethinditranslates?englishSentenceId=${englishSentenceId}`,{withCredentials:true});
    
                const data=hindiTranslatesResponse.data.data;
                console.log("Translate data",data);
                setTranslates(data);
      }catch(err)
      {
        console.log("Failed to reload translates",err);
      }
     }

    const toggleExpand = async({englishSentenceId}) => {
        if(isExpanded)
        {
            setIsExpanded((prev) => !prev);
            return;
        }
        if(translates.length===0)
        {
            try{
                console.log("Englishsentence id",englishSentenceId)
                const hindiTranslatesResponse= await axios.get(`${BASE_API_URL}/user/gethinditranslates?englishSentenceId=${englishSentenceId}`,{withCredentials:true});
    
                const data=hindiTranslatesResponse.data.data;
                console.log("Translate data",data);
                setTranslates(data);
             }
             catch(err){
                console.log("Failed to load hindi translates",err);
             }
        }

         

        setIsExpanded((prev) => !prev);
      };
     

      useEffect(()=>{
        console.log("Translates",translates);
      })

      return (
    <>
        <span key={index} 
        style={{ display: 'inline' }}>
            {sentence.value}{' '}
            <IconButton
              onClick={() => toggleExpand({englishSentenceId:sentence.uuid})}
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
              <ExpandMoreOutlinedIcon
                fontSize="inherit"
                sx={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </IconButton>
            {isExpanded && (
              <>
              <IconButton
               onClick={() => setAddTranslateDialogOpen(true)}
                size="small"
                aria-label="add explanation"
                color="success"
                sx={{
                  fontSize: 'inherit',
                  padding: 0,
                  marginLeft: 1,
                  verticalAlign: 'middle',
                }}
              >
                <AddOutlinedIcon fontSize="inherit" />
              </IconButton>
              <Tooltip title="Refresh">
              <IconButton
               onClick={() => reloadTranslate({englishSentenceId:sentence.uuid})}
                size="small"
                aria-label="add explanation"
                color="success"
                sx={{
                  fontSize: 'inherit',
                  padding: 0,
                  marginLeft: 1,
                  verticalAlign: 'middle',
                }}
              >
                <RefreshOutlinedIcon fontSize="inherit" />
              </IconButton>
              </Tooltip>
              </>
            )}
          
          <Collapse in={isExpanded} key={index} timeout="auto" unmountOnExit>
            <Box
              sx={{
                marginTop: 1,
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: 1,
                backgroundColor: '#f9f9f9',
                maxHeight: 200,
                overflowY: 'auto',
              }}
            >
              {translates.length>0 ? translates.map((translate, translateIndex) => (
               <HindiTranslateView key={translateIndex} translate={translate} sentence={sentence} translateIndex={translateIndex}></HindiTranslateView>
              ))
            :
          <span>Not Available</span>
            }
            </Box>
          </Collapse>
          
          
          </span>

          {
            addTranslateDialogOpen && (
                <AddHindiTranslate currentSentence={sentence} setAddTranslateDialogOpen={setAddTranslateDialogOpen}></AddHindiTranslate>
            ) 
          }
           

    </>
      );

};

export default Englishentenceitem;