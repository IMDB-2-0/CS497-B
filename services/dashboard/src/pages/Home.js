import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchPopularMovies, retrieveNowPlayingMovies} from '../redux/actions/movieActions';
import './Home.css';

import MovieCard from '../components/MovieCard'; 
import MovieSubListHeading from '../components/MoveSubListHeader';

const Home = ({ auth, movies }) => {

    const { id } = auth.user;

    React.useEffect(() => {
        store.dispatch(retrieveNowPlayingMovies(1));
        store.dispatch(fetchPopularMovies(1));
    }, [])

    const { now_playing, now_popular } = movies;

    return (
    
        <div className='container-fluid movie-app'>
            <MovieSubListHeading heading="Popular Movies" />
            <div className='row'>
                {now_popular.results && now_popular.results.map(info => (
                        <MovieCard id = {id} movie={info} />   
                ))}
            </div>
            <MovieSubListHeading heading="Movies Now Playing" />
            <div className='row'>
                {now_playing.results && now_playing.results.map(info => (
                        <MovieCard id = {id} movie={info}/>   
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

