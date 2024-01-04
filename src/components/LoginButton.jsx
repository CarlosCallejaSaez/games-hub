import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = async () => {
 
    await loginWithRedirect();

    if (isAuthenticated) {
   
      const accessToken = await getAccessTokenSilently();

      
      navigate("/home");
    }
  };

  return <button onClick={handleLogin}>Log In</button>;
};

export default LoginButton;
