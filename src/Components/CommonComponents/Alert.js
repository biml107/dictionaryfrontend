import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissible({variant,message}) {
   

  return (
    <>
       <Alert key={variant} variant={variant}>
           {message}
        </Alert>
      
    </>
  );
}

export default AlertDismissible;