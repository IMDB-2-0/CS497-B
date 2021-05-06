import React from 'react';
import { connect } from 'react-redux';
import { fetchLiked, retrieveRecommendationsTMDB, 
    retrieveRecommendationsALS, getMovieByID } from '../redux/actions/movieActions';
import MovieCard from '../components/MovieCard'; 
import MovieSubListHeading from '../components/MoveSubListHeader';

const Recommendations = () => {
    /*** For TMDB recommendations ***/
    const [recommendationsTMDB, setRecommendationsTMDB] = React.useState([]);
    const [recommendationsTitle, setRecommendationsTitle] = React.useState('No recommendations found');
    /*** For recommender system we implented ***/
    const [recommendationsALS, setRecommendationsALS] = React.useState([]);

    React.useEffect(async () => {
        async function fetchDataTMDB() {
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
        
        async function fetchDataALS() {
            const rec = await retrieveRecommendationsALS(localStorage.getItem('id')); // Get recommendations for user
            
            // Recommender system has outputted recommendations for this user
            if (rec !== undefined) {
                if (rec.length > 0) {
                    let tmdbData = await Promise.all(rec.map(movie => getMovieByID(movie.tmdbid)));
                    tmdbData = tmdbData.filter(movie => movie !== undefined);
                    setRecommendationsALS(tmdbData);
                }
            }
        }

        // only updates page when state is empty (when page initially loads)
        if (recommendationsTMDB.length === 0) await fetchDataTMDB() 
        if (recommendationsALS.length === 0) await fetchDataALS()
    }, [recommendationsTMDB, recommendationsTitle, recommendationsALS]);

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
            <MovieSubListHeading heading='Personalized Recommendations'/>
            <i className='mx-3'>Note: At least one day might be needed to update your recommendations.</i>
            <div className='row'>
                {
                    recommendationsALS.map(info => (
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