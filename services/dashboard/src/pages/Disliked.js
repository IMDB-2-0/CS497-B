import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Button } from 'antd';
import { fetchDisliked } from '../redux/actions/movieActions';
import store from '../redux/store';
import TitleCard from '../components/TitleCard';

const Disliked = ({ auth }) => {
    const [disliked, setdisliked] = React.useState([]);
    //TODO: Get user from local storage
    //const [user, setUser] = React.useState([]);
    
    const { id } = auth.user;

    React.useEffect(() => {
        async function fetchData() {
            const dislikes = await fetchDisliked(id);
            setdisliked(dislikes);
        }
        fetchData();
    }, [disliked]);

    return (
        <>
            <div className='container mt-3'>
                {disliked.map((dislike) => (
                    <TitleCard title={dislike.title} id={id} movieID = {dislike.movieid}/>
                ))}
            </div>
        </>
    );

}

Disliked.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    auth: state.auth,
    disliked: state.disliked
});

export default connect(mapStateToProps)(Disliked);
