import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import LoginFormComponent from '../LoginForm/LoginForm';
import SignupFormComponent from '../SignupForm/SignupForm';
function LoginPopup({ onClose }) {
  const [signin, setSignin] = useState(true);
  
  const showSignIn = () => {
    setSignin(true);
    
  }
  const showSignUp = () => {
    setSignin(false);
  }

  return (
    <div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
      >
          <Modal show={true} onHide={onClose} animation={false}  backdrop="static">
    
      <Modal.Header closeButton>
                  <Modal.Title style={ {alignItems:"center"}}>Please Login to Continue</Modal.Title>
      </Modal.Header>

        <Modal.Body>
          {signin ? <LoginFormComponent onClose={onClose} /> : < SignupFormComponent showSignIn={ showSignIn} />}
       
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={showSignUp}>Sign Up</Button>
        <Button variant="secondary" onClick={showSignIn}>Sign In </Button>
      </Modal.Footer>
               
              
              </Modal>
  </div>
  )
}

export default LoginPopup

