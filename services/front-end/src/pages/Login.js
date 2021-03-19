import React from 'react';
import { GoogleLogin } from 'react-google-login'

const Login = () => {

    const onSuccess = (res) => console.log("Login success! :", res);
    const onFailure = (res) => console.log("Login failed! :", res);

    const {REACT_APP_GOOGLE_CLIENT_ID} = process.env;

    console.log(REACT_APP_GOOGLE_CLIENT_ID);
    return (
        <>
            <GoogleLogin
                clientId={REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign in with Google"
                className="ct-button ct-button--secondary"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
            />
        </>
    );
}

export default Login;