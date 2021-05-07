import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Button } from 'antd';
import { fetchLiked } from '../redux/actions/movieActions';
import store from '../redux/store';
import TitleCard from '../components/TitleCard';

const Liked = ({ auth }) => {
    const [liked, setLiked] = React.useState([]);
    //TODO: Get user from local storage
    //const [user, setUser] = React.useState([]);

    const { id } = auth.user;

    React.useEffect(() => {
        async function fetchData() {
            const likes = await fetchLiked(id);
            setLiked(likes);
        }
        fetchData();
    }, [liked]);
    
    return (
        <>  
            <div className='container mt-3'>
                {liked.map((like) => (
                    <TitleCard title={like.title} id={id} movieID = {like.movieid}/>
                ))}
            </div>
        </>
    );

}

Liked.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    liked: state.liked
});


export default connect(mapStateToProps)(Liked);
