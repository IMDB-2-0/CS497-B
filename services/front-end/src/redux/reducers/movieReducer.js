import {
    SEARCH_MOVIE,
    FETCH_MOVIES,
    FETCH_MOVIE,
    LOADING,
    RETRIEVE_NOWPLAYING_MOVIES_SUCCESS,
    FETCH_POPULAR_MOVIES

} from '../actions/types';


const initialState = {
    text: '',
    movies: [],
    loading: false,
    now_playing: [],
    now_popular: [],
};
  

export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_MOVIE:
            return {
                ...state,
                text: action.payload,
                loading: false
            };
        case FETCH_POPULAR_MOVIES:
            return {
                ...state,
                now_popular: action.payload,
                loading: false
            };
        case RETRIEVE_NOWPLAYING_MOVIES_SUCCESS:
            return {
                ...state,
                now_playing: action.payload,
                loading: false
            };
        case FETCH_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false
            };
        case FETCH_MOVIE:
            return {
                ...state,
                movie: action.payload,
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}