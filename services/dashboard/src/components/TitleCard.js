import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {deleteLiked} from '../redux/actions/movieActions';
const TitleCard = ({ title, id, movieID }) => {
    
    return (
        <>
        <div className="row">
            <div className="col-auto card card-body"><h2 className="mb-2">{title}</h2></div>
            <button type="button" class="ant-btn ant-btn-primary ant-btn-dangerous mt-4 mx-2" 
                    onClick = {() => {deleteLiked(id, movieID);}}>
                <span>Delete Movie Rating</span>
            </button>
        </div>
        </>
    );
}


export default TitleCard;