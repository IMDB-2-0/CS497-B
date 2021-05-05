import React from 'react';
import { connect } from 'react-redux';
import { message, Button } from 'antd';
import { fetchLiked, retrieveRecommendationsTMDB } from '../redux/actions/movieActions';
import MovieCard from '../components/MovieCard'; 
import MovieSubListHeading from '../components/MoveSubListHeader';

const Recommendations = () => {
    const [recommendationsTMDB, setRecommendationsTMDB] = React.useState([]);

    // For TMDB recommendations
    React.useEffect(async () => {
        async function fetchData() {
            const liked = await fetchLiked(localStorage.getItem('id')); // Movies user liked

            // User has liked at least one movie
            if (liked.length > 0) {
                // Retrieve recommendations on random movie user liked
                const randomMovieLiked = liked[Math.floor(Math.random() * liked.length)];
                const recommended = await retrieveRecommendationsTMDB(randomMovieLiked.tmdbid); 
                setRecommendationsTMDB(recommended.results);
            // User has not liked anything yet
            } else {
                setRecommendationsTMDB([]);
            }
        }
        await fetchData();
    }, [recommendationsTMDB]);

    return (
        <div className='container-fluid movie-app'>
            <h2 className='text-center'>Recommendations</h2>
            <MovieSubListHeading heading='Recommendations From TMDB'/>
            <i className='mx-3'>Note: At least one movie rating is required.</i>
            <div className='row'>
                {
                    recommendationsTMDB.map(info => (
                        <MovieCard movie={info}/>   
                    ))
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    recTMDB: state.recommendationsTMDB
});

export default connect(mapStateToProps)(Recommendations);