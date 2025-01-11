import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect } from 'react';
import  DropdownComponent  from '../DropdownComponent/Dropdown';
import LoginPopup from '../LoginPopup/loginPopup';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import {loggedIn,notLoggedIn} from '../../redux/login/loginSlice';
import { BASE_API_URL } from '../../constants';
function NavbarComponent() {
  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();
  
  //console.log("state " + loginState.status);
  //console.log("User "+loginState.user );
  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const response= await axios.get(`${BASE_API_URL}user/getbook?standard=10&chapter=1&bookName=First Flight`,{withCredentials:true});
        console.log(response.data.data);
        const profile=await axios.get(`${BASE_API_URL}user/getprofile` ,{withCredentials:true});
        if (profile.status === 200 ) {
          dispatch(loggedIn(profile.data.userDetails));

        }
        else {
        dispatch(notLoggedIn());
        }
      } catch (err) {
        

      }
    }
    fetchLogin();
  },[]);

  const [showLogin, setShowLogin] = useState(false);
 
  const toggleLogin = () => {
    setShowLogin(!showLogin);
  
  }
  
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary "  >
      <Container fluid>
        <Navbar.Brand  >Dictionary</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link  >Home</Nav.Link>
            <Nav.Link  >About Us</Nav.Link>
            <Nav.Link  >Contact Us</Nav.Link>
         
          </Nav>
          <Form className="d-flex">
            {loginState.status ? <DropdownComponent name={ loginState.user.name} /> :
             null}
{/*         s
            <Link  to='/login'><Button variant="outline-success"
                    onClick={isLoggedIn.status?logout:login}
            >{isLoggedIn.status ? 'Log Out' : ' Sign In'}</Button></Link> */}
             {/* in the above Link tag two things happened onclick of link tag and one for button so to act like the LInk the button we can change the syntax
             so the it will inherit all the  properties of BUtton but act like a Link of react dom */}
            {/* <Button  as={Link} to='signup' variant="outline-success"
                    onClick={isLoggedIn.status?logout:login}
            >{isLoggedIn.status ? 'Log Out' : ' Sign In'}</Button> */}

            
{/* {loginState.status ? <Button variant="outline-success"
                                          onClick={logout}
                                   >Log Out</Button> :
              <Button as={ Link }  to='/login' variant="outline-success"
                                    
                                  >Sign In</Button>} */}
            {loginState.status ? null :
              <Button   variant="outline-success" onClick={toggleLogin}
                                    
                                  >Sign In</Button>}

          </Form>
        </Navbar.Collapse>
      </Container>
      </Navbar>
      
      {showLogin && <LoginPopup onClose={toggleLogin} />}
      {/* {showSignup && <signupPopup onClose={ toggleSignup} />} */}
    </>
  );
}

 
export default NavbarComponent;

