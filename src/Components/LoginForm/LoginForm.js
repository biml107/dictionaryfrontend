import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; //this is used to route to home page
import { useSelector,useDispatch } from 'react-redux';
import { loggedIn,notLoggedIn } from "../../redux/login/loginSlice";
import { BASE_API_URL } from "../../constants";

function FormGroupExample({onClose} ) {
  //here taking props from app.js the logged status
 
  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    loginId: "",
    password: "",
  });

  const handleLogin = async (e) => {
      e.preventDefault();
    
    try {
      const loginRes = await axios.post(
        `${BASE_API_URL}auth/login`,
        {
          loginId: userDetails.loginId,
          password: userDetails.password,
        },
        {
            withCredentials:true
        }
      );
      //console.log(loginRes.data);
      if (loginRes.status === 200) {
              
        const profile=await axios.get(`${BASE_API_URL}user/getprofile`,{withCredentials:true}
        );
        //if i change the same api to get request then we have to remove the object {} which send body .
        //console.log(profile);
        if (profile.status === 200)
        {

          dispatch(loggedIn(profile.data.userDetails));//here i am passing only the action which is going to map with the second argument of reducer function "action" in loginslice reducer

          onClose();
           

          //console.log("user details on profile"+profile.data.data);
          //vsuccess(profile.data.data)
          //navigate("/");
          
          
        }
        else {
          //failure();
        }
        
        
        //console.log("Successfull login " + res.data.data.name);
      }
      else {
        console.log("gggyty"+loginRes.data.error);
      }
    } catch (err) {
      console.log(err.meaasge);
    }
  };
  return (
    <>
      <Form style={{  margin: "auto" }}>
        <h1 className="display-4 text-center">Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username or email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email or username"
            value={userDetails.loginId}
            onChange={(e) =>
              setUserDetails((userDetails) => ({
                ...userDetails,
                loginId: e.target.value,
              }))
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails((userDetails) => ({
                ...userDetails,
                password: e.target.value,
              }))
            }
          />
        </Form.Group>

        <Button
          onClick={(e) => handleLogin(e)}
          style={{ width: "100%", marginTop: "40px" }}
          variant="dark"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </>
  );
}



 
export default FormGroupExample;

