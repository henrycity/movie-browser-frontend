import React from 'react';

import AuthForm from './AuthForm';

interface SignInProps {
  location: any;
}

const SignIn: React.FunctionComponent<SignInProps> = (props) => <AuthForm {...props} isSignInForm={true} />;

export default SignIn;
