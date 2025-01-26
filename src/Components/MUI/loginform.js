import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,

} from '@mui/material';
import axios from 'axios';
import { loggedIn,notLoggedIn } from "../../redux/login/loginSlice";
import { useSelector,useDispatch } from 'react-redux';
import { BASE_API_URL } from '../../constants';
const LoginPage = ({toggleLogin}) => {

  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Example API call
    try {
       

      const loginRes = await axios.post(
        `${BASE_API_URL}/auth/login`,
        {
          loginId: username,
          password:password,
        },
        {
            withCredentials:true
        }
      );

      if(loginRes.status!==200)
      {
        throw new Error("Response not ok in login api");
      }
      const data=loginRes.data;
      console.log("login details",data);
      //dispatch(loggedIn(profile.data.user));
      dispatch(loggedIn(data.user));
      toggleLogin();

      setTimeout(function() {
       dispatch(notLoggedIn())
    }, 60*60*1000);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            fullWidth
            label="Username or Email"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
