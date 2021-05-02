import axios from 'axios';
import { SEARCH_MOVIE, FETCH_MOVIES, 
    FETCH_POPULAR_MOVIES, 
    RETRIEVE_NOWPLAYING_MOVIES_SUCCESS, 
    FETCH_MOVIE, LOADING
} from './types';
import { TMDB_URL, TMDB_API_KEY } from "../../constants/config";

export const fetchPopularMovies = page => dispatch => {
    return axios
        .get(`${TMDB_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`)
        .then(response =>
        dispatch({
            type: FETCH_POPULAR_MOVIES,
            payload: response.data
        })
        ).catch(err => console.log(err));
}

export const retrieveNowPlayingMovies = page => dispatch => {
    return axios
        .get(`${TMDB_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}`)
        .then(res => {
            dispatch({
                type: RETRIEVE_NOWPLAYING_MOVIES_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => {
            console.log('Now Playing', error); 
        });
};

//Get likes
export const fetchLiked = async(id) => {
    return await axios
            .get('http://localhost:5050/api/v1/database/liked?id=' + id)
            .then(res => {
                return res.data;
            })
            .catch(error => {
                console.log('Liked', error); 
            });

    }

//Get dislikes
export const  fetchDisliked = (id) => {
    return axios
            .get('http://localhost:5050/api/v1/database/disliked?id=' + id)
            .then(res => {
                return res.data;
            })
            .catch(error => {
                console.log('Disliked', error); 
            });

    }

//Delete likes
export const deleteLiked = (id, movieID) => {
    return axios
            .delete('http://localhost:5050/api/v1/database/liked/delete?id=' + id  + '&movieID=' + movieID)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log('Disliked', error); 
            });
            
    }

    //Delete likes
export const addLiked = (id, movieID, rating) => {
    return axios
            .post('http://localhost:5050/api/v1/database/liked/add', {
                id: id, 
                movieID: movieID, 
                rating: rating 
            }) 
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log('Add', error); 
            });
            
    }