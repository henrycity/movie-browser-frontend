import React from 'react';

import AuthForm from './AuthForm';

const SignUp: React.FunctionComponent = (props) => <AuthForm {...props} isSignInForm={false} />;

export default SignUp;
