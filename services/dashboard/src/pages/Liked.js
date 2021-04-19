import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Button } from 'antd';
import { fetchLiked } from '../redux/actions/movieActions';
import store from '../redux/store';
import TitleCard from '../components/TitleCard';

const Liked = () => {
    const [liked, setLiked] = React.useState([]);
    //TODO: Get user from local storage
    //const [user, setUser] = React.useState([]);

    //TODO: replace 0 with user id
    React.useEffect(() => {
        async function fetchData() {
            const likes = await fetchLiked(0);
            setLiked(likes);
        }
        fetchData();
    }, [liked]);
    
    return (
        <>
            {liked.map((like) => (
                <TitleCard title={like.title} id={0} movieID = {like.movieid}/>
            ))}
        </>
    );

}

const mapStateToProps = (state) => ({
    liked: state.liked
});



export default connect(mapStateToProps)(Liked);
