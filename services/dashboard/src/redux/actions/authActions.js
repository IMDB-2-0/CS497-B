import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { message } from 'antd';
import setAuthToken from '../../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

/**
 * 
 * @param {*} decoded 
 * Helps user login
 */
 export const setCurrentUser = (decoded) => ({
    type: SET_CURRENT_USER,
    payload: decoded
});


export const loginUser = (googleData, history) => async(dispatch) => {
    await axios.post('/auth/login', {token: googleData.tokenId})
    .then((res) => {
        if (res.status === 400) {
          // eslint-disable-next-line no-console
          console.log(res.json());
        }
        message.success('Login successful!');
        const { access_token } = res.data.data;
        // Set token to auth header
        setAuthToken(access_token);
        // console.log(res.data.data)
        // Decode token to get user data
        const decoded = jwtDecode(access_token);
        // Set current user
        dispatch(setCurrentUser(decoded.user));
        // Set token to localStorage
        localStorage.setItem('jwtToken', JSON.stringify(res.data));
        // localStorage.setItem('user', decoded.user);
        // Add possible message
        message.success('Login Successful');
        // Go to the home page
        history.push('/');
    }).catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    })
};