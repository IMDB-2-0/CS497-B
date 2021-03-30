import React from 'react';

import MovieCard from '../components/MovieCard'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import store from '../redux/store';
import { fetchPopularMovies, retrieveNowPlayingMovies} from '../redux/actions/movieActions';
import { Button } from 'antd';
import axios from 'axios';

const Home = ({ movies }) => {

    const [page, setPage] = React.useState(1)
    const [data, setData] = React.useState("Press me!");

    React.useEffect(() => {
        store.dispatch(retrieveNowPlayingMovies(page));
        store.dispatch(fetchPopularMovies(page));
    }, [page])

    const { now_playing, now_popular } = movies;

    const handleShow = async() => {
        await axios
            .get('http://localhost:5000/')
            .then(res => {
                // console.log(res);
                setData(res.data.message);
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {data}
            </Button>
            {now_popular.results && now_popular.results.map(info => (
                    <MovieCard movie={info}/>   
            ))}
        </>
    );
}

Home.propTypes = {
    movies: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    movies: state.movies
});


export default connect(mapStateToProps)(Home);
