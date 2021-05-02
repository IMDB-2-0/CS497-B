import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../redux/store';
import MovieRow from '../components/MovieRow';
import { getMovieRequest } from '../redux/actions/movieActions';

const SearchMovie = ({ movies }) => {
	const [searchValue, setSearchValue] = React.useState('');
    const [lookupMovies, setLookupMovies] = React.useState([]);
    
    function searchRequestMovies() {
        store.dispatch(getMovieRequest(searchValue));
    }

    const handleChange = event => {
        setSearchValue(event.target.value)
    }

    React.useEffect(() => {
        // store.dispatch(retrieveNowPlayingMovies(page));
        // store.dispatch(fetchPopularMovies(page));
        // console.log(searchValue);
        var movieRows = [];
        searchRequestMovies();
        const { search_movies_list } = movies;

        if(search_movies_list.results !== undefined) {
            search_movies_list.results.forEach((movie) => {
                const movieRow = <MovieRow key={movie.id} movie={movie}/>
                movieRows.push(movieRow)
            });

            setLookupMovies(movieRows);
        }

    }, [searchValue])

    return (
        <>
            <input style={{
                fontSize: 24,
                display: 'block',
                width: "99%",
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 16
            }} 
            className='form-control'
            value={searchValue}
            onChange={handleChange} 
            placeholder="Enter search term"/>
            {lookupMovies}
        </>
    );
}

SearchMovie.propTypes = {
    movies: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    movies: state.movies
});


export default connect(mapStateToProps)(SearchMovie);