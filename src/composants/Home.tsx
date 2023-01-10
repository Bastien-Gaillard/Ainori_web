import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import theme from '../cusotmization/palette';
import { ThemeProvider } from '@mui/material/styles';
import  { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

export default function Home() {
    const cookieLoginUser = 'login';
    let navigate = useNavigate();
    useEffect(() => {
        if(read_cookie(cookieLoginUser).length ==0){//if user is not connected => login
            navigate('/login');
        }
    }, []);


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        un home quoi ...
      </Container>
    </ThemeProvider>
  );
}