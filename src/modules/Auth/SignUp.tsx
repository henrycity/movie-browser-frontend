import React from 'react';

import AuthForm from './AuthForm';

interface SignInProps {
  location: any;
}

const SignUp: React.FunctionComponent<SignInProps> = (props) => <AuthForm {...props} isSignInForm={false} />;

export default SignUp;
