import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { css } from '@emotion/core';
import { useSigninMutation, useSignupMutation } from './auth.graphql.generated';
import { useAuth } from '../../utils/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface AuthFormProps {
  isSignInForm: boolean;
}

const AuthForm: React.FunctionComponent<AuthFormProps> = (props) => {
  const { isSignInForm } = props;
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token: authToken, setToken } = useAuth();
  const location = useLocation<{ from: string }>();
  const { from } = location.state || { from: { pathname: '/' } };

  const [signup, { data: signupData }] = useSignupMutation();
  const [signin, { data: signinData }] = useSigninMutation();

  const token = signupData?.signup.token || signinData?.signin.token;

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
    }
  }, [token, setToken]);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    isSignInForm
      ? signin({ variables: { input: { email, password } } })
      : signup({ variables: { input: { email, password } } });
  };

  if (authToken || token) {
    return <Redirect to={from} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignInForm ? 'Sign in' : 'Sign up'}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChangeEmail}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChangePassword}
                value={password}
              />
            </Grid>
          </Grid>
          <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleClick}>
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={`/${isSignInForm ? 'signup' : 'signin'}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {isSignInForm ? "Don't have an account? Sign Up" : 'Already have an account? Sign in'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default AuthForm;
