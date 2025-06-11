import {
 Box,
 Button,
 Checkbox,
 Container,
 FormControl,
 InputLabel,
 MenuItem,
 Select,
 FormControlLabel,
 Typography,
 TextField
} from '@mui/material';
import { useState } from 'react';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
 const [formValues, setFormValues] = useState({
  name: '',
  email: '',
  password: '',
  role: '', // New field for role
 });

 const navigate = useNavigate();

 const getData = (e) => {
  const { value, name } = e.target;
  setFormValues(prev => ({
   ...prev,
   [name]: value,
  }));
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://127.0.0.1:8000/register', formValues, {
   headers: {
    'Content-Type': 'application/json'
   }
  })
   .then((response) => {
    if (response.status === 200) {
     navigate('/');
    }
    alert('Registration successful! Please log in.');
   })
   .catch((error) => {
    console.error('Login error:', error);
    alert('Login failed: ' + (error.response?.data?.detail || error.message));
   });
 };

 return (
  <>
   <Container component="main" maxWidth="xs">
    <Box>
     <Typography component="h1" variant="h5">
      Sign Up
     </Typography>
     <Box component="form" onSubmit={handleSubmit}>
      <TextField
       margin="normal"
       required
       fullWidth
       id="name"
       label="Name"
       name="name"
       autoComplete="name"
       autoFocus
       onChange={getData}
      />
      <TextField
       margin="normal"
       required
       fullWidth
       id="email"
       type="email"
       label="Email Address"
       name="email"
       autoComplete="email"
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
      <FormControl fullWidth required margin="normal">
       <InputLabel id="role-label">Role</InputLabel>
       <Select
        labelId="role-label"
        id="role"
        name="role"
        value={formValues.role}
        label="Role"
        onChange={getData}
       >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
       </Select>
      </FormControl>

      <FormControlLabel
       control={<Checkbox value="remember" color="primary" />}
       label="Remember me"
      />

      <Button
       type="submit"
       fullWidth
       variant="contained"
       sx={{ mt: 3, mb: 2 }}
      >
       Register
      </Button>

      <SocialLogin />
     </Box>
    </Box>
   </Container>
  </>
 );
};

export default Register;
