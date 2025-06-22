import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';
import {
  Grid2
} from '@mui/material';
const API_URL = import.meta.env.VITE_API_URL;

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google/login`;
  };

  return (
    <Grid2
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      className="mb-3"
    >
      <GoogleLoginButton onClick={handleGoogleLogin} />
    </Grid2>
  );
};

export default SocialLogin;

