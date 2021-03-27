import React from 'react';
import { Link } from 'react-router-dom';
import { TMDB_URL, TMDB_IMG_URL, TMDB_API_KEY } from '../constants/config';
import styles from './MovieCard.css'

const MovieCard = ({ info, viewMovie }) => {

    return (
        <>
            return (
                <div className="col-md-3 mb-5">
                    <div className="card card-body bg-dark text-center h-100">
                    <img className="w-100 mb-2" 
                         src={{uri: `${TMDB_IMG_URL}/w780/${(info.backdrop_path || info.poster_path)}`}} 
                         alt="Movie Cover" />
                         <div style={styles.cardContainer}>
                             <img src={{ uri: `${TMDB_IMG_URL}/w185/${info.poster_path}` }} 
                                style={styles.cardImage} 
                                alt="Info"/>
                             <div style={styles.cardTitle}>{info.original_title}</div>
                             <div style={styles.cardDescription}>{info.overview}</div>
                         </div>
                    </div>
                </div>
            )
        </>
    );
}

export default MovieCard;