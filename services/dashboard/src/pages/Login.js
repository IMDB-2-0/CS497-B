import React from 'react';
import PropTypes from  'prop-types';
import { connect } from  'react-redux';
import { GoogleLogin } from  'react-google-login';
import { Form, Input, Button, message } from  'antd';
import axios from 'axios';

import { loginUser } from  '../redux/actions/authActions';


const Login = ({auth, loginUserAction, history, errors}) => {

    const onSuccess = async googleData => {
        await axios.post("/api/v1/auth/googlelogin", 
        {tokenId: googleData.tokenId})
        .then((res) => {
          if (res.status === 200) {
            // eslint-disable-next-line no-console
            console.log("hello, it worked!")
            // TODO: Work on setting auth token
            console.log(res);
            history.push('/'); 
          }
        })
        .catch((err) => {
          console.log(err);
        })
        
    }

    const onFailure = googleData => {
        message.error('Cannot login. Server may not be running');
        console.log("Login failed! :", googleData);
    }

    const {REACT_APP_GOOGLE_CLIENT_ID} = process.env;
  
    return (
        <>
            <GoogleLogin
                clientId={REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign in with Google"
                className="ct-button ct-button--secondary"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
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