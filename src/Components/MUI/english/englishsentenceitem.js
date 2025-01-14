import { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Collapse,
  Tooltip,
  Typography,
  
} from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { BASE_API_URL } from '../../../constants'; 
import axios from 'axios';
import AddHindiTranslate from './addhinditranslate';
import EditHindiTranslate from './edithinditranslate';
import { useSelector,useDispatch } from 'react-redux';
const Englishentenceitem = ({ index, sentence }) => {

  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();

    const [isExpanded, setIsExpanded] = useState(false);
    const [addTranslateDialogOpen, setAddTranslateDialogOpen] = useState(false);
    const [editTranslateDialogOpen, setEditTranslateDialogOpen] = useState(false);
     
    const [translates,setTranslates]=useState([]);


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
      const handleLike = (sentenceIndex, explanationIndex) => {
        console.log(`Liked explanation ${explanationIndex} of sentence ${sentenceIndex}`);
        // Add your logic here
      };
    
      const handleReport = (sentenceIndex, explanationIndex) => {
        console.log(`Reported explanation ${explanationIndex} of sentence ${sentenceIndex}`);
        // Add your logic here
      };

      useEffect(()=>{
        console.log("Translates",translates);
      })

      return (
    <>
        <span style={{ display: 'inline' }}>
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
          
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
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
                <Box
                  key={translateIndex}
                  sx={{
                    marginBottom: 2,
                    padding: 1,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                  }}
                >
                    <Box
                    sx={{
                      paddingBottom: 1,
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {translate.hindi}
                    </Typography>
                  </Box>

                   {/* Lower Part: Additional Info and Buttons */}
                   <Box
                    sx={{
                      marginTop: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {translate.hindiExplain} {/* Additional info */}
                    </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    {detail}
                  </Typography> */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Like">
                    <IconButton
                      //onClick={() => handleLike(index, translateIndex)}
                      color="primary"
                      size="small"
                    >
                      <FavoriteBorderIcon fontSize="small" />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Report">
                    <IconButton
                      //onClick={() => handleReport(index, translateIndex)}
                      color="error"
                      size="small"
                    >
                      <FlagOutlinedIcon fontSize="small" />
                    </IconButton></Tooltip>


                    {(loginState?.user?.uuid===translate.userId)&&<Tooltip title="Edit">
                    <IconButton
                     onClick={() => setEditTranslateDialogOpen(true) }
                      color="error"
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton></Tooltip>}

                    {editTranslateDialogOpen &&<EditHindiTranslate currentSentence={sentence}
                                                                   translate={translate}
                                                                   setEditTranslateDialogOpen={setEditTranslateDialogOpen}
                    
                    ></EditHindiTranslate> }
                  </Box>
                  </Box>
                </Box>
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