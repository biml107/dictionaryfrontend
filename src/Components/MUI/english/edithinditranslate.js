import{ useEffect, useState,  } from 'react';
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
 

const EditHindiTranslate = ({currentSentence,translate,setEditTranslateDialogOpen,editTranslateDialogOpen}) =>{
       
 

       const[dialogTitleText, setDialogTitleText]= useState({});
       const [newExplanation, setNewExplanation] = useState({ hindi: translate.hindi, hindiExplain: translate.hindiExplain });


       useEffect(()=>{
        console.log("NewExplanation",newExplanation.hindi.length,newExplanation.hindiExplain.length);
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
    
        
      };


    return(
        <>
          <Dialog key={currentSentence.uuid} open={editTranslateDialogOpen} onClose={closeEditTranslateDialog} maxWidth="sm" fullWidth disableEnforceFocus>
        
        {Object.keys(dialogTitleText).length !== 0?(<DialogTitle sx={{ color: `${dialogTitleText.color}` }}>
        {  dialogTitleText.message } 
        
        </DialogTitle>):
        <DialogTitle sx={{ color: 'blue' }} >
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
              setNewExplanation((prev) => ({ ...prev, hindi: e.target.value.replace(/\s+/g,' ')}))
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
            value={newExplanation.hindiExplain}
            onChange={(e) =>
              setNewExplanation((prev) => ({ ...prev, hindiExplain: e.target.value.replace(/\s+/g,' ') }))
            }
            sx={{ resize: 'vertical' }}
            helperText={`Max ${currentSentence.value.length*20-newExplanation.hindiExplain.length} chars`}
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