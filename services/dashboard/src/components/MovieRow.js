import React from 'react';
import { Space, Button } from 'antd';
import {addLiked} from '../redux/actions/movieActions';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

function MovieRow({id, movie}) {
  function viewMovie() {
    const url = "https://www.themoviedb.org/movie/" + movie.id;
    window.location.href = url
  }
  movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path

  return (
    <table key={movie.id}>
    <tbody>
      <tr>
        <td>
          <img alt="poster" width="120" src={movie.poster_src}/>
        </td>
        <td className="container">
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <div className="container">
            <div className="row">
              <div className="col-sm-10 mt-2">
                <input type="button" onClick={viewMovie} value="View"/>
              </div>
              <div class="col-auto">
              <Space size={'large'}>
                <Button icon = {
                  <LikeOutlined style={{ fontSize: '32px', color: '#3bcfd4'}} 
                  onClick = {()=>{addLiked(id, movie, 1)}} />}>
                </Button>
                <Button icon = {
                  <DislikeOutlined style={{ fontSize: '32px', color: '#ff0000'}} 
                  onClick = {()=>{addLiked(id, movie, 0)}}/>}>
                </Button>
              </Space>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  );
}

export default MovieRow