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

export const googleLogin =  (googleData, history) => async(dispatch) => {
  await axios.post("/api/v1/auth/googlelogin", {tokenId: googleData.tokenId})
    .then((res) => {
      if (res.status === 400) {
        console.log(res.json());
      }
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem('jwtToken', token);
      // localStorage.setItem('id', id);
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
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    })
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