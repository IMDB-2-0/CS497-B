import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../redux/store';
import MovieRow from '../components/MovieRow';
import { getMovieRequest } from '../redux/actions/movieActions';

const SearchMovie = ({ auth, movies }) => {
	const [searchValue, setSearchValue] = React.useState('');
    const [lookupMovies, setLookupMovies] = React.useState([]);
    
    const { id } = auth.user;

    function searchRequestMovies() {
        store.dispatch(getMovieRequest(searchValue));
    }

    const handleChange = event => {
        setSearchValue(event.target.value)
    }

    React.useEffect(() => {
        var movieRows = [];
        searchRequestMovies();
        const { search_movies_list } = movies;

        if(search_movies_list.results !== undefined) {
            search_movies_list.results.forEach((movie) => {
                const movieRow = <MovieRow id={id} movie={movie}/>
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
    auth: PropTypes.object.isRequired,
    movies: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    movies: state.movies
});


export default connect(mapStateToProps)(SearchMovie);