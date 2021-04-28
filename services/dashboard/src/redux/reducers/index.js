import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import movieReducer from './movieReducer';

export default combineReducers({
    auth: authReducer,
    movies: movieReducer,
    errors: errorReducer,
});
