import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchPopularMovies, retrieveNowPlayingMovies} from '../redux/actions/movieActions';
import { Button } from 'antd';
import './Home.css';

import MovieCard from '../components/MovieCard'; 
import MovieListHeading from '../components/MovieListHeading';
import MovieSubListHeading from '../components/MoveSubListHeader';
import SearchBox from '../components/SearchBox';
import AddFavourites from '../components/AddFavourites';
import RemoveFavourites from '../components/RemoveFavourites';


const Home = ({ auth, movies }) => {

    const [page, setPage] = React.useState(1)
    const [favourites, setFavourites] = React.useState([]);
    // const [data, setData] = React.useState("Press me!");

    React.useEffect(() => {
        store.dispatch(retrieveNowPlayingMovies(page));
        store.dispatch(fetchPopularMovies(page));
    }, [page])

    const { now_playing, now_popular } = movies;
    console.log(movies);

    // const { id } = auth;
//     // TODO: Edit and make work with nginx (problem with CORS in nginx config)
//     const link = 'http://localhost:5002/api/v1/recommender/status'

    return (
    
        <div className='container-fluid movie-app'>
            <MovieSubListHeading heading="Popular Movies" />
            <div className='row'>
                {now_popular.results && now_popular.results.map(info => (
                        <MovieCard movie={info} />   
                ))}
            </div>
            <MovieSubListHeading heading="Movies Now Playing" />
            <div className='row'>
                {now_playing.results && now_playing.results.map(info => (
                        <MovieCard movie={info}/>   
                ))}
            </div>
        </div>
    );
}

Home.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired,
    movies: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    movies: state.movies
});


export default connect(mapStateToProps)(Home);

