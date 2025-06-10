import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
  TextField
} from '@mui/material';
import { useState } from 'react';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const getData = (e) => {
    const { value, name } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', formValues.email);  
    formData.append('password', formValues.password);

    try {
      const response = await axios.post('http://127.0.0.1:9000/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.status === 200) {
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        if (response.data.role === 'admin') {
          navigate('/admin');
        }
        else{
          navigate('/home');
        }
        
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box>
        <Typography component="h1" variant="h5">Sign In</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={getData}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={getData}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Link to="/forgot-password">Forgot password?</Link>
          <SocialLogin />
          <Box mt={2}>
            <Typography component="h5">
              Don't have an account? <Link to="/Register">Sign Up</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
