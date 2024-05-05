import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { loggedIn,notLoggedIn } from "../../redux/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from '../../constants';
function BasicExample() {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const logout = async(e) => {
    try {
      const res = await axios.get(`${BASE_API_URL}auth/logout`,  { withCredentials: true });
      
      if (res.status === 200)
      {
        //console.log("Successfully logged out");
        // failure()
        dispatch(notLoggedIn());
        navigate('/');

      
      }
      else {
        console.log("Unsuccessfull logout");
      }
    }
    catch (err) {
      console.log("Error While Logging Out . please try again");
    }
  }

    
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {loginState.user.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item  as={Link} to={`/profile`}>My Profile</Dropdown.Item>
        <Dropdown.Item as={Link} to='/editprofile'>Edit Profile</Dropdown.Item>
        <Dropdown.Item onClick={logout} >Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

 
 
export default BasicExample;

