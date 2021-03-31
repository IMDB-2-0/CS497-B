import React from 'react';
import PropTypes from  'prop-types';
import { connect } from  'react-redux';
import { GoogleLogin } from  'react-google-login';
import { Form, Input, Button, message } from  'antd';

import { loginUser } from  '../redux/actions/authActions';

const handleLogin = async googleData => {
    const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    console.log(data);
  }

const Login = ({auth, loginUserAction, history, errors}) => {

    const onSuccess = googleData => {
        console.log("Login success! :", googleData);
        loginUserAction(googleData, errors);
    }
    const onFailure = googleData => {
        message.error('Cannot login. Server may not be running');
        console.log("Login failed! :", googleData);
    }
    const {REACT_APP_GOOGLE_CLIENT_ID} = process.env;

    /*
    if(auth.isAuthenticated) {
        history.push('/');
    }
    */

    return (
        <>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign in with Google"
                className="ct-button ct-button--secondary"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy="single_host_origin"
            />
        </>
    );
}

Login.propTypes = {
    loginUserAction: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    //auth: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    //errors: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
  });
  
  export default connect(mapStateToProps, { loginUserAction: loginUser })(Login);