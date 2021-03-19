import axios from 'axios';
import { message } from 'antd';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

export const loginUser = (googleData, history) => async(dispatch) => {
    await axios.post('/auth/login', {token: googleData.tokenId})
    .then((res) => {
        if (res.status === 400) {
          // eslint-disable-next-line no-console
          console.log(res.json());
        }
        message.success('Login successful!');
        return res.json();
    }).catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    })
};