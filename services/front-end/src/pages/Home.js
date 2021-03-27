import React from 'react';

import MovieCard from '../components/MovieCard'; 
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import store from '../redux/store';
import { fetchPopularMovies, retrieveNowPlayingMovies} from '../redux/actions/movieActions';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Home = ({ movies }) => {

    const [page, setPage] = React.useState(1)

    React.useEffect(() => {
        store.dispatch(retrieveNowPlayingMovies(page));
        store.dispatch(fetchPopularMovies(page));
    }, [page])

    const { now_playing, now_popular } = movies;

    const viewMovie = (movieId) => {
	}

    console.log(now_popular.results);
    console.log(now_playing)

    return (
        <>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                >
                {now_popular.results && now_popular.results.map(info => (
                    <SwiperSlide>{info.title}</SwiperSlide>   
                ))}
            </Swiper>
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
