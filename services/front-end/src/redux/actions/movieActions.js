import axios from 'axios';
import { SEARCH_MOVIE, FETCH_MOVIES, FETCH_POPULAR_MOVIES, FETCH_MOVIE, LOADING } from './types';
import { TMDB_URL, TMDB_API_KEY } from "../../constants/config";

export const fetchPopularMovies = page => dispatch => {
    axios
        .get(`${TMDB_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`)
        .then(response =>
        dispatch({
            type: FETCH_POPULAR_MOVIES,
            payload: response.data
        })
        ).catch(err => console.log(err));
}

export const retrieveNowPlayingMovies = page => dispatch => {
		axios
            .get(`${TMDB_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}`)
            .then(res => {
                dispatch({
                    type: RETRIEVE_NOWPLAYING_MOVIES_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                console.log('Now Playing', error); 
            });
	};
}

