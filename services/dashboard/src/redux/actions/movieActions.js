import axios from 'axios';
import { SEARCH_MOVIE, FETCH_MOVIES, 
    FETCH_POPULAR_MOVIES, 
    RETRIEVE_NOWPLAYING_MOVIES_SUCCESS, 
    FETCH_MOVIE, LOADING,
    FETCH_SEARCH_MOVIE
} from './types';
import { message } from 'antd';
import { TMDB_URL, TMDB_API_KEY } from "../../constants/config";

export const getMovieRequest = (searchValue) => dispatch => {
    return axios.get(`${TMDB_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${searchValue}`)
        .then(response =>
            dispatch({
                type: FETCH_SEARCH_MOVIE,
                payload: response.data
            })
        ).catch(err => console.log(err));
}

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
            .get('/api/v1/database/liked?id=' + id)
            .then(res => {
                return res.data;
            })
            .catch(error => {
                console.log('Liked', error); 
            });

    }

//Get dislikes
export const fetchDisliked = (id) => {
    return axios
            .get('/api/v1/database/disliked?id=' + id)
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
                message.success(res.data.message);
            })
            .catch(error => {
                console.log('Disliked', error); 
            });
            
    }

//Add likes
export const addLiked = (userID, movie, rating) => {
    
    const movieGenreTitlesById = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    }
    
    return axios
        .post('/api/v1/database/liked/add', {
            userID: userID, 
            movieID: movie.id, 
            movieTitle: movie.original_title,
            movieGenre: movie.genre_ids.map(genreID => movieGenreTitlesById[genreID]), // Map genre names
            rating: rating
        }) 
        .then(res => {
            message.success(res.data.message);
        })
        .catch(error => {
            console.log('Add', error); 
        });
}