import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TMDB_URL, TMDB_IMG_URL, TMDB_API_KEY } from '../constants/config';
import styles from './MovieCard.css'

const MovieCard = ({ movie }) => {
    // console.log(movie)
    let movieInfo = (
        <div className="container">
        <div className="row">
          <div className="col-md-4 card card-body">
            <img src= {`${TMDB_IMG_URL}/w780/${(movie.backdrop_path || movie.poster_path)}`} className="thumbnail" alt="Poster" />
          </div>
          <div className="col-md-8">
            <h2 className="mb-4">{movie.original_title}</h2>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Released:</strong> {movie.release_date}
              </li>
              <li className="list-group-item">
                <strong>Rated:</strong> {movie.vote_average}
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="card card-body bg-dark my-5 text-light">
            <div className="col-md-12">
              <h3>About </h3>
              {movie.overview}
              <hr />
            </div>
          </div>
        </div>
      </div>
    );

    let content = movieInfo;

    return (
        <>
           {content}
        </>
    );
}

  
export default MovieCard;