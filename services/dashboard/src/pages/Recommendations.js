import React from 'react';
import { connect } from 'react-redux';
import { message, Button } from 'antd';
import { fetchLiked, retrieveRecommendationsTMDB } from '../redux/actions/movieActions';
import MovieCard from '../components/MovieCard'; 
import MovieSubListHeading from '../components/MoveSubListHeader';

const Recommendations = () => {
    /*** For TMDB recommendations ***/
    const [recommendationsTMDB, setRecommendationsTMDB] = React.useState([]);
    const [recommendationsTitle, setRecommendationsTitle] = React.useState('');

    React.useEffect(async () => {
        async function fetchData() {
            const liked = await fetchLiked(localStorage.getItem('id')); // Movies user liked

            // User has liked at least one movie
            if (liked.length > 0) {
                // Retrieve recommendations on random movie user liked
                const randomMovieLiked = liked[Math.floor(Math.random() * liked.length)];
                const recommended = await retrieveRecommendationsTMDB(randomMovieLiked.tmdbid); 
                setRecommendationsTMDB(recommended.results);
                setRecommendationsTitle('Since you liked ' + randomMovieLiked.title + ' you might like:');
            } 
        }
        if (recommendationsTMDB.length === 0) await fetchData() // only updates page when state is empty (when page initially loads)
    }, [recommendationsTMDB, recommendationsTitle]);

    /*** For recommender system we implented ***/

    return (
        <div className='container-fluid movie-app'>
            <h2 className='text-center'>Recommendations</h2>
            <MovieSubListHeading heading={recommendationsTitle}/>
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
    recTMDB: state.recommendationsTMDB,
    recTitleTMDB: state.recommendationsTitle
});

export default connect(mapStateToProps)(Recommendations);