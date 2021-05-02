import React from 'react';
import MovieCard from '../components/MovieCard'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchPopularMovies, retrieveNowPlayingMovies} from '../redux/actions/movieActions';
import { Button } from 'antd';
import axios from 'axios';
import './Home.css';



const Home = ({ movies }) => {

    const [page, setPage] = React.useState(1)
    // const [data, setData] = React.useState("Press me!");

    React.useEffect(() => {
        store.dispatch(retrieveNowPlayingMovies(page));
        store.dispatch(fetchPopularMovies(page));
    }, [page])

    const { now_playing, now_popular } = movies;

//     // TODO: Edit and make work with nginx (problem with CORS in nginx config)
//     const link = 'http://localhost:5002/api/v1/recommender/status'
    
    // const handleShow = async() => {
    //     await axios
    //         .get(link)
    //         .then(res => {
    //             // console.log(res);
    //             setData(res.data.message);
    //         }).catch(err => {
    //             console.log(err);
    //         });
    // }

    return (
    
        <div className='container-fluid movie-app'>
            <div className='row'>
                {now_popular.results && now_popular.results.map(info => (
                        <MovieCard id = {0} movie={info}/>   
                ))}
            </div>
        </div>
    );
}

Home.propTypes = {
    movies: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    movies: state.movies
});


export default connect(mapStateToProps)(Home);

