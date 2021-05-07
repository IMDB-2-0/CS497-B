import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Button } from 'antd';
import { fetchDisliked } from '../redux/actions/movieActions';
import store from '../redux/store';
import TitleCard from '../components/TitleCard';

const Disliked = () => {
    const [disliked, setdisliked] = React.useState([]);
    //TODO: Get user from local storage
    //const [user, setUser] = React.useState([]);
    
    React.useEffect(() => {
        async function fetchData() {
            const dislikes = await fetchDisliked(localStorage.getItem('id'));
            setdisliked(dislikes);
        }
        fetchData();
    }, [disliked]);

    return (
        <>
            {disliked.map((dislike) => (
                <TitleCard title={dislike.title} id={localStorage.getItem('id')} movieID = {dislike.movieid}/>
            ))}
        </>
    );

}

const mapStateToProps = (state) => ({
    disliked: state.disliked
});

export default connect(mapStateToProps)(Disliked);
