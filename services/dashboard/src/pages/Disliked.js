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
    
    //TODO: replace 1 with user ID
    React.useEffect(() => {
        async function fetchData() {
            const dislikes = await fetchDisliked("1");
            setdisliked(dislikes);
        }
        fetchData();
    }, [disliked]);

    return (
        <>
            {disliked.map((dislike, index) => (
                <TitleCard title={dislike.title} index = {index.toString()}/>
            ))}
        </>
    );

}

const mapStateToProps = (state) => ({
    disliked: state.disliked
});

export default connect(mapStateToProps)(Disliked);
