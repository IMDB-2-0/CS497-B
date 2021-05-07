import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TMDB_URL, TMDB_IMG_URL, TMDB_API_KEY } from '../constants/config';
import styles from './MovieCard.css';
import { Space, Button } from 'antd';
import { LikeTwoTone, DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import {addLiked} from '../redux/actions/movieActions';
import 'bootstrap/dist/css/bootstrap.min.css';
const MovieCard = ({ movie }) => {

    return (
      <div className="container">
        <div className='image-container d-flex justify-content-start m-3'>
          <img src= {`${TMDB_IMG_URL}/w780/${(movie.backdrop_path || movie.poster_path)}`} className="thumbnail" alt="Poster" />
        </div> 
        <div className="row">
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
            <div className="col-md-4 mt-2">
              <Space size={'large'}>
                <Button icon = {
                  <LikeOutlined style={{ fontSize: '32px', color: '#3bcfd4'}} 
                  onClick = {()=>{addLiked(localStorage.getItem('id'), movie, 1)}} />}>
                </Button>
                <Button icon = {
                  <DislikeOutlined style={{ fontSize: '32px', color: '#ff0000'}} 
                  onClick = {()=>{addLiked(localStorage.getItem('id'), movie, 0)}}/>}>
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    );
}
export default MovieCard;