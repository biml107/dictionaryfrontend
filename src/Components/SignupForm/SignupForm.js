import React from 'react'
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BASE_API_URL } from '../../constants';
 

const SignUp = () => {
    
    const navigate = useNavigate();
    //const loginState = useSelector((state) => state.login);
    

    const [formData, setFormData] = useState({
        name: {
            value: '',
            error:''
        },
        username: {
            value: '',
            error:''
        },
        email: {
            value: '',
            error:''
        },
        password: {
            value: '',
            error:''
        },
        confirmPassword: {
            value: '',
            error:''
        },
        phoneNumber: {
            value: '',
            error:''
        }
    })

    const registerUser = async (e) => {
        e.preventDefault();
        const userDetails = {
            email: formData.email.value,
            username: formData.username.value,
            password: formData.password.value,
            name: formData.name.value,
            phoneNumber:formData.phoneNumber.value
        }

        try {
            const dbUser = await axios.post(`${BASE_API_URL}auth/register`, userDetails ,{withCredentials:true} );
            if (dbUser.status === 200)
            {
                
                console.log("Registered Successfully  " + dbUser.data.userDetails.username);
                
                
               // navigate('/');
            }
            else {
                console.log("Cant Register please fill details carefully");
            }
                   
        }

        catch (err) {
            console.log("Error while registering" + err);
        }
    }
  return (

    <>
      <Form style={{ margin: 'auto' }} >
          <h2 className='display-7 text-center'>Register</h2>
    <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter Full Name"
                    value={formData.name.value}
                  onChange={(e) => setFormData((formData) => ({ ...formData, name: {...formData.name,value:e.target.value} }))}
                />
       
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicUsername">
      <Form.Label>Username</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter username"
                    value={formData.username.value}
                  onChange={(e) => setFormData((formData) => ({ ...formData, username: {...formData.username,value:e.target.value} }))}
                />
       
    </Form.Group>

    
          <Form.Group className="mb-3" controlId="formBasicEmailsignup">
      <Form.Label>Email</Form.Label>
                <Form.Control type="email"
                    placeholder="Enter email"
                    value={formData.email.value}
                  onChange={(e) => setFormData((formData) => ({ ...formData, email: {...formData.email,value:e.target.value} }))}
                />
       
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicNumber">
    <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter PhoneNumber"
                    value={formData.phoneNumber.value}
                  onChange={(e) => setFormData((formData) => ({ ...formData, phoneNumber: {...formData.phoneNumber,value:e.target.value} }))}
                />
       
    </Form.Group>
  
    <Form.Group className="mb-3"  controlId="formBasicPasswordsignup">
      <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                    placeholder="Enter Password"
                    value={formData.password.value}
            onChange={(e) =>  setFormData((formData) => ({ ...formData, password: {...formData.password,value:e.target.value} }))}
                />
    </Form.Group>
          <Form.Group className="mb-3"   controlId="formBasicCPassword">
      <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password"
                    placeholder="Enter Confirm Password"
                    value={formData.confirmPassword.value}
            onChange={(e) =>  setFormData((formData) => ({ ...formData, confirmPassword: {...formData.confirmPassword,value:e.target.value} }))}
                />
    </Form.Group>
            <Button onClick={ (e)=>registerUser(e)} style={{    width: '100%',marginTop: '10px'}} variant="dark" type="submit">
      Register
    </Button>
  </Form>
 
  </>


  )
}
export default SignUp