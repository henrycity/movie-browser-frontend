import React from 'react';

import AuthForm from './AuthForm';

const SignIn: React.FunctionComponent = (props) => <AuthForm {...props} isSignInForm={true} />;

export default SignIn;
