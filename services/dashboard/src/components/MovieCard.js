import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TMDB_URL, TMDB_IMG_URL, TMDB_API_KEY } from '../constants/config';
import styles from './MovieCard.css';
import { Button } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import {addLiked} from '../redux/actions/movieActions';
import 'bootstrap/dist/css/bootstrap.min.css';
const MovieCard = ({ movie, id }) => {
    // console.log(movie)
    return (
      <div className="container">
        <div className='image-container d-flex justify-content-start m-3'>
          <img src= {`${TMDB_IMG_URL}/w780/${(movie.backdrop_path || movie.poster_path)}`} className="thumbnail" alt="Poster" />
        </div>
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-4">{movie.original_title}</h2>
          </div>
        </div>
      </div>
    );
}
/*

    /*<div
        onClick={() => props.handleFavouritesClick(movie)}
        className='overlay d-flex align-items-center justify-content-center'
      >
      </div>
      return (
      
        <>
           <div className="container">
        <div className="row">
          <div className="col-md-4 card card-body">
            <img src= {`${TMDB_IMG_URL}/w780/${(movie.backdrop_path || movie.poster_path)}`} className="thumbnail" alt="Poster" />
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-8">
                <h2 className="mb-4">{movie.original_title}</h2>
              </div>
              <div className="col-md-4">
                <Button icon = {
                  <LikeOutlined style={{ fontSize: '64px'}} 
                  onClick = {()=>{addLiked(id, movie.id, 5, 0)}} />}>
                </Button>
                <Button icon = {
                  <DislikeOutlined style={{ fontSize: '64px'}} 
                  onClick = {()=>{addLiked(id, movie.id, 1, 0)}}/>}>
                </Button>
              </div>
            </div>
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
        </>
    );
    */

  
export default MovieCard;