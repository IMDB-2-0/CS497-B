import React from 'react'

function MovieRow({key, movie}) {
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
        <td>
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <input type="button" onClick={viewMovie} value="View"/>
        </td>
      </tr>
    </tbody>
  </table>
  );
}

export default MovieRow