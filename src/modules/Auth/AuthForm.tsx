import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { useAuth } from '../../utils/auth';
import { css } from '@emotion/core';

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

interface AuthProps {
  isSignInForm: boolean;
}

const AuthForm: React.FunctionComponent<AuthProps> = (props) => {
  const { isSignInForm } = props;
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, signin, signup } = useAuth();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const location = useLocation<{ from: string }>();
  const { from } = location.state || { from: { pathname: '/' } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  if (token) {
    setRedirectToReferrer(true);
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    isSignInForm ? signin(email, password) : signup(email, password);
  };

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
