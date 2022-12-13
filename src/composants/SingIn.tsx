import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import theme from '../cusotmization/palette';
import { ThemeProvider } from '@mui/material/styles';
interface JSXElement extends React.ReactElement<any> { }
type Element = JSXElement | null;

// by Thomas Barron 09/12/2022 


export default function SignIn() {


  let navigate = useNavigate();
  const cookieLoginUser = 'login';
  const [users, setUsers] = useState();
  const [info, setInfo] = useState<Element>();

  //-- debug déconnexion--
  // onSubmit={déconnexion}
  /*
  const déconnexion = e => {
    e.preventDefault()
    delete_cookie(cookieLoginUser)
  }
  */
  //-- debug déconnexion--

  useEffect(() => {
    if (read_cookie(cookieLoginUser).length == 0) { //if user is already connected
      //console.log('Pas connecté')//-- debug --
    } else {
      navigate('/home');
    }
  }, []);


  //console.log(read_cookie(cookieLoginUser)[0])//-- debug --
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = event.currentTarget;
    /*
    console.log({
      //-- debug --
      email: data.get('email'),
      password: data.get('password'),
    });
    */
    async function fetchData() {

      //if field (email,password) is empty 
      if (data.get('email') == "" || data.get('password') == "") {
        setInfo(<Alert severity="warning">Il faut remplir les champs 'Login' et 'Mot de passe'.</Alert>);
      } else {
        const userData = await axios.get('/api/get/loginUserSecure/' + data.get('email') + '/' + data.get('password'));
        setUsers(userData.data);

        //if a user is found
        if (userData.data.length == 1) {

          bake_cookie(cookieLoginUser, userData.data);//set value in 'cookieLoginUser'
          navigate('/home');
        } else {
          setInfo(<Alert severity="error">Email ou mot de passe incorrect</Alert>);
        }
      }
    }
    fetchData();

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
              />
              <Button
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Connexion
              </Button>

              {info}
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot" variant="body2">
                    Mot de passe oublié ?
                  </Link>
                </Grid>
              </Grid>
            </>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}