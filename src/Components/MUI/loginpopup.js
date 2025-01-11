import * as React from 'react';
import { useState } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
 import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Draggable from 'react-draggable';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Paper,
} from '@mui/material';
import LoginPage from './loginform';
import SignUpPage from './signupform';
function PaperComponent(props) {
    const nodeRef = React.useRef(null);
    return (
      <Draggable
        nodeRef={nodeRef}
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} ref={nodeRef} />
      </Draggable>
    );
  }
export default function AlertDialog({ toggleLogin,showLogin }) {
   
  React.useEffect(()=>{
    console.log("dialogpoopuprender",showLogin)
    
  })
  const [chooseForm,setChooseForm]=useState(true);
  const toggleForm = () => {
    setChooseForm(!chooseForm);
  
  }
  return (
     
    <Dialog
        open={showLogin}
        onClose={(_, reason) => {
          // Prevent closing on outside click
          if (reason === 'backdropClick') return;
          toggleLogin();
        }}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        BackdropProps={{
          onClick: () => {}, // Prevent close on backdrop click
        }}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <IconButton
          aria-label="close"
          onClick={toggleLogin}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          {chooseForm?<LoginPage toggleLogin={toggleLogin}/>:<SignUpPage></SignUpPage>}
          
          
        </DialogContent>
        <DialogActions>
    {   chooseForm?   
          <Button variant="contained" color="success" onClick={toggleForm}>Sign Up</Button>
           :
          <Button variant="contained" color="success" onClick={toggleForm}>Sign In</Button>}
        </DialogActions>
      </Dialog>
    
  );
}
