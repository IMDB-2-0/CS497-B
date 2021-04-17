import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { message } from 'antd';
import setAuthToken from '../../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

// Set logged in user
export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

// User loading
export const setUserLoading = () => ({
  type: USER_LOADING,
});

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/auth/register', userData)
    .then(() => history.push('/login'))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Login - get user token
export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post('/auth/login', userData)
    .then((res) => {
      if (res.status === 400) {
        // eslint-disable-next-line no-console
        console.log(res.json());
      }

      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwtDecode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // Add possible message
      message.success('Login Successful');
      // Go to Home page
      history.push('/');
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.response.data);
      if (typeof err.response.data.emailnotfound !== 'undefined') {
        message.error("Email doesn't exist");
      } else if (typeof err.response.data.passwordincorrect !== 'undefined') {
        message.error('Password is incorrect');
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set logout messaage
  message.success('Logout Successful');
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// ResetPassWord
export const ResetPassWord = (userData, history) => () => {
  axios
    .patch('/auth/password_reset', userData)
    .then((res) => {
      if (res.status === 400) {
        // eslint-disable-next-line no-console
        console.log(res.json());
      }
      message.success('Password Reset Successful');
      // Go to Home page
      history.push('/');
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.json);
      message.success('Password Reset Failed');
      // Go to Home page
      history.push('/');
    });
};


/*
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { message } from 'antd';
import setAuthToken from '../../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

 export const setCurrentUser = (decoded) => ({
    type: SET_CURRENT_USER,
    payload: decoded
});


export const loginUser = (googleData, history) => async(dispatch) => {
    await axios.post('http://localhost:8000/auth/login', JSON.stringify({token: googleData.tokenId}))
    .then((res) => {
        if (res.status === 400) {
          // eslint-disable-next-line no-console
          console.log(res.json());
        }
        message.success('Login successful!');
       // const { access_token } = res.data.data;
        console.log(res);
        // Set token to auth header
        //setAuthToken(access_token);
        // console.log(res.data.data)
        // Decode token to get user data
        //const decoded = jwtDecode(access_token);
        // Set current user
        //dispatch(setCurrentUser(decoded.user));
        // Set token to localStorage
        //localStorage.setItem('jwtToken', JSON.stringify(res.data));
        // localStorage.setItem('user', decoded.user);
        // Add possible message
        message.success('Login Successful');
        // Go to the home page
        history.push('/');
    }).catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response,
        });
    })
};
*/