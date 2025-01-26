import{ useEffect, useState,useContext } from 'react';
import {

    IconButton,
    Box,
    Typography,
    Tooltip,
  } from '@mui/material';
  import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

  import { BASE_API_URL } from '../../../constants'; 
import axios from 'axios';

import EditHindiTranslate from './edithinditranslate';
import { useSelector} from 'react-redux';
const HindiTranslateView = ({translateIndex,sentence,translate}) =>{
    const loginState = useSelector((state) => state.login);
    

    const [editTranslateDialogOpen, setEditTranslateDialogOpen] = useState(false);
    const [localTranslate,setLocalTranslate]= useState({...translate});//this is due to not able to modify translate likedby field when usrerliked and not able to rerender the liked status we cannnot modify any props value in child component in react

    useEffect(()=>{
      console.log("logged user details",loginState?.user,translate,translateIndex,typeof(translate.likedby))
    },[loginState, translate, translateIndex])

 useEffect(()=>{
  console.log("translate changed");
  setLocalTranslate({...translate})
    },[translate])
     


    const incrementLikesCount=async()=>{
      try{
        const sentencesResponse= await axios.put(`${BASE_API_URL}/user/incrementhindilikescount`,
          {hindiSentenceId:translate.uuid,
          },
          {withCredentials:true});
        
          
         
           console.log("data,",sentencesResponse.data);
           setLocalTranslate((prev)=>({...prev,likedby:true}))
         
        
              
      }
      catch(err){
         
         
        console.log("incrementlikeapi",err.response.data.message,err.response);
         
      }
    }
    const decrementLikesCount=async()=>{
      try{
        const sentencesResponse= await axios.put(`${BASE_API_URL}/user/decrementhindilikescount`,
          {hindiSentenceId:translate.uuid,
          },
          {withCredentials:true});
        
          
         
           console.log("data,",sentencesResponse.data);
           setLocalTranslate((prev)=>({...prev,likedby:false}))
         
        
              
      }
      catch(err){
         
         
        console.log("incrementlikeapi",err.response.data.message,err.response);
         
      }
    }

    return (
        <>
         <Box
                  key={translateIndex+sentence.uuid}
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
                      {localTranslate.hindi}
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
                      {localTranslate.hindiExplain} {/* Additional info */}
                    </Typography>
                  
                 {loginState?.user?.uuid&& <Box sx={{ display: 'flex', gap: 1 }}>
                  {
                    localTranslate.likedby===true?
                     
                    (<IconButton
                      onClick={() => decrementLikesCount()}
                      color="primary"
                      size="small"
                    >
                      <FavoriteIcon fontSize="small" />
                    </IconButton>)
                    :
                      
                    ( <IconButton
                       onClick={() => incrementLikesCount()}
                       color="primary"
                       size="small"
                     >
                       <FavoriteBorderIcon fontSize="small" />
                     </IconButton>)
                     

                  }
                    <Tooltip title="Report">
                    <IconButton
                      //onClick={() => handleReport(index, translateIndex)}
                      color="error"
                      size="small"
                    >
                      <FlagOutlinedIcon fontSize="small" />
                    </IconButton></Tooltip>


                    {(loginState?.user?.uuid===localTranslate.userId)&&<Tooltip title="Edit">
                    <IconButton
                     onClick={() => setEditTranslateDialogOpen(true) }
                      color="error"
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton></Tooltip>}

                    {editTranslateDialogOpen &&<EditHindiTranslate key={sentence.uuid}
                                                                   currentSentence={sentence}
                                                                   editTranslateDialogOpen={editTranslateDialogOpen}
                                                                   translate={translate}
                                                                   setEditTranslateDialogOpen={setEditTranslateDialogOpen}
                                                                    
                    
                    ></EditHindiTranslate> }
                  </Box>}
                  </Box>
                </Box>

        </>
    );

}
export default HindiTranslateView;