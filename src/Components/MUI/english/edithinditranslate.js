import{ useEffect, useState,useContext } from 'react';
import {

    IconButton,
    
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import { BASE_API_URL } from '../../../constants'; 
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';

const EditHindiTranslate = ({currentSentence,translate,setEditTranslateDialogOpen}) =>{
       
  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();

       const[dialogTitleText, setDialogTitleText]= useState({});
       const [newExplanation, setNewExplanation] = useState({ hindi: translate.hindi, hindiExplain: translate.hindiExplain });


       useEffect(()=>{
        console.log("NewExplanation",newExplanation);
       })
       const closeEditTranslateDialog=()=>{
        setEditTranslateDialogOpen(false)
       }

       const handleHindiExplanationUpdate = async() => {
        //console.log(`Saving explanation for sentence ${currentSentence}:`,currentSentence, newExplanation);
        try{
          const sentencesResponse= await axios.put(`${BASE_API_URL}/user/updatehindi`,
            {hindiSentenceId:translate.uuid,
              hindi:newExplanation.hindi,
              hindiExplain:newExplanation.hindiExplain
            },
            {withCredentials:true});
          
            
           console.log("updated translate",sentencesResponse.data);
            setDialogTitleText({message:"Saved Successfully",color:"blue"});
            //setNewExplanation({ hindi: '', hindiExplain: '' });
            setTimeout(function() {
              setDialogTitleText({});
          }, 4000);
                
        }
        catch(err){
          setDialogTitleText({message:err.response.data.message,color:"red"})
           
          console.log("hindi Sentences fetch api failed",err.response.data.message);
          setTimeout(function() {
            setDialogTitleText({});
        }, 4000);
        }
    
        // Add logic to save the explanation
        //handleDialogClose();
      };


    return(
        <>
          <Dialog open={true} onClose={closeEditTranslateDialog} maxWidth="sm" fullWidth>
        
        {Object.keys(dialogTitleText).length !== 0?(<DialogTitle sx={{ color: `${dialogTitleText.color}` }}>
        {  dialogTitleText.message } 
        
        </DialogTitle>):<DialogTitle sx={{ color: 'blue' }} >
        { currentSentence.value}
        
        </DialogTitle>}
        <IconButton
            aria-label="close"
            onClick={closeEditTranslateDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        <DialogContent dividers>
          <TextField
            label="Hindi"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
           // rows={2}
            maxRows={6}
            required
            value={newExplanation.hindi}
            onChange={(e) =>
              setNewExplanation((prev) => ({ ...prev, hindi: e.target.value }))
            }
            sx={{ resize: 'vertical' }}
          />
          <TextField
            label="Hindi Explanation"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
           // rows={4}
            maxRows={10}
            value={newExplanation.hindiExplain}
            onChange={(e) =>
              setNewExplanation((prev) => ({ ...prev, hindiExplain: e.target.value }))
            }
            sx={{ resize: 'vertical' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditTranslateDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleHindiExplanationUpdate} color="primary" variant="contained" 
          disabled={!newExplanation.hindi.trim()||(newExplanation.hindi===translate.hindi&&newExplanation.hindiExplain===translate.hindiExplain)}
          >
           Update
          </Button>
        </DialogActions>
      </Dialog>

        </>

    );

}
export default EditHindiTranslate;