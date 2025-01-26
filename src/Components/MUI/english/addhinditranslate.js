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

const AddHindiTranslate = ({currentSentence,setAddTranslateDialogOpen}) =>{
       
       const[dialogTitleText, setDialogTitleText]= useState({});
       const [newExplanation, setNewExplanation] = useState({ hindi: '', hindiexplain: '' });

       const closeAddTranslateDialog=()=>{
        setAddTranslateDialogOpen(false)
       }

       const handleSaveExplanation = async() => {
        console.log(`Saving explanation for sentence ${currentSentence}:`,currentSentence, newExplanation);
        try{
          const sentencesResponse= await axios.post(`${BASE_API_URL}/user/addhindi`,
            {englishSentenceId:currentSentence.uuid,
              hindi:newExplanation.hindi,
              hindiExplain:newExplanation.hindiexplain
            },
            {withCredentials:true});
          
            
           
            setDialogTitleText({message:"Saved Successfully",color:"blue"});
            setNewExplanation({ hindi: '', hindiexplain: '' });
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
          <Dialog open={true} onClose={closeAddTranslateDialog} maxWidth="sm" fullWidth>
        
        {Object.keys(dialogTitleText).length !== 0?(<DialogTitle sx={{ color: `${dialogTitleText.color}` }}>
        {  dialogTitleText.message } 
        
        </DialogTitle>):<DialogTitle sx={{ color: 'blue' }} >
        { currentSentence.value}
        
        </DialogTitle>}
        <IconButton
            aria-label="close"
            onClick={closeAddTranslateDialog}
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
              setNewExplanation((prev) => ({ ...prev, hindi: e.target.value.replace(/\s+/g,' ') }))
            }
            sx={{ resize: 'vertical' }}
            helperText={`Max ${currentSentence.value.length*10-newExplanation.hindi.length} chars`}
          />
          <TextField
            label="Hindi Explanation"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
           // rows={4}
            maxRows={10}
            value={newExplanation.hindiexplain}
            onChange={(e) =>
              setNewExplanation((prev) => ({ ...prev, hindiexplain: e.target.value.replace(/\s+/g,' ') }))
            }
            sx={{ resize: 'vertical' }}
            helperText={`Max ${currentSentence.value.length*20-newExplanation.hindiexplain.length} chars`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddTranslateDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveExplanation} color="primary" variant="contained" 
          disabled={!newExplanation.hindi.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

        </>

    );

}
export default AddHindiTranslate;