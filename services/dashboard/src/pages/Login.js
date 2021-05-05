import React from 'react';
import PropTypes from  'prop-types';
import { connect } from  'react-redux';
import { GoogleLogin } from  'react-google-login';
import { message } from  'antd';



import { googleLogin } from  '../redux/actions/authActions';


const Login = ({auth, loginUserAction, history, errors}) => {

    const onSuccess = async googleData => {
        loginUserAction(googleData, history);
    }

    const onFailure = googleData => {
        message.error('Cannot login. Server may not be running');
        console.log("Login failed! :", googleData);
    }

    const {REACT_APP_GOOGLE_CLIENT_ID} = process.env;
  
    if (auth.isAuthenticated) {
      history.push('/');
    }

    return (
      <div class="text-center"
        style={{
          justifyContent: 'center',
          padding: '25px',
          background: 'rgba(255, 255, 255, 1.0)',
        }}
      >
        <h4>Log in</h4>
        <GoogleLogin
            clientId={REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            className="ct-button ct-button--secondary"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
        />
      </ div>
    );
}

Login.propTypes = {
    loginUserAction: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    errors: PropTypes.object.isRequired,
  };
  
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUserAction: googleLogin })(Login);